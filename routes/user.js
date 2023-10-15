const express = require('express');

const {
  signUp,
  signIn,
  updateAvatar,
  resetPassword,
  updateData,
} = require('../controllers/userController');

// routes request validation middlewares
const {
  validateSignUp,
  validateSignIn,
  validateUpdateData,
  validateResetPassword,
} = require('../validations/userValidation');
const { Upload } = require('../middlewares/upload');

const router = express.Router();

router.post('/create', validateSignUp, signUp);
router.post('/access', validateSignIn, signIn);
router.post('/update/avatar/:id', Upload.single('avatar'), updateAvatar);
router.patch('/reset/:type/:id', validateResetPassword, resetPassword);
router.patch('/update/:id', validateUpdateData, updateData);

module.exports = router;
