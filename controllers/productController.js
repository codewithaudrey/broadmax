const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const Product = require('../models/productModel');
const { Storage } = require('../middlewares/upload');
const { validationResult } = require('express-validator');

const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);

    // if errors is not empty return an error array
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const product = req.body;
    const image = req.file.originalname;

    // firebase storage ref
    const storageRef = ref(Storage, `uploads/products/${image}`);

    // upload the product image to the database
    const imageData = await uploadBytes(storageRef, req.file.buffer)
      .then((data) => data)
      .catch((error) => res.status(400).json({ message: error.message }));

    // get uploaded product image download url
    const downloadUrl = await getDownloadURL(storageRef);

    const createdProduct = await Product.create({
      ...product,
      image: downloadUrl,
    });

    return res.status(200).json({ message: createdProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unable to create product ' + error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(200).json({ message: updatedProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unable to update product data ' + error.message });
  }
};

const deleteProduct = async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(300).json({ message: errors.array() });
  }

  try {
    // find product with id
    const product = await Product.findById(id);

    // check if product exists
    if (!product) {
      return res.status(404).json({ message: 'Unable to find product' });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unable to delete product ' + error.message });
  }
};

const getProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(300).json({ message: errors.array() });
  }

  try {
    const getProduct = await Product.findOne({ _id: id });

    return res.status(200).json({ message: getProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unable to find product ' + error.message });
  }
};

const allProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    if (allProducts.length < 1) {
      return res.status(400).json({ message: 'No product was found' });
    }

    return res.status(200).json({ message: allProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unable to find products ' + error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  allProducts,
};
