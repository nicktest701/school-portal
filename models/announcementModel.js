const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const AnnouncementSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
    },
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Session',
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Term',
    },
    title: String,
    description: String,
    priority: String,
    bgColor: String,
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
AnnouncementSchema.index({ createdBy: 1 });
module.exports = db.model('Announcement', AnnouncementSchema);
