const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoriesService } = require('../services');

const createCategories = catchAsync(async (req, res) => {
  const categories = await categoriesService.createCategories(req.body);
  res.status(httpStatus.CREATED).send(categories);
});

const getCategories = catchAsync(async (req, res) => {
  console.log(11111111, req.query)
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoriesService.queryCategories(filter, options);
  return res.json(result)
});

module.exports = {
  getCategories,
  createCategories
};
