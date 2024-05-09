import { Schema, model } from "mongoose";

const outpassSchema = new Schema({
  student: {
    ref: "Student",
    type: Schema.Types.ObjectId,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  outDate: {
    type: Date,
    required: true,
  },
  outTime: {
    type: Date,
    required: true,
  },
  transport: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Accepted", "Pending", "Used", "Rejected"],
    default: "Pending",
  },
  applicationDateTime: {
    type: Date,
    required: true,
  },
  issueDateTime: {
    type: Date,
  },
  issuedBy: {
    type: String,
  },
  exitDateTime: {
    type: Date,
  },
  guard: {
    type: String,
  },
});

export default model("Outpass", outpassSchema);
