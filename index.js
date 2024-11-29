require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require('express');
const dbConnection = require("./config/dbConnection");
const applyMidleware = require('./middleware/middlewares');
const applyRouter = require('./routers/routers');
const errorHandler = require('./middleware/errorHandler');
const { Server } = require('socket.io');

const app = express();

// CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://chithibox.vercel.app"); // Allow your client URL
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow necessary methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Handle preflight requests
    }
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create HTTP server
const server = http.createServer(app);

// Apply middlewares and routers
applyMidleware(app);
applyRouter(app);
errorHandler(app);

// Initialize Socket.io with CORS settings
const io = new Server(server, {
    cors: {
        origin: [
            'https://chithibox.vercel.app', 
            'http://localhost:3000'
        ],
        methods: ["GET", "POST"],
        credentials: true 
    }
});

// Socket.io connection handling
io.on('connection', (socket) => {
    socket.on('chithibox', id => {
        console.log('New user connected', id);
        socket.join(id);
    });

    // Handling sent messages
    socket.on('sent', id => {
        socket.to(id).emit('incoming', { id: id });
    });
});

// Start the server
server.listen(process.env.PORT || 8080, () => {
    console.log('Express server listening on port 8080');
    dbConnection();
});