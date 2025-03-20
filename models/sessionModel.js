const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const SessionSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
    },
    from: String,
    to: String,
    academicYear: String,
    name: String,
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

SessionSchema.index({ school: 1 });
SessionSchema.index({ createdBy: 1 });
module.exports = db.model("Session", SessionSchema);
