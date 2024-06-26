import Student from "../models/student.model.js";
import Outpass from "../models/outpass.model.js";
import Admin from "../models/admin.model.js";
import { getFormattedDate, getFormattedTime } from "../utils/formatter.js";

export const createOutpass = async (req, res) => {
  try {
    console.log("outpass creation controller");
    // console(req.username);
    const student = await Student.findOne({ rollNumber: req.username });
    console.log(student);
    if (!student) {
      console.log("student doesnt exist");
      return res.status(404).json({ message: "Student not found" });
    }
    const { outDate, outTime, destination, transport, purpose } = req.body;

    const outpass = new Outpass({
      student: student._id,
      destination: destination,
      outDate: outDate,
      outTime: outTime,
      applicationDateTime: new Date(),
      transport: transport,
      purpose: purpose,
    });

    await outpass.save();

    return res.status(201).json({ data: outpass });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//unprotected
export const getOutpass = async (req, res) => {
  try {
    const outpass = await Outpass.findById(req.params.id).populate("student");
    if (!outpass) {
      return res.status(404).json({ message: "Outpass not found" });
    }

    return res.status(200).json({ data: outpass });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//only student can get

export const getAllOutpassesForStudent = async (req, res) => {
  try {
    // Get the id of the student from username and then search in outpass database for all outpasses of that student
    const statfilter = req.query.status;

    const username = req.username; // Assuming username is obtained correctly from the request
    const outpasses = await Outpass.find()
      .populate({
        path: "student",
        match: { rollNumber: username },
      })
      .exec();

    let filteredOutpasses = outpasses.filter(
      (outpass) => outpass.student !== null
    );

    if (statfilter) {
      filteredOutpasses = filteredOutpasses.filter(
        (outpass) => outpass.status === statfilter
      );
    }

    filteredOutpasses.sort(
      (a, b) =>
        new Date(b.applicationDateTime) - new Date(a.applicationDateTime)
    );

    return res
      .status(200)
      .json({ nb: filteredOutpasses.length, data: filteredOutpasses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//only admin can get

export const getAllOutpassesForAdmin = async (req, res) => {
  try {
    let statusFilter = req.query.status;
    const admin = await Admin.findOne({ username: req.username });
    const outpasses = await Outpass.find({
      $or: [
        { status: "Pending" },
        {
          $and: [
            { issuedBy: admin.name },
            { status: { $in: ["Accepted", "Rejected", "Used"] } },
          ],
        },
      ],
    })
      .populate({
        path: "student",
      })
      .exec();

    outpasses.sort(
      (a, b) =>
        new Date(b.applicationDateTime) - new Date(a.applicationDateTime)
    );

    if (statusFilter) {
      let filteredOutpasses = outpasses.filter(
        (outpass) => outpass.status === statusFilter
      );
      return res
        .status(200)
        .json({ nb: filteredOutpasses.length, data: filteredOutpasses });
    }
    return res.status(200).json({ nb: outpasses.length, data: outpasses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//only admin can update outpass status

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(req.username);
    const admin = await Admin.findOne({ username: req.username });
    const outpass = await Outpass.findById(req.params.id);

    if (!outpass) {
      return res.status(404).json({ message: "Outpass not found" });
    }

    if (status !== "Accepted" && status !== "Rejected") {
      return res
        .status(400)
        .json({ message: "Invalid status update from Admin" });
    }
    console.log(admin);
    outpass.status = status;
    outpass.issuedBy = admin.name;
    outpass.issueDateTime = new Date();

    console.log(outpass);
    await outpass.save();

    return res.status(200).json({ data: outpass });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// invalidate an outpass when its scanned
export const invalidateOutpass = async (req, res) => {
  try {
    const guardname = req.username;
    const outpass = await Outpass.findById(req.params.id);
    const status = outpass.status;
    const outTime = outpass.outTime;
    const outDate = outpass.outDate;
    const currentTime = new Date();
    const timeDifference = (currentTime - outTime) / (1000 * 60 * 60); // Difference in hours
    const dateDifference = currentTime.getDate() !== outDate; // Difference in days

    console.log(guardname);
    if (!outpass) {
      return res.status(404).json({ message: "Outpass not found" });
    }
    if (status !== "Accepted") {
      return res
        .status(400)
        .json({ message: "Outpass hasn't been accepted by admin" });
    }
    if (timeDifference > 3) {
      return res.status(400).json({
        message: "Outpass has expired, its been past 3 hours since out time",
      });
    }
    if (!dateDifference) {
      return res.status(400).json({
        message: `Outpass has expired, its been past ${dateDifference} day since out date`,
      });
    }
    outpass.status = "Used";
    outpass.guard = guardname;
    outpass.exitDateTime = new Date();
    await outpass.save();
    return res.status(200).json({ data: outpass });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getInvalidOutpassesForGuard = async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.username });
    const invalidOutpasses = await Outpass.find({
      $and: [{ $or: [{ status: "Used" }] }],
    })
      .populate({
        path: "student",
      })
      .exec();

    return res
      .status(200)
      .json({ nb: invalidOutpasses.length, data: invalidOutpasses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchOutpasses = async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber;
    console.log(rollNumber);
    if (!rollNumber) {
      return res.status(400).json({ message: "Roll number is required" });
    }

    // Get the id of the student from username and then search in outpass database for all outpasses of that student
    const outpasses = await Outpass.find()
      .populate({
        path: "student",
        match: { rollNumber },
        select: "_id",
      })
      .exec();

    console.log(outpasses);

    const filteredOutpasses = outpasses.filter(
      (outpass) => outpass.student !== null
    );

    return res
      .status(200)
      .json({ nb: filteredOutpasses.length, data: filteredOutpasses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
