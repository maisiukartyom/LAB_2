import express from 'express'
import { deleteFile, downloadFile, uploadFile } from '../controllers/files.js';
import multer from 'multer'

const router = express.Router()
const __dirname = process.cwd()
const upload = multer({ dest: __dirname + '/files/temp'});

router.post("/upload/:id", upload.single("file"), uploadFile)
router.post("/delete", deleteFile)
router.post("/download", downloadFile)

export default router;