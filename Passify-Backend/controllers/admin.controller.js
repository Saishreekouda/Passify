import Admin from "../models/admin.model.js";

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find({ username: req.username });
    res.status(200).json({ data: admin });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
