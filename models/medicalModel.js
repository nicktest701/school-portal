const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const MedicalSchema = new mongoose.Schema(
  {
    heartDisease: {
      type: String,
      default: 'No',
    },
    asthma: {
      type: String,
      default: 'No',
    },
    siezures: {
      type: String,
      default: 'No',
    },
    visualImpairment: {
      type: String,
      default: 'No',
    },
    hearingImpairment: {
      type: String,
      default: 'No',
    },
    physicalDisability: {
      type: String,
      default: 'No',
    },
    emergencyContact: mongoose.SchemaTypes.Mixed,
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Student',
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
module.exports = db.model('Medical', MedicalSchema);
