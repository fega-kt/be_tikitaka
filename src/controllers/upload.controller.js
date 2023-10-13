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
    // data: path.resolve(req.file.path)
    data: req.file.name

  }
  res.status(httpStatus.OK).send(data);
});
const getFileBase64 = catchAsync(async (filename) => {
  const filePath = path.join(__dirname, 'uploads', filename);

  if (!filePath || !fs.existsSync(filePath)) {
    // return res.status(404).json({ message: 'File not found' });
    return { status: 0 }
  }

  // Read the image file and convert it to base64
  const imageBuffer = fs.readFileSync(filePath);
  const base64ImageData = imageBuffer.toString('base64');

  // Create the response data
  const responseData = { avatar: `data:image/png;base64,${base64ImageData}` };

  return {
    avatar: `data:image/png;base64,${base64ImageData}`,
    status: 1
  }
})
module.exports = {
  uploadFile,
  getFileBase64
};
