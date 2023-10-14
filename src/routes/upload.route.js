const express = require('express');
const multer = require('multer');
const fs = require('fs'); // Import the 'fs' module
const uploadFile = require('../controllers/upload.controller');
const router = express.Router();
const crypto = require('crypto');
const auth = require('../middlewares/auth');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const destinationPath = `uploads`;

    // Create the directory if it doesn't exist
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
  .post(upload.single('file'), uploadFile.uploadFile)
module.exports = router;
