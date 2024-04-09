import { Schema, model } from "mongoose";

const outpassSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  transport: {
    type: String,
    required: true
  },
  nowTime: {
    type: Date,
    required: true
  },
  outTime: {
    type: Date,
    required: true
  },
  issuedBy: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  state: {
    type: String,
    enum: ['accepted', 'pending', 'used', 'rejected'],
    default: 'pending'
  }
});

export default model("Outpass", outpassSchema);
