const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const DepartmentSchema = new mongoose.Schema(
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
    initials: String,
    hod: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
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

DepartmentSchema.index({ school: 1 });
DepartmentSchema.index({ session: 1 });
DepartmentSchema.index({ createdBy: 1 });
module.exports = db.model("Department", DepartmentSchema);
