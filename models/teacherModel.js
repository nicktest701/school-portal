const mongoose = require('mongoose');
const _ = require('lodash');
const db = require('../db/DBConnection');

const TeacherSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
    },
    user: {
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
    virtuals: {
      // fullName: {
      //   get() {
      //     const name = _.startCase(
      //       `${this.surname} ${this.firstname}`
      //     );
      //     return name;
      //   },
      // },
    },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
TeacherSchema.index({ school: 1 });
TeacherSchema.index({ createdBy: 1 });
module.exports = db.model('Teacher', TeacherSchema);
