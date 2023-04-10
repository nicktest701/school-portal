const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const SchoolSchema = new mongoose.Schema(
  {
    unique: String,
    badge: String,
    name: String,
    address: String,
    location: String,
    email: String,
    phonenumber: String,
    motto: String,
  },

  {
    timestamps: true,
  }
);
module.exports = db.model('School', SchoolSchema);
