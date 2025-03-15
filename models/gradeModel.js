const mongoose = require('mongoose');
const db = require('../db/DBConnection');
const { randomUUID } = require('crypto');

const GradeSchema = new mongoose.Schema(
  {
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
      unique: true,
      default: `Grade-System-${randomUUID()}`,
    },
    ratings: Array,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
GradeSchema.index({ session: 1 });
GradeSchema.index({ term: 1 });
GradeSchema.index({ createdBy: 1 });
module.exports = db.model('Grade', GradeSchema);
