const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const cartController = require('../controllers/cart.controller');

const router = express.Router();

router
  .route('/')
  // .post(auth('getCart'), cartController.cart)
  .get(auth('getCart'), cartController.getCarts);
router
  .route('/add-to-cart')
  .post(auth('getCart'), cartController.addToCart)
router
  .route('/buy-products')
  .post(auth('getCart'), cartController.buyProduct)
// .get(auth('getCart'), cartController.getCarts);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
