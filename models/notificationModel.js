const mongoose = require("mongoose");
const db = require("../db/DBConnection");

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel", // 'onModel' is the field that determines the target model
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["User", "StudentAuth"], // Possible models for 'product'
    },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
      required: true,
      index: true, // Frequently queried field
    },
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
      required: true,
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Term",
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      // enum: ["info", "alert", "reminder"], // Use enum for predefined types
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    album: {
      type: String,
      trim: true,
      default: "",
      sparse: true, // Optimize indexing for nullable fields
    },
    link: {
      type: String,
      trim: true,
      default: "",
      sparse: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
  }
);

// 🔹 Compound Indexes for Faster Queries
NotificationSchema.index({ school: 1, session: 1, term: 1 }); // Common query pattern
NotificationSchema.index({ createdBy: 1, active: 1 }); // Filtering active notifications per user
NotificationSchema.index({ type: 1, createdAt: -1 }); // Searching notifications by type in latest order

module.exports = db.model("Notification", NotificationSchema);
