const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const CourseSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Session',
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Term',
    },
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Teacher',
    },
    level: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Level',
    },

    subject: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model('Course', CourseSchema);
