// admin.model.js
import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["warden", "guard"],
    required: true,
  },
});

export default model("Admin", adminSchema);
