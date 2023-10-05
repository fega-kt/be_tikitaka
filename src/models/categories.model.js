const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { status } = require('../config/constantConfig');

const categoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: Number,
      enum: Object.values(status),
      default: status.ACTIVE
    },
    order: {
      type: Number,
      default: 1
    },
    value: {
      type: String,
      required: true,
      minlength: 4,
      trim: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categoriesSchema.plugin(toJSON);
categoriesSchema.plugin(paginate);







categoriesSchema.pre('save', async function (next) {
  const user = this;

  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('Categories', categoriesSchema);

module.exports = User;
