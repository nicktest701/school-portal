const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const EventSchema = new mongoose.Schema(
  {
    type: String,
    title: String,
    caption: String,
    description: String,
    album: String,
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Session',
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Term',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model('Event', EventSchema);
