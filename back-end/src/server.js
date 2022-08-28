import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import * as Minio from "minio";
import { register } from "./routes/register.js";
import { login } from "./routes/login.js";
import { status } from "./routes/status.js";
import { story } from "./routes/story.js";
import { authorize } from "./middleware/auth.js";
import { home } from "./routes/home.js";

const app = express();

// Middleware
app.use(cors({ origin: ["http://localhost:4200"], credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Routers
app.use("/register", register);
app.use("/login", login);
app.use("/status", authorize, status);
app.use("/story", authorize, story);
app.use("/", authorize, home);

// Connect to MongoDB and then spin up Server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(_ => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is Running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.log(err));

// Initialize Minio
export const minioClient = new Minio.Client({
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  endPoint: process.env.HOST,
  port: Number(process.env.MINIO_PORT),
  useSSL: false,
});
