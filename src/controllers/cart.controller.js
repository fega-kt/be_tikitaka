const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService, productService, addressService } = require('../services');
const { statusCart, status } = require('../config/constantConfig');

// const createUser = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   res.status(httpStatus.CREATED).send(user);
// });

const getCarts = catchAsync(async (req, res) => {
  const { user } = req
  const filter = pick(req.query, ['status']) || {};
  if (filter.status === '0') {
    const status = statusCart;
    delete status.DELETED;
    delete status.TEMP;
    filter.status = { $in: Object.values(statusCart) }
  }
  filter.owner = user._id

  const query = {
    populate: 'product_id',
    limit: Number.MAX_SAFE_INTEGER,
  }
  const options = pick(query, ['populate', 'limit']);
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
  const { user, body } = req;
  const {
    buy_count,
    product_id,
  } = body
  const foundProduct = await cartService.getCartByIdProductTemp(product_id, statusCart.TEMP, user._id);
  if (foundProduct) {
    // update tăng thêm 1
    const cart = await cartService.updateCart({ _id: foundProduct._id }, { buy_count: foundProduct.buy_count + buy_count });
    return res.status(httpStatus.CREATED).send({ data: cart });
  } else {
    // create
    const body = { buy_count, product_id, owner: user._id }
    const cart = await cartService.createCart(body);
    return res.status(httpStatus.CREATED).send({ data: cart });
  }
})
const buyProduct = catchAsync(async (req, res) => {
  const data = req.body;
  const user = req.user
  const filterAddress = {
    owner: user._id,
    status: status.ACTIVE
  }
  const findAddress = await addressService.queryAddress(filterAddress)
  if (!findAddress) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: `Vui lòng cập nhật thông tin giao hàng` });
  }
  const listProduct = data.map((it) => {
    const filter = {
      status: status.ACTIVE,
      quantity: { $gte: it.buy_count }
    }
    return productService.getProductOneFilter(filter)
  })
  const products = await Promise.all(listProduct)
  const idxInvalid = products.findIndex((item => !item));
  if (idxInvalid > -1) {
    //  có sản phẩm không hợp lệ
    const itemInvalid = data[idxInvalid]
    const product = await productService.getProductById(itemInvalid.product_id);
    if (product.status === status.INACTIVE || !product) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: `Sản phẩm ${product.name} không tồn tại` });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({ message: `Số lượng sản phẩm ${product.name} chỉ còn ${product.quantity}` });
    }
  }
  const listProductUpdate = data.map((it) => {
    // Cập nhật thành trạng thái chờ xác nhận
    return cartService.updateCart({ _id: it._id }, { status: statusCart.WAIT_FOR_CONFIRMATION })
  });
  const productsUpdate = await Promise.all(listProductUpdate);
  return res.status(httpStatus.OK).send(productsUpdate);
})
module.exports = {
  getCarts,
  addToCart,
  buyProduct
  // getUsers,
  // getUser,
  // updateUser,
  // deleteUser,
};
