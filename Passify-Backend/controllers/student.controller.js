import Student from "../models/student.model.js";

export const getStudent = async (req, res) => {
  try {
    const { username } = req.body;

    const student = await Student.find({ rollNumber: username });
    res.status(200).json({ data: student });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get all outpasses of a student

export const getAllOutpasses = async (req, res) => {
  try {
    const { username } = req.body;

    const student = await Student.findOne({ rollNumber: username }).populate('outpasses');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ data: student.outpasses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

