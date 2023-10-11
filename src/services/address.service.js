const httpStatus = require('http-status');
const { Cart, Address } = require('../models');
const ApiError = require('../utils/ApiError');
const { statusCart, status } = require('../config/constantConfig');




const queryAddress = async (filter) => {
  console.log(filter, 'filter')
  const address = await Address.findOne(filter)
  return address;
};


const updateAddress = async (filter, update) => {
  // xóa địa chỉ cũ
  await Address.findOneAndUpdate(filter, { status: status.INACTIVE }, {
    new: true,
    useFindAndModify: false
  });
  // thêm địa chỉ mới
  const addNewAddress = await Address.create(update);
  // const data = await Promise.all([removeAddress, addNewAddress])
  return addNewAddress
};

module.exports = {
  queryAddress,
  updateAddress,
};
