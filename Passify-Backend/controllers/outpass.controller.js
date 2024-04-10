import Student from "../models/student.model.js";
import Outpass from "../models/outpass.model.js";
import Admin from "../models/admin.model.js";
import { getFormattedDate, getFormattedTime } from "../utils/formatter.js";

export const createOutpass = async (req, res) => {
  try {
    console.log("hello");
    console(req.username);
    const student = await Student.findOne({ rollNumber: req.username });
    console.log(student);
    const { outDate, outTime, destination, transport, purpose } = req.body;

    const outpass = new Outpass({
      student: student._id,
      destination: destination,
      outDate: outDate,
      outTime: outTime,
      transport: transport,
      purpose: purpose,
    });

    await outpass.save();

    return res.status(201).json({ data: outpass });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//unprotected
export const getOutpass = async (req, res) => {
  try {
    const outpass = await Outpass.findById(req.params.id).populate("student");
    if (!outpass) {
      return res.status(404).json({ message: "Outpass not found" });
    }

    return res.status(200).json({ data: outpass });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//only student can get

export const getAllOutpassesForStudent = async (req, res) => {
  try {
    //get the id of the student from username and then search in outpass database for all outpasses of that student
    const outpasses = await Outpass.find()
      .populate({
        path: "student",
        match: { rollNumber: req.username },
      })
      .exec();
    const filteredOutpasses = outpasses.filter(
      (outpass) => outpass.student !== null
    );

    return res.status(200).json({ data: filteredOutpasses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//only admin can get

export const getAllOutpassesForAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.username });
    const outpasses = await Outpass.find({
      $or: [
        { status: "Pending" },
        {
          $and: [
            { issuedBy: admin.name },
            { status: { $in: ["Accepted", "Rejected", "Used"] } },
          ],
        },
      ],
    }).populate({
      path: "student",
    })
    .exec();

    return res.status(200).json({ data: outpasses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//only admin can update outpass status

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(req.username);
    const admin = await Admin.findOne({ username: req.username });
    const outpass = await Outpass.findById(req.params.id);

    if (!outpass) {
      return res.status(404).json({ message: "Outpass not found" });
    }

    if (status !== "Accepted" && status !== "Rejected") {
      return res
        .status(400)
        .json({ message: "Invalid status update from Admin" });
    }
    console.log(admin);
    outpass.status = status;
    outpass.issuedBy = admin.name;
    outpass.issueTime = getFormattedTime();
    outpass.issueDate = getFormattedDate();
    console.log(outpass);
    await outpass.save();

    return res.status(200).json({ data: outpass });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getInvalidOutpassesForGuard = async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.username });

    const invalidOutpasses = await Outpass.find({
      $and: [{ $or: [{ status: "Used" }] }],
    }).populate({
      path: "student",
    })
    .exec();

    return res.status(200).json({ data: invalidOutpasses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
