const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');
const { statusCart } = require('../config/constantConfig');




const queryCart = async (filter, options) => {
  const cart = await Cart.paginate(filter, options);
  return cart;
};

const createCart = async (userBody) => {
  return await Cart.create(userBody);
};
const updateCart = async (filter, update) => {
  return await Cart.findOneAndUpdate(filter, update, {
    new: true,
    useFindAndModify: false
  });
};
const getCartFilter = async (filter) => {
  return await Cart.find(filter)
}
const getCartById = async (id) => {
  return await Cart.findById(id);
};
const getCartByIdProductTemp = async (id, status) => {
  return await Cart.findOne({ product_id: id, status: status }).exec();
};


module.exports = {
  queryCart,
  createCart,
  getCartById,
  getCartByIdProductTemp,
  updateCart,
  getCartFilter
};
