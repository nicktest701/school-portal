const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const SubjectSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
      required: true,
      index: true, // Faster session-based lookups
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Term",
      required: true,
      index: true, // Optimized for term-based filtering
    },
    code: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate subject codes
      uppercase: true,
      trim: true,
      maxlength: 10, // Limit subject code length
    },
    name: {
      type: String,
      required: true,
      unique: true, // Ensures subject names are distinct
      uppercase: true,
      trim: true,
      maxlength: 100, // Avoids excessively long names
    },
    isCore: {
      type: Boolean,
      default: false,
      index: true, // Optimized for core subject filtering
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// 🔹 Compound Indexes for Efficient Queries
SubjectSchema.index({ session: 1, term: 1, code: 1 }, { unique: true }); // Prevents duplicate subjects per session & term
SubjectSchema.index({ session: 1, term: 1, name: 1 }, { unique: true }); // Ensures unique names per session & term

module.exports = db.model("Subject", SubjectSchema);
