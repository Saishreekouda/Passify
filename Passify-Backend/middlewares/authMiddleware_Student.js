import jwt from "jsonwebtoken";

export const verifyStudentToken = (req, res, next) => {
  let token = req.headers.authorization;

  // Check if the Authorization header exists
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Split the token and retrieve the token value
  token = token.split(" ")[1];
  
  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (decoded.role !== "student") {
      return res
        .status(401)
        .json({ error: "Unauthorized, student only route" });
    }
    req.username = decoded.username;
    console.log(req.username);
    next();
  });
};
