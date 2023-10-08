const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { statusCart } = require('../config/constantConfig');

const productSchema = mongoose.Schema(
  {
    product_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
    status: {
      type: Number,
      default: -1,
      enum: [Object.values(statusCart)]
    },
    buy_count: {
      type: Number,
      default: 1,
      min: 1,
      max: 100,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);







productSchema.pre('save', async function (next) {
  const cart = this;

  next();
});

/**
 * @typedef Cart
 */
const Cart = mongoose.model('Cart', productSchema);

module.exports = Cart;
