const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const { name, price, discount, quantity, category, description, image, images } = req.body;
  const body = {
    name, price, discount, quantity, category, description, image, images
  }
  const categories = await productService.createProduct(body);
  res.status(httpStatus.CREATED).send(categories);
});

const getProduct = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProduct(filter, options);
  const { data, limit, page, totalResults, totalPages } = result;
  const dataResult = {
    pagination: {
      limit,
      page,
      page_size: totalPages,

    },
    products: data
  }
  return res.json({ data: dataResult })
});

module.exports = {
  getProduct,
  createProduct
};
