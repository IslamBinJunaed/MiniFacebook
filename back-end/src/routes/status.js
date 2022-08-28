import { Router } from "express";
import { Status } from "../models/Status.js";

export const status = Router();

status.post("/", async (req, res) => {
  try {
    await Status.create({
      email: req.userEmail,
      content: req.body.content,
    });
    res.status(200).send();
  } catch (error) {
    console.log(req.body);
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
});

status.get("/", async (req, res) => {
  try {
    const allStatus = await Status.find({}).sort({ createdAt: "descending" });
    res.status(200).json(allStatus);
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
});
