const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const AttendanceSchema = new mongoose.Schema(
  {
    level: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Level",
    },
    date: String,
    status: Array,
    active: {
      type: Boolean,
      default: true,
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
