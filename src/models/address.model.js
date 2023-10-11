const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { statusCart, status } = require('../config/constantConfig');
const validator = require('validator');

const addressSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { // người nhận hàng
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      // unique: true,
      validate(value) {
        if (value && !validator.isMobilePhone(value, 'vi-VN')) {
          throw new Error('Invalid phone number');
        }
      },
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    status: {
      type: Number,
      default: 1,
      enum: [Object.values(status)]
    },

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
addressSchema.plugin(toJSON);
addressSchema.plugin(paginate);







addressSchema.pre('save', async function (next) {
  const cart = this;

  next();
});

/**
 * @typedef Address
 */
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
