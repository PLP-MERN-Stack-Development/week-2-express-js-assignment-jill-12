const express = require('express');
const mongoose = require('mongoose');
const productsRoutes = require('./routes');
const logger = require('./middleware/logger');
const authenticateApiKey = require('./middleware/auth');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Use custom logger middleware
app.use(logger);

// Use authentication middleware globally (optional, or can be used selectively in routes)
app.use(authenticateApiKey);

const mongoUri ='mongodb://localhost:27017/productsdb';
const PORT = 3000;    
// Connect to MongoDB

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/', productsRoutes);

// Use global error handling middleware
app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});
