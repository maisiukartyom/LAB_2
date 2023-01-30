import express from 'express'
import notesRouter from './routes/notes.js'
import filesRouter from './routes/files.js'
import authRoute from './routes/auth.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'

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

app.use(cookieParser())
app.use(express.json())

app.use(express.static(__dirname + '/public'));

app.use("/api/auth", authRoute)
app.use("/api/notes", notesRouter)
app.use("/api/files", filesRouter)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage
    })
  })

app.listen(8000, () => {
    connect()
    console.log("Connected to backend!")
})