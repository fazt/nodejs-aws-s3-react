import { Router } from "express";
import { uploadFile, getFileURL, getFiles, getFile } from "../libs/s3.js";

const router = Router();

router.post("/photos", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: "No files were uploaded." });
  }

  const result = await uploadFile(req.files["photo"]);
  return res.json(result);
});

router.get("/photos/:fileName", async (req, res) => {
  try {
    const result = await getFileURL(req.params.fileName);
    res.json({
      url: result
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/photos", async (req, res) => {
  try {
    const result = await getFiles();
    res.json(result.Contents);
  } catch (error) {
    res.send(error.message);
  }
});

export default router;
