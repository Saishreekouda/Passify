// student.model.js
import { Schema, model } from "mongoose";
import outpassSchema from "./outpass.model.js";



const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  semester: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  outpasses: [outpassSchema]

  
  
});

export default model("Student", studentSchema);
