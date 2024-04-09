import jwt from "jsonwebtoken";

export const verifyStudentToken = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (decoded.role !== "student") {
      return res
        .status(401)
        .json({ error: "Unauthorised, student only route" });
    }
    req.username = decoded.username;
    console.log(req.username);
    next();
  });
};
