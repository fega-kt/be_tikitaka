const httpStatus = require('http-status');
const { Categories } = require('../models');
const ApiError = require('../utils/ApiError');




const queryCategories = async (filter, options) => {
  const users = await Categories.paginate(filter, options);
  return users;
};

const createCategories = async (userBody) => {
  return Categories.create(userBody);
};
const getCategoriesById = async (id) => {
  return Categories.findById(id);
};


module.exports = {
  queryCategories,
  createCategories,
  getCategoriesById,

};
