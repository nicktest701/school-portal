const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const SchoolSchema = new mongoose.Schema(
  {
   
    code: {
      type: String,
      unique: true

    },
    unique: String,
    badge: String,
    name: String,
    motto: String,
    address: String,
    location: String,
    district: String,
    region: String,
    email: {
      type: String, lowercase: true
    },
    website: String,
    phonenumber: String,
  },

  {
    timestamps: true,
  }
);
SchoolSchema.index({ code: 1 });
module.exports = db.model('School', SchoolSchema);
