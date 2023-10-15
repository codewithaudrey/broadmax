const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  allProducts,
} = require('../controllers/productController');

const {
  validateUpdateProduct,
  validateCreateProduct,
  validateProductId,
} = require('../validations/productValidation');
const { Upload } = require('../middlewares/upload');

const router = express.Router();
router.use(requireAuth);

router.post(
  '/create',
  Upload.single('image'),
  validateCreateProduct,
  createProduct
);
router.patch('/update/:id', validateUpdateProduct, updateProduct);
router.delete('/delete/:id', validateProductId, deleteProduct);
router.get('/single/:id', validateProductId, getProduct);
router.get('/', allProducts);

module.exports = router;
