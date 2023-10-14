const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const { uploadService } = require('../services');
const mime = require('mime-types');
const fs = require('fs'); // Import the 'fs' module

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
    // data: path.resolve(req.file.path)
    data: req.file.filename

  }
  res.status(httpStatus.OK).send(data);
});
const getFile = catchAsync(async (req, res) => {
  const { filename } = req.params;
  const { type } = req.query
  const pathFolder = type ? `uploads/${type}` : 'uploads'
  const filePath = path.join(__dirname, '..', '..', pathFolder, filename);
  console.log(filePath, "filePath")
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found' });
  }
  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
})
module.exports = {
  uploadFile,
  getFile
};
