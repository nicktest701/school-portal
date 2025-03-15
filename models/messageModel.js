const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const MessageSchema = new mongoose.Schema(
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
    recipient: Object,
    body: Object,
    active: {
      type: Boolean,
      default: false,
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

MessageSchema.index({ session: 1 });
MessageSchema.index({ term: 1 });
MessageSchema.index({ school: 1 });
MessageSchema.index({ createdBy: 1 });
module.exports = db.model('Message', MessageSchema);
