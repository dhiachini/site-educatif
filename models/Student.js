const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    laboratoryResult: {
      type: Number,
      default: null,
    },
    qcmResult: {
      type: Number,
      default: null,
    },
    q1: {
      type: Number,
      default: null,
    },
    q2: {
      type: Number,
      default: null,
    },
    q3: {
      type: Number,
      default: null,
    },
    q4: {
      type: Number,
      default: null,
    },
    q5: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", UserSchema);
