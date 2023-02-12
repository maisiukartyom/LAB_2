import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    owner:{
        type: String,
        required: true
    },
    title:{
        type: String, 
        required: true
    }, 
    content:{
        type: String, 
        required: true
    }, 
    date:{
        type: String, 
        required: true
    }, 
    complete:{
        type: Boolean, 
        required: true
    }, 
})

export default mongoose.model("Note", NoteSchema)