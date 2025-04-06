const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const FeeSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
    },
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

    amount: {
      type: Array,
      default: []
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

FeeSchema.index({ session: 1 });
FeeSchema.index({ term: 1 });
FeeSchema.index({ level: 1 });
FeeSchema.index({ createdBy: 1 });
module.exports = db.model("Fee", FeeSchema);
