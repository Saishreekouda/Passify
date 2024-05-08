import Guard from "../models/guard.model.js";

export const getGuard = async (req, res) => {
  try {
    const guard = await Guard.find({ username: req.username });
    res.status(200).json({ data: guard });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};




  