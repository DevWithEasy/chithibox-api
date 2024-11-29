const express = require('express');
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const applyMidleware = require('./middleware/middlewares');
const applyRouter = require('./routers/routers');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Apply CORS middleware first
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Include if you need to send cookies or authentication
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply other middlewares and routers
applyMidleware(app);
applyRouter(app);
errorHandler(app);

// Start the server
app.listen(process.env.PORT || 8080, () => {
    dbConnection();
});