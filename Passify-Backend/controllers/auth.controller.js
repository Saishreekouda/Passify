import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { logUser, getDashboard, verifyUser } from "../utils/aviral.js";
import bcrypt from "bcrypt";

export async function loginAsStudent(req, res) {
  try {
    const { username, password } = req.body;

    //check if the user exists in passify database
    const student = await Student.find({ rollNumber: username });
    if (student.length === 0) {
      //sign up the user to passify database
      const response = await logUser({
        username: username,
        password: password,
      });

      //if the user is not found in aviral database
      if (!response.data.user_group) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const aviraltoken = response.data.jwt_token;
      const session = response.data.session_id;

      const dashboard = await getDashboard(aviraltoken, session);
      const {
        student_id,
        first_name,
        middle_name,
        last_name,
        program,
        semester,
        phone,
      } = dashboard.data;

      const name = (first_name + " " + middle_name + " " + last_name).trimEnd();

      const newStudent = await Student.create({
        name: name,
        rollNumber: student_id,
        phone: phone,
        program: program,
        semester: semester,
      });

      const token = generateToken(student_id, "student");
      res.status(200).json({ token, user: newStudent });
    } else {
      const isMatch = verifyUser({
        username: username,
        password: password,
      });
      if (!isMatch) {
        res.status(401).json({ message: "Username or Password is Incorrect." });
      }
      const token = generateToken(username, "student");
      res.status(200).json({ token, user: student });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function signUpAsAdmin(req, res) {
  try {
    const { username, password } = req.body;

    // Check if admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const { name, role, phone } = req.body;
    if (!name || !role) {
      return res.status(400).json({ message: "Name and Role are required" });
    }
    const newAdmin = await Admin.create({
      username: username,
      password: hashedPassword,
      name: name,
      role: role,
      phone: phone,
    });

    // Generate JWT token for the new admin
    const token = generateToken(username, "admin");
    res.status(201).json({ token, user: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function loginAsAdmin(req, res) {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(401)
        .json({ message: "Username or Password is Incorrect." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Username or Password is Incorrect." });
    }

    // Generate JWT token for the admin
    const token = generateToken(username, "admin");
    res.status(200).json({ token, user: admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

const generateToken = (username, role) => {
  return jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
