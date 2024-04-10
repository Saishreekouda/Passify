import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import loginRouter from "./routes/auth.route.js";
import studentRouter from "./routes/student.route.js";
import adminRouter from "./routes/admin.route.js";
import outpassRouter from "./routes/outpass.route.js";
import guardRouter from "./routes/guard.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    parameterLimit: 100000,
    extended: false,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", loginRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/",outpassRouter);
app.use("/api/v1/guard",guardRouter);

mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(
      process.env.PORT ? process.env.PORT : 8080,
      process.env.HOST ? process.env.HOST : "0.0.0.0",
      console.log(
        `listening on http://localhost:${
          process.env.PORT ? process.env.PORT : 8080
        }/`
      )
    );
  })
  .catch((error) => console.log(error.message));
