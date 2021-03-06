require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const items = require('./routes/api/items')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('MongoDB connected.')
	})
	.catch((err) => {
		console.log(err)
	})

app.use('/api/items', items)

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
