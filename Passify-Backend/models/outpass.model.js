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
    type: String,
    required: true,
  },
  outTime: {
    type: String,
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
  applicationTime: {
    type: Date,
    default: Date.now,
  },
  issueDate: {
    type: String,
  },
  issueTime: {
    type: String,
  },
  issuedBy: {
    type: String,
  },
});

export default model("Outpass", outpassSchema);
