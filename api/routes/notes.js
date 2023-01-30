import express from 'express'
import { deleteNote, editNote, getNote, getNotes, saveNote } from '../controllers/notes.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()


router.get("/home", getNotes)
router.post("/create", verifyAdmin ,saveNote)
router.get("/getNote/:id", getNote)
router.get("/delete/:id", deleteNote)
router.post("/edit/:id", editNote)

export default router;