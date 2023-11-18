const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const SubjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      uppercase: true,
    },

    name: {
      type: String,
      unique: true,
      uppercase: true,
    },
    isCore: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = db.model('Subject', SubjectSchema);
