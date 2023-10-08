const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');
const { statusCart } = require('../config/constantConfig');




const queryCart = async (filter, options) => {
  const cart = await Cart.paginate(filter, options);
  return cart;
};

const createCart = async (userBody) => {
  return Cart.create(userBody);
};
const getCartById = async (id) => {
  return Cart.findById(id);
};
const getCartByIdProductTemp = async (id, status) => {
  return Cart.findOne({ product_id: id, status: status }).exec();
};


module.exports = {
  queryCart,
  createCart,
  getCartById,
  getCartByIdProductTemp
};
