import Student from "../models/student.model.js";
import Outpass from "../models/outpass.model.js";

//create outpass
export const createOutpass = async (req, res) => {
  try {
    const { rollNumber } = req.body;

    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const newOutpass = new Outpass(req.body);
    await newOutpass.save();

    student.outpasses.push(newOutpass);
    await student.save();

    res.status(201).json({ data: newOutpass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// modifyOutpass.controller.js

export const modifyOutpass = async (req, res) => {
    try {
      const { id } = req.params;
  
      const outpass = await Outpass.findById(id);
      if (!outpass) {
        return res.status(404).json({ message: "Outpass not found" });
      }
  
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized: Only admins can modify outpasses" });
      }
  
      const updatedOutpass = await Outpass.findByIdAndUpdate(id, req.body, { new: true });
  
      res.status(200).json({ data: updatedOutpass });
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
