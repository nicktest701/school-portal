const mongoose = require('mongoose');
const db = require('../db/DBConnection');
const _ = require('lodash')


const ParentSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
      index: true, // Optimized for school-based lookups
    },
    profile: String,
    firstname: {
      type: String,
      lowercase: true,
    },
    surname: {
      type: String,
      lowercase: true,
    },
    relationship: String,
    gender: String,
    email: {
      type: String,
      lowercase: true,
    },
    phonenumber: String,
    address: String,
    residence: String,
    nationality: String,

    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Student',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

// 🔹 Virtual Full Name Field (No Lodash Dependency)
ParentSchema.virtual("fullName").get(function () {
  const name = `${this?.surname} ${this?.firstname}}`.trim();
  return _.upperCase(name)
});


ParentSchema.index({ school: 1, student: 1, surname: 1, firstname: 1 }); //
module.exports = db.model('Parent', ParentSchema);
