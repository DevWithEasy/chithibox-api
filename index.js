require("dotenv").config();
const path = require("path");
const express = require('express');
const dbConnection = require("./config/dbConnection");
const applyMidleware = require('./middleware/middlewares');
const applyRouter = require('./routers/routers');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply middlewares and routers
applyMidleware(app);
applyRouter(app);
errorHandler(app);;

// Start the server
app.listen(process.env.PORT || 8080, () => {
    console.log(process.env.NODE_ENV === 'production' ? 'https://chithibox.vercel.app' : 'http://localhost:3000');
    dbConnection();
});