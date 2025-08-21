// models/Student.js
const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const StudentAuthSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
      index: true, // Optimized for school-based queries
    },
    indexnumber: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: { type: String },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true, default: "" },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = db.model("StudentAuth", StudentAuthSchema);
