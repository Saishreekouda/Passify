import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { logUser, getDashboard, verifyUser } from "../utils/aviral.js";

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

      const token = generateToken(student_id);
      res.status(200).json({ token, user: newStudent });
    } else {
      const isMatch = verifyUser({
        username: username,
        password: password,
      });
      if (!isMatch) {
        res.status(401).json({ message: "Username or Password is Incorrect." });
      }
      const token = generateToken(username);
      res.status(200).json({ token, user: student });
    }
  } catch (err) {
    console.log(err);
  }
}

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
