const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const MessageSchema = new mongoose.Schema(
  {
    type: String,
    recipient: Object,
    body: Object,
    active: {
      type: Boolean,
      default: false,
    },
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Session',
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Term',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model('Message', MessageSchema);
