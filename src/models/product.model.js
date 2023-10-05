const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { status, typeDiscount } = require('../config/constantConfig');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 4
    },
    rating: Number, // Sao đánh giá
    sold: {
      type: Number,
      min: 0,
      default: 0,
    }, // số lượng đã bán
    price: { // Giá
      type: Number,
      required: true,
      min: 0,
      default: 0

    },
    discount: {  // Giá sau khi giảm
      type: {
        typeDiscount: {
          type: String,
          enum: Object.keys(typeDiscount)
        },
        discount: Number,
      },
      min: 0,
      default: 0
    },
    quantity: { // số lượng trong kho
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    category: { // Thể loại
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories',
      required: true
    },
    description: String,
    view: { // số lượng lượt xem
      type: Number,
      min: 0
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
    image: String,
    images: [String]
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);







productSchema.pre('save', async function (next) {
  const user = this;

  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('Product', productSchema);

module.exports = User;
