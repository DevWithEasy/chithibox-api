const express = require('express');
const http = require('http');
const path = require('path');
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const applyMidleware = require('./middleware/middlewares');
const applyRouter = require('./routers/routers');
const errorHandler = require('./middleware/errorHandler');
const socketConnection = require('./config/socketConnection');

const app = express();
const server = http.createServer(app)

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply other middlewares and routers
applyMidleware(app);
applyRouter(app);
errorHandler(app);
socketConnection(server)

// Start the server
app.listen(process.env.PORT || 8080, () => {
    dbConnection();
});