import multer from "multer";
import path from "path";
import { Request } from "express";

function imageProcessFunction(
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void
) {
  const productName = req.body.name;
  const ext = path.extname(file.originalname);
  const filename = productName + ext;
  cb(null, filename);
}

export const imageStorage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, "uploads/");
  },
  filename: imageProcessFunction,
});

export const upload = multer({ storage: imageStorage });
