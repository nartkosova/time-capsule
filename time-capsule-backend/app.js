const express = require ('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/users', usersRouter)