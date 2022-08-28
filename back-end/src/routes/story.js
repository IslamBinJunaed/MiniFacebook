import { Router } from "express";
import { Story } from "../models/Story.js";
import { minioClient } from "../server.js";
import multer from "multer";

export const story = Router();
const multerUpload = multer();

story.post("/", multerUpload.single("story"), async (req, res) => {
  const createdDoc = await Story.create({});
  try {
    const imageName = String(createdDoc._id);
    await minioClient.putObject("story", imageName, req.file.buffer);
    res.status(200).send();
  } catch (error) {
    await Story.deleteOne({ _id: createdDoc._id });

    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
});

// Get all story names (MinIO object names)
story.get("/", async (req, res) => {
  try {
    const storyDocs = await Story.find({}).sort({ createdAt: "descending" });
    const srcArray = storyDocs.map(doc => String(doc._id));

    res.status(200).json(srcArray);
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
});
