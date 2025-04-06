const db = require("../db/DBConnection");
const mongoose = require("mongoose");
const Level = require('./levelModel');
const generateCustomGrade = require("../config/generateCustomGrade");
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
    scores: {
      type: Array,
      default: []
    },
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

// 🔹 Virtual field to calculate totalScore dynamically
ExaminationSchema.virtual("scoresWithTotal").get(async function () {

  if (this.scores?.length === 0) return []
  
  const level = await Level.findById(this.level).populate('grades')
  return this.scores.map((score) => ({
    ...score,
    totalScore: score.classScore + score.examsScore, // Auto-generated field
    ...generateCustomGrade(Number(score.classScore + score.examsScore), level?.grades?.ratings)
  }));
});




// 🔹 Compound Indexes for Optimized Queries
ExaminationSchema.index({ session: 1, term: 1, level: 1, student: 1 });

module.exports = db.model("Examination", ExaminationSchema);
