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
