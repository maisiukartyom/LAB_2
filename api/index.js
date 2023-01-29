import express from 'express'
import notesRouter from './routes/notes.js'
import filesRouter from './routes/files.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";

const app = express()
const __dirname = process.cwd()

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
      } catch (error) {
        
      }    
}

// middlewares

app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.use("/api/notes", notesRouter)
app.use("/api/files", filesRouter)

app.listen(8000, () => {
    connect()
    console.log("Connected to backend!")
})