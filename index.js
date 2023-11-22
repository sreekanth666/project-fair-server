require('dotenv').config()
const express = require('express')
const cors = require('cors')
require("./DB/connection")
const router = require('./Routes/router')

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = process.env.PORT || 4000;

pfServer.listen(PORT, () => {
    console.log(`Project Fair server is up and listening at port ${PORT}`);
})

pfServer.get('/', (req, res) => {
    res.send("<h1>Project Fair server is up and listening to requests</h1>")
})

pfServer.post('/', (req,res) => {
    res.send("POST Request")
})

pfServer.put('/', (req,res) => {
    res.send("PUT Request")
})
