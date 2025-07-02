function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = 'your-secure-api-key'; // Replace with your actual API key or use environment variable

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }
    next();
}

module.exports = authenticateApiKey;
