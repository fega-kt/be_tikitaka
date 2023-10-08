const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');




const queryCart = async (filter, options) => {
  const cart = await Cart.paginate(filter, options);
  return cart;
};

const createProduct = async (userBody) => {
  return Cart.create(userBody);
};
const getProductById = async (id) => {
  return Cart.findById(id);
};


module.exports = {
  queryCart,
  // createProduct,
  // getProductById,

};
