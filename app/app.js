const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path");

require('dotenv').config()



const deviceRoutes = require("./router/routes")

const app = express()

app.use(express.json())

app.use(cors())

app.use("/files", express.static(path.resolve(__dirname,"..","uploads")))

app.use('/kyc', deviceRoutes)

//Global error handling
app.use((error, req, res, next)=>{
    const status = error.statusCode || 500
    const message = error.message || "Uncaught error"
    //Email if error 500
    res.status(status).json({
        message: message
    })
})

app.get('/api/stores/', (req, res, next)=> {
    res.send('<h1 style="text-align: center">This is the Loyalty Company Service!</h1>')
})
app.get('/kyc', (req, res, next)=> {
    res.send('<h1 style="text-align: center">Welcome to Loyalty Engine! This is the Company Service!</h1>')
})
module.exports = app