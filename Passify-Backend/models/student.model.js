// student.model.js
import { Schema, model } from "mongoose";

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
});

export default model("Student", studentSchema);
