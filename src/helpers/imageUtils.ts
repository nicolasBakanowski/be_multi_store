import multer from "multer";
import path from "path";
import { Request } from "express";

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
  const destination = `uploads/${itemType}/`;
  console.log("destination", destination);
  cb(null, destination);
}

export const imageStorage = multer.diskStorage({
  destination: imageDestination,
  filename: imageProcessFunction,
});

export const upload = multer({ storage: imageStorage });
