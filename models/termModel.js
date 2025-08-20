const mongoose = require("mongoose");
const db = require("../db/DBConnection");


const TermSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
    },
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
    },
    name: String,
    from: String,
    to: String,
    term: String,
    isPromotionTerm: String,
    academicYear: String,
    vacationDate: String,
    reOpeningDate: String,
    headmaster: {
      type: mongoose.SchemaTypes.Mixed,
    },
    exams: {
      type: mongoose.SchemaTypes.Mixed,
    },
    report: {
      template: {
        type: String,
        default: "first",
      },
      dimension: {
        type: String,
        default: "A4",
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

TermSchema.index({ school: 1 });
TermSchema.index({ session: 1 });
TermSchema.index({
  active: 1,
  unique: true,
  partialFilterExpression: { active: true },
});

module.exports = db.model("Term", TermSchema);
