const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const corsOptions = { 
    origin: process.env.NODE_ENV === 'production' ? 'https://chithibox.vercel.app' : 'http://localhost:3000', 
    credentials: true
}

const middlewares = [
    cors(corsOptions),
    morgan('dev'),
    express.urlencoded({extended: false}),
    express.json()
]

const applyMidleware = (app) =>{
    middlewares.map(m=>app.use(m))
}
module.exports = applyMidleware