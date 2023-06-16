const express = require('express')
const compression = require('compression')
const cors = require('cors')

module.exports = app => {
    app.use(express.json())
    app.use(compression())
    app.use(cors())
}