const mongoose = require('mongoose');
const _ = require('lodash');
const db = require('../db/DBConnection');

const StudentSchema = new mongoose.Schema(
  {
    profile: String,
    indexnumber: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      lowercase: true,
      required: true,
    },
    surname: {
      type: String,
      lowercase: true,
      required: true,
    },
    othername: {
      type: String,
      lowercase: true,
    },
    dateofbirth: String,
    gender: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phonenumber: String,
    address: String,
    residence: String,
    nationality: String,
    medical: {
      type: mongoose.SchemaTypes.Mixed,
    },
    academic: {
      type: mongoose.SchemaTypes.Mixed,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          const name = _.startCase(
            `${this.surname} ${this.firstname} ${this.othername}`
          );
          return name;
        },
      },
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
module.exports = db.model('Student', StudentSchema);
