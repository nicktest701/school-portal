const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const TermSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
    },
    from: String,
    to: String,
    term: String,
    academicYear: String,
    startDate: String,
    vacationDate: String,
    reOpeningDate: String,
    headmaster: {
      type: mongoose.SchemaTypes.Mixed,
    },
    report: {
      type: String,
      default: 'first'
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

TermSchema.index({ session: 1 });
module.exports = db.model("Term", TermSchema);
