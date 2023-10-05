const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const categoriesController = require('../controllers/categories.controller');


const router = express.Router();

router
  .route('/')
  .post(auth('User'), categoriesController.createCategories)
  .get(categoriesController.getCategories);


module.exports = router;
