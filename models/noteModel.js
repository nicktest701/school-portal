const mongoose = require('mongoose');
const db = require('../db/DBConnection');


const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [50, 'Title cannot exceed 50 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        maxlength: [500, 'Content cannot exceed 500 characters']
    },
    color: {
        type: String,
        default: '#ffc09f',
        enum: {
            values: ["#ffc09f", "#fff9c4", "#edf6f9", "#ffcdd2", "#c5cae9", '#5e747f', '#7B9E87', '#E29578', '#FFDDD2', '#83C5BE'
            ],
            message: 'Invalid color selection'
        }
    },
    position: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 }
    }
}, { timestamps: true });

noteSchema.index({ user: 1 });

module.exports = db.model('Note', noteSchema);