const mongoose = require('mongoose');
const _ = require('lodash');
const db = require('../db/DBConnection');

const TeacherSchema = new mongoose.Schema(
  {
    profile: String,
    firstname: {
      type: String,
      lowercase: true,
      // required: true,
    },
    surname: {
      type: String,
      lowercase: true,
      // required: true,
    },
    othername: {
      type: String,
      lowercase: true,
    },
    username: {
      type: String,
    },
    dateofbirth: String,
    gender: String,
    email: {
      type: String,
      lowercase: true,
    },
    phonenumber: String,
    address: String,
    residence: String,
    nationality: String,
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
            `${this.surname} ${this.firstname}`
          );
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
module.exports = db.model('Teacher', TeacherSchema);
