const express = require('express');
const multer = require('multer');
const fs = require('fs'); // Import the 'fs' module
const uploadFile = require('../controllers/upload.controller');
const router = express.Router();
const crypto = require('crypto');
const auth = require('../middlewares/auth');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { type = '' } = req.body
    const destinationPath = type ? `uploads/${type}` : 'uploads';

    fs.mkdirSync(destinationPath, { recursive: true });

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const cryptoRandom = crypto.randomBytes(8).toString('hex')

    cb(null, cryptoRandom + '-' + Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router
  .route('/')
  .post(upload.single('file'), uploadFile.uploadFile);
router
  .route('/:filename')
  .get(uploadFile.getFile)
module.exports = router;
