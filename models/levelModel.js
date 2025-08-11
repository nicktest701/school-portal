const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const LevelSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
      required: true,
      index: true, // Optimized for queries by session
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Term",
      required: true,
      index: true, // Optimized for term-related queries
    },
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User", // Changed from `Mixed` to a proper reference
      // type: mongoose.SchemaTypes.Mixed,
      // index: true,
    },
    fee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Fee",
    },
    level: {
      type: Object,
      required: true,
      default: {
        name: "",
        type: "",
      },
    },
    subjects: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Subject",
        default: [],
      },
    ],
    students: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    grades: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Grade",
    },
    rollNumber: {
      type: Number,
      default: 0,
      min: 0,
    },
    attendance: {
      type: Number,
      default: 0,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
      index: true, // Optimized for filtering active levels
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🔹 Virtuals for Readable Data
LevelSchema.virtual("levelName").get(function () {
  return `${this.level?.name ?? ""}${this.level?.type ?? ""}`.trim();
});

LevelSchema.virtual("noOfStudents").get(function () {
  return this.students?.length || 0;
});

// 🔹 Compound Indexes for Performance
LevelSchema.index({ session: 1, term: 1 });
LevelSchema.index({ grades: 1 });

module.exports = db.model("Level", LevelSchema);
