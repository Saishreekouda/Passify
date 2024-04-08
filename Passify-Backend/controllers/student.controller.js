import Student from "../models/student.model.js";

export const getStudent = async (req, res) => {
  try {
    const { username } = req.body;
    const student = await Student.find({ username: username });
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
