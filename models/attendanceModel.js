const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const AttendanceSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Term",
    },
    level: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Level",
    },
    date: Date,
    status: Array,
    active: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
AttendanceSchema.index({ user: 1 });
AttendanceSchema.index({ createdBy: 1 });
module.exports = db.model("Attendance", AttendanceSchema);
