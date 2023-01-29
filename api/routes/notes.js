import express from 'express'
import { deleteNote, editNote, getNote, getNotes, saveNote } from '../controllers/notes.js';

const router = express.Router()


router.get("/home", getNotes)
router.post("/create", saveNote)
router.get("/getNote/:id", getNote)
router.get("/delete/:id", deleteNote)
router.post("/edit/:id", editNote)

export default router;