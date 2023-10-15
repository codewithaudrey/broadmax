const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const { firebaseConfig } = require('../configs/firebaseConfig');

initializeApp(firebaseConfig);

const Storage = getStorage();

const Upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //file size cannot exceed 5MB
    files: 1, // only one file is allowed per upload
  },
});

module.exports = { Storage, Upload };
