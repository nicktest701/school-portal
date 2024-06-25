const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const NotificationSchema = new mongoose.Schema(
  {
    type: String,
    title: String,
    description: String,
    album: String,
    link: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = db.model('Notification', NotificationSchema);
