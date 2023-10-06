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
router
  .route('/:productId')
  .get(productController.getProductById)


module.exports = router;
