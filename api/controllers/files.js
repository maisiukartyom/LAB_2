import Note from "../models/Note.js";
import fs from 'fs'
const __dirname = process.cwd()

export const uploadFile = (req, res) => {
    if (!fs.existsSync(__dirname + '/files/' + req.params.id)) {
		  fs.mkdirSync(__dirname + '/files/' + req.params.id, {recursive: true});
    }

	  fs.rename(req.file.path, __dirname + '/files/' + req.params.id + '/' + req.file.originalname, function(err) {
		if (err) throw err;

		if (fs.existsSync(req.file.path)) {
			fs.remove(req.file.path, err => {
				if (err) return console.error(err);
		});
		}
	});

    let files = [];

    if (fs.existsSync(__dirname + '/files/' + req.params.id)) {
      files = fs.readdirSync(__dirname + '/files/' + req.params.id);
    }

	res.status(200).json({files:files})
}

export const deleteFile = (req, res) => {
  if(!req.body) return res.sendStatus(400);
  
  let file = __dirname + '/files/' + req.body.id + '/' + req.body.filename;

  if (fs.existsSync(file)) {
    fs.unlinkSync(file, err => {
      if (err) return console.error(err);
      console.log("deleted" + file);
    });
  }

  let files = [];

    if (fs.existsSync(__dirname + '/files/' + req.body.id)) {
      files = fs.readdirSync(__dirname + '/files/' + req.body.id);
    }

  res.status(200).json({files:files})
}

export const downloadFile = (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let file = __dirname + '/files/' + req.body.id + '/' + req.body.filename;

  if (fs.existsSync(file)) {
    console.log("download" + file);
    res.download(file);
}
}