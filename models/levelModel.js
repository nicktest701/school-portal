const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const LevelSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Session',
    },
    term: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Term',
    },
    teacher: {
      type: mongoose.SchemaTypes.Mixed,
    },

    fee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Fee',
    },
    level: Object,
    subjects: {
      type: Array,
      default: [],
    },
    students: [
      { type: mongoose.SchemaTypes.ObjectId, ref: 'Student', default: [] },
    ],
    grades: Array,
    rollNumber: {
      type: Number,
      default: 0,
    },
    attendance: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    virtuals: {
      levelName: {
        get() {
          const name = `${this.level?.name}${this.level?.type}`;
          return name;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
module.exports = db.model('Level', LevelSchema);
