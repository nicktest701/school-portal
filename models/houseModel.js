const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const HouseSchema = new mongoose.Schema(
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
    color: String,
    master: {
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

HouseSchema.index({ school: 1 });
HouseSchema.index({ session: 1 });
HouseSchema.index({ createdBy: 1 });
module.exports = db.model("House", HouseSchema);
