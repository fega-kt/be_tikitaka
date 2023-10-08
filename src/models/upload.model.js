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
    // owner: { // Thể loại
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    mimeType: String,
    status: {
      type: Number,
      enum: Object.values(status),
      default: status.ACTIVE
    },

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);







productSchema.pre('save', async function (next) {
  const Upload = this;

  next();
});

/**
 * @typedef Upload
 */
const Upload = mongoose.model('Upload', productSchema);

module.exports = Upload;
