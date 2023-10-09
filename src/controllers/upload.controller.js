const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const { uploadService } = require('../services');
const mime = require('mime-types');

const uploadFile = catchAsync(async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "File không tồn tại" });
  }
  const body = {
    path: file.path,
    mimeType: mime.lookup(file.path),
    type: path.extname(file.path).toLowerCase(),
    name: file.originalname
  }
  const upload = await uploadService.createUpload(body);
  const data = {
    message: "Upload ảnh đại diện thành công",
    data: path.resolve(req.file.path)
  }
  res.status(httpStatus.OK).send(data);
});

module.exports = {
  uploadFile

};
