const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, addressService } = require('../services');
const { status } = require('../config/constantConfig');


const getMyAddress = catchAsync(async (req, res) => {
  const { user } = req;
  const filter = {
    status: status.ACTIVE,
    owner: user._id
  }
  const result = await addressService.queryAddress(filter, {});
  return res.status(httpStatus.OK).send({ data: result });

});
const updateMyAddress = catchAsync(async (req, res) => {
  const { user, body } = req;
  body.owner = user._id
  const userUpdate = await addressService.updateAddress({ owner: user._id, status: status.ACTIVE }, body)
  res.send({ data: userUpdate });
});


module.exports = {
  getMyAddress,
  updateMyAddress
};
