import fs from 'fs'
import Note from '../models/Note.js';
const notesDB = "notes.json";
const __dirname = process.cwd()

function GetNote(noteId) {
	let content = fs.readFileSync(notesDB, "utf8");
	let notes = JSON.parse(content);
	let note = null;

	for (var i = notes.length - 1; i >= 0; i--) {
		if (notes[i].id == noteId) {
			note = notes[i];
			break;
		}
	}

	return note;
}

export const getNotes = async (req, res) => {
    const notes = await Note.find()

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

function RewriteNotes(notes) {
	let data = JSON.stringify(notes);
	fs.writeFileSync("notes.json", data);
}


export const filterNotes = (req, res) => {
    if(!req.body) return res.sendStatus(400);
	let notes = GetNotes();
	let status = req.body.status;
	let filtredNotes = [];

	if (status == 'Все') {
		filtredNotes = notes;
	} else {
		if (status == 'Завершено!') {
			filtredNotes = notes.filter(note => note.complete);
		} else {
			filtredNotes = notes.filter(note => getStatus(note.date) == status && !note.complete);
		}
	}

	console.log(status);
	console.log(filtredNotes);

	res.render("MainPage.hbs", 
	{
		tableVisible: filtredNotes.length > 0,
		notes: filtredNotes
	});
}

export const completeNote = (req, res) => {
    
	if(!req.body) return res.sendStatus(400);
	let notes = GetNotes();
	let id = req.body.id;

	for (var i = notes.length - 1; i >= 0; i--) {
		if (notes[i].id == id) {
			notes[i].complete = req.body.complete == 'on';
			console.log(notes[i]);
			break;
		}
	}

	RewriteNotes(notes);
	res.redirect("/details?id=" + id);
}

export const newNote = (req, res) => {
    let note = {
		id: 0,
		title: "",
		content: "",
		date: "",
		complete: false
	};

	res.render("EditDetails.hbs", 
	{
		note: note
	});
}

export const detailsNote = (req, res) => {
    let note = GetNote(req.query.id);
	let files = [];

	if (fs.existsSync(__dirname + '/files/' + req.query.id)) {
		files = fs.readdirSync(__dirname + '/files/' + req.query.id);
	}
	 
	console.log(files);

	if (note != null) {
		res.render("details.hbs", 
		{
			note: note,
			files: files,
			showTable: files.length > 0,
			showDate: note.date != ''
		});
	} else {
		res.status(404).send();
	}
}

function GetNotes(){
    let data = "";
	let notes = [];

	try {
		data = fs.readFileSync(notesDB, "utf8");
	} catch(error) {
		console.error(error);	
	}

	try {
		notes = JSON.parse(data);
	} catch(error) {
		console.error(error);
		fs.writeFileSync(notesDB, '[]');
		notes = [];
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