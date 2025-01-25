const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const AnnouncementSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: String,
    bgColor: String,
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
module.exports = db.model('Announcement', AnnouncementSchema);
