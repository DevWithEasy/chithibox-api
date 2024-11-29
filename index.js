require("dotenv").config()
const path = require("path")
const http = require("http")
const express = require('express')
const dbConnection = require("./config/dbConnection")
const applyMidleware = require('./middleware/middlewares')
const applyRouter = require('./routers/routers')
const errorHandler = require('./middleware/errorHandler')
const socketConnection = require("./config/socketConnection")
const app = express();

app.use(express.static(path.join(__dirname,'public')))

const server = http.createServer(app)

applyMidleware(app)

applyRouter(app)

errorHandler(app)

socketConnection(server)

server.listen(process.env.PORT || 8080,()=>{
    console.log('Express server listening on port 8080')
    dbConnection()
})