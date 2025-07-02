const products = require('./products');
const express = require('express');
const router = express.Router();
const validateProduct = require('./middleware/validation');
const { NotFoundError, ValidationError } = require('./middleware/errorHandler');

// Async wrapper to catch errors and forward to error handler
function asyncHandler(fn) {
    return function(req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// POST /products - create product with validation
router.post('/products', validateProduct, asyncHandler(async (req, res) => {
    const product = new products(req.body);
    await product.save();
    res.status(201).send(product);
}));

// GET /products - list products with filtering and pagination
router.get('/products', asyncHandler(async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) {
        filter.category = category;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const productsList = await products.find(filter).skip(skip).limit(parseInt(limit));
    res.send(productsList);
}));

// GET /products/:id - get product by id
router.get('/products/:id', asyncHandler(async (req, res) => {
    const product = await products.findById(req.params.id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.send(product);
}));

// PUT /products/:id - update product with validation
router.put('/products/:id', validateProduct, asyncHandler(async (req, res) => {
    const product = await products.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.send(product);
}));

// DELETE /products/:id - delete product
router.delete('/products/:id', asyncHandler(async (req, res) => {
    const product = await products.findByIdAndDelete(req.params.id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.send({ message: 'Product deleted successfully' });
}));

// GET /products/search - search products by name
router.get('/products/search', asyncHandler(async (req, res) => {
    const { name } = req.query;
    if (!name) {
        throw new ValidationError('Name query parameter is required');
    }
    const regex = new RegExp(name, 'i'); // case-insensitive search
    const results = await products.find({ name: regex });
    res.send(results);
}));

// GET /products/stats - get product count by category
router.get('/products/stats', asyncHandler(async (req, res) => {
    const stats = await products.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    res.send(stats);
}));

module.exports = router;
