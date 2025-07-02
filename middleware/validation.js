function validateProduct(req, res, next) {
    const { name, price, category } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing product name' });
    }
    if (price === undefined || typeof price !== 'number') {
        return res.status(400).json({ error: 'Invalid or missing product price' });
    }
    if (!category || typeof category !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing product category' });
    }
    next();
}

module.exports = validateProduct;
