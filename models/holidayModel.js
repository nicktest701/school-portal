const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const holidaySchema = new mongoose.Schema({

    session: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Session',
    },
    term: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Term',
    },
    name: {
        type: String,
        required: [true, 'Holiday name is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Holiday date is required'],
        index: true
    },
    recurring: {
        type: Boolean,
        default: false
    },
    allDay: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Index for date field for faster querying
holidaySchema.index({ date: 1 });

const Holiday = db.model('Holiday', holidaySchema);

module.exports = Holiday;