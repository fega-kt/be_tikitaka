const httpStatus = require('http-status');
const { Upload } = require('../models');
const ApiError = require('../utils/ApiError');




const queryProduct = async (filter, options) => {
  const products = await Upload.paginate(filter, options);
  return products;
};

const createUpload = async (userBody) => {
  return Upload.create(userBody);
};



module.exports = {
  queryProduct,
  createUpload,
};
