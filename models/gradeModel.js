const mongoose = require('mongoose');
const db = require('../db/DBConnection');
const { randomUUID } = require('crypto');

const GradeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      default: `Grade-System-${randomUUID()}`,
    },
    ratings: Array,
  },
  {
    timestamps: true,
  }
);
module.exports = db.model('Grade', GradeSchema);
