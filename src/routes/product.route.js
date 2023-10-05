const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const productController = require('../controllers/product.controller');


const router = express.Router();

router
  .route('/')
  .get(productController.getProduct)
  .post(auth('User'), productController.createProduct);


module.exports = router;
