import Outpass from "../models/outpass.model.js";
export const getAllOutpasses = async (req, res) => {
    try {
      const outpasses = await Outpass.find();
      res.status(200).json({ data: outpasses });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  