import fs from 'fs'
import Note from '../models/Note.js';
const notesDB = "notes.json";
const __dirname = process.cwd()

export const getNotes = async (req, res) => {
    const notes = await Note.find({owner: req.user.id})

	res.status(200).json({
        notes: notes,
        isVisible: notes.length > 0
    })
}

export const saveNote = async (req, res) => {
    const newNote = Note(req.body)

    try{
        const savedNote = await newNote.save()
        res.status(200).json(savedNote)
    }catch(err){
        res.status(404)
    }
}

export const getNote = async (req, res) => {
	let files = [];

	if (fs.existsSync(__dirname + '/files/' + req.params.id)) {
		files = fs.readdirSync(__dirname + '/files/' + req.params.id);
	}

	try{
		const note = await Note.findById(req.params.id)
		res.status(200).json({
			note: note,
			files: files
		})
	}catch(err){
		res.status(404)
	}
}

export const deleteNote = async (req, res) => {
	try{
		await Note.findByIdAndDelete(req.params.id)
		res.status(200)
	}catch(err){
		res.status(404)
	}
}

export const editNote = async (req, res) => {
	try{
		const edited = await Note.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
		res.status(200).json(edited)
	}catch(err){
		res.status(404)
	}
}