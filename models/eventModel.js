const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const EventSchema = new mongoose.Schema(
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
    type: String,
    title: String,
    caption: String,
    description: String,
    start: {
      type: Date,
      default: null
    },
    end: {
      type: Date,
      default: null
    },
    album: String,
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
EventSchema.index({ school: 1 });
EventSchema.index({ session: 1 });
EventSchema.index({ term: 1 });
EventSchema.index({ createdBy: 1 });

module.exports = db.model('Event', EventSchema);
