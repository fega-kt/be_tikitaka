const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');




const queryProduct = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

const createProduct = async (userBody) => {
  return Product.create(userBody);
};
const getProductById = async (id) => {
  return Product.findById(id);
};


module.exports = {
  queryProduct,
  createProduct,
  getProductById,

};
