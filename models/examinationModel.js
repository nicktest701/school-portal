const db = require("../db/DBConnection");
const mongoose = require("mongoose");

const ExaminationSchema = new mongoose.Schema(
  {
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
    level: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Level",
      required: true,
      index: true,
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    scores: Array,
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: {
      type: mongoose.SchemaTypes.Mixed,
      default: {},
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
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

// 🔹 Virtual for Total Overall Score
ExaminationSchema.virtual("totalScore").get(function () {
  if (!this.scores || this.scores.length === 0) return 0;
  return this.scores.reduce((sum, score) => sum + score.totalScore, 0);
});




// 🔹 Compound Indexes for Optimized Queries
ExaminationSchema.index({ session: 1, term: 1, level: 1, student: 1 });

module.exports = db.model("Examination", ExaminationSchema);
