const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');
const { statusCart } = require('../config/constantConfig');

// const createUser = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   res.status(httpStatus.CREATED).send(user);
// });

const getCarts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const query = {
    populate: 'product_id'
  }
  const options = pick(query, ['populate']);
  const result = await cartService.queryCart(filter, options);
  let { data } = result;
  data = data.map((it) => {
    const { _doc } = it
    return {
      ..._doc,
      product: it?.product_id,
      product_id: it?.product_id?._id
    }

  })
  result.data = data;
  res.send(result);
});
const addToCart = catchAsync(async (req, res) => {
  const {
    buy_count,
    product_id
  } = req.body
  const foundProduct = await cartService.getCartByIdProductTemp(product_id, statusCart.TEMP);
  if (foundProduct) {
    // update tăng thêm 1
  } else {
    // create
    const body = { buy_count, product_id }
    const cart = await cartService.createCart(body);
    return res.status(httpStatus.CREATED).send(cart);

  }
})

module.exports = {
  getCarts,
  addToCart,
  // getUsers,
  // getUser,
  // updateUser,
  // deleteUser,
};
