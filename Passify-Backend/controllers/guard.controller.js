import Admin from "../models/guard.model.js";

export const getGuard = async (req, res) => {
  try {
    const guard = await Guard.find({ username: req.username });
    res.status(200).json({ data: guard });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};


export const getInvalidOutpassesForGuard = async (req, res) => {
    try {
      const admin = await Admin.findOne({ username: req.username });
  
      const invalidOutpasses = await Outpass.find({
        $and: [
          { $or: [{ status: "Invalid" }] }
        ],
      });

      return res.status(200).json({ data: invalidOutpasses });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  