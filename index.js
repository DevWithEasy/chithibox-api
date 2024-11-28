require('module-alias/register');
require("dotenv").config()
const path = require("path")
const express = require('express');
const errorHandler = require("@middleware/errorHandler");
const applyMidleware = require("@middleware/middlewares");
const applyRouter = require("@router/routers");
const dbConnection = require("./config/dbConnection");
const app = express();

app.use(express.static(path.join(__dirname,'public')))

applyMidleware(app)

applyRouter(app)

errorHandler(app)

app.listen(process.env.PORT || 8080,()=>{
    console.log('Express server listening on port 8080')
    dbConnection()
})