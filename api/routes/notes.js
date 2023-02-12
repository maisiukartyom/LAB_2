import express from 'express'
import { deleteNote, editNote, getNote, getNotes, saveNote } from '../controllers/notes.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router()


router.get("/home", verifyToken, getNotes)
router.post("/create", verifyToken ,saveNote)
router.get("/getNote/:id", verifyToken, getNote)
router.get("/delete/:id", verifyToken, deleteNote)
router.post("/edit/:id", verifyToken, editNote)

export default router;