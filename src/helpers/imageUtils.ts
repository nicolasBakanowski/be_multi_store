import multer from "multer";
import path from "path";
import { Request } from "express";
const fs = require("fs");

function imageProcessFunction(
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void
) {
  try {
    cb(null, file.originalname);
  } catch (error) {
    console.error("Error in imageProcessFunction:", error);
    cb(null, "");
  }
}

function imageDestination(
  req: Request,
  _file: Express.Multer.File,
  cb: (error: Error | null, destination: string) => void
) {
  try {
    const itemType = req.baseUrl.split("/")[1];
    const destination = path.resolve("uploads", itemType);
    console.log("Trying to save in destination:", destination);

    fs.access(destination, fs.constants.F_OK, (err: any) => {
      if (err) {
        console.error("Error accessing destination:", err);
        cb(err, "");
      } else {
        console.log("Destination exists, trying to save.");
        cb(null, destination);
      }
    });
  } catch (error) {
    console.error("Error in imageDestination:", error);
    cb(null, "");
  }
}

export const imageStorage = multer.diskStorage({
  destination: imageDestination,
  filename: imageProcessFunction,
});

export const upload = multer({ storage: imageStorage });
