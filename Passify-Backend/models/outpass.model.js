import { Schema, model } from "mongoose";

const outpassSchema = new Schema({
  student: {
    ref: "Student",
    type: Schema.Types.ObjectId,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  outDateTime: {
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
  state: {
    type: String,
    enum: ["Accepted", "Pending", "Used", "Rejected"],
    default: "Pending",
  },
  issueDateTime: {
    type: Date,
  },
  issuedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

export default model("Outpass", outpassSchema);
