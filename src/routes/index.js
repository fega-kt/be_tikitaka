const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoriesRoute = require('./categories.route');
const productRoute = require('./product.route');
const cartRoute = require('./cart.route');
const docsRoute = require('./docs.route');
const config = require('../config/config');
const uploadRoute = require('./upload.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/categories',
    route: categoriesRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/purchases',
    route: cartRoute,
  },

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
console.log(config.env, "config.env")
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
