const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const CourseSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
      required: true,
    },
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Term",
      required: true,
      index: true,
    },
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      // required: true,
      index: true,
    },
    level: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Level",
      required: true,
      index: true,
    },
    subject: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🔹 Compound Indexes for Efficient Queries
CourseSchema.index({ school: 1, session: 1, term: 1, level: 1, subject: 1 });

module.exports = db.model("Course", CourseSchema);
