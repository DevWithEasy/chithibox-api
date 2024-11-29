require("dotenv").config()
const path = require("path")
const http = require("http")
const express = require('express')
const dbConnection = require("./config/dbConnection")
const applyMidleware = require('./middleware/middlewares')
const applyRouter = require('./routers/routers')
const errorHandler = require('./middleware/errorHandler')
const { Server } = require('socket.io')
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)

applyMidleware(app)

applyRouter(app)

errorHandler(app)

const io = new Server(server, {
    cors: {
        origin: [
            'https://chithibox.vercel.app', 
            'http://localhost:3000'
        ],
        methods: ["GET", "POST"],
        allowedHeaders: [""],
        credentials: true 
    }
});

io.on('connection', (socket) => {
    socket.on('chithibox', id => {
        console.log('New user connected', id)
        socket.join(id)
    })

    //=============mail==============

    //sent
    socket.on('sent', id => {
        socket.to(id).emit('incoming', { id: id })
    })
})
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://chithibox.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

server.listen(process.env.PORT || 8080, () => {
    console.log('Express server listening on port 8080')
    dbConnection()
})