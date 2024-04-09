import jwt from "jsonwebtoken";
import { Unauthorized } from "./errors.js";

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (decoded.role !== "admin") {
      return res.status(401).json({ error: "Unauthorised, admin only route." });
    }
    req.username = decoded.username;
    // console.log(req.username);
    next();
  });
};
