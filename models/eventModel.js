const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const EventSchema = new mongoose.Schema(
  {
    type: String,
    title: String,
    description: String,
    album: String,
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
