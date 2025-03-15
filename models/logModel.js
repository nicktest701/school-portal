const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const ActivityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      index: true, // Fast lookup for user activity
    },
    action: {
      type: String,
      required: true,
      enum: ["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT", "VIEW"], // Standardized actions
      index: true,
    },
    entity: {
      type: String,
      required: true,
      trim: true,
      index: true, // Entity type (e.g., "Notification", "Order", "Profile")
    },
    entityId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      index: true, // Lookup actions related to a specific entity
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    metadata: {
      type: mongoose.SchemaTypes.Mixed, // Stores extra details about the action
      default: {},
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
  }
);

// 🔹 Compound Indexes for Faster Queries
ActivityLogSchema.index({ user: 1, action: 1, createdAt: -1 }); // User actions sorted by time
ActivityLogSchema.index({ entity: 1, entityId: 1 }); // Fetch logs for a specific entity

module.exports = db.model("ActivityLog", ActivityLogSchema);
