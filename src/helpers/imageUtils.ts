import multer from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";

function imageProcessFunction(
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void
) {
  cb(null, file.originalname);
}

function imageDestination(
  req: Request,
  _file: Express.Multer.File,
  cb: (error: Error | null, destination: string) => void
) {
  const itemType = req.baseUrl.split("/")[1];
  console.log(itemType, "itemType");
  console.log(_file, "tiene un archivo esto? ");
  const destination = path.join("uploads", itemType);
  fs.mkdirSync(destination, { recursive: true });
  cb(null, destination);
}

export const imageStorage = multer.diskStorage({
  destination: imageDestination,
  filename: imageProcessFunction,
});

export const upload = multer({ storage: imageStorage });
