// const fs = require('fs')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongo = require('./app/mongodb')
const router = require('./app/routes')

// initialize dotenv
dotenv.config()

//set port
const port = process.env.PORT || 8080

// get body of POST params
// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

//register routes
app.use(router)

// start mongo connection pool, then fire up express app
mongo.connect(process.env.MONGODB_URL)
    .then(() => app.listen(port))
    .then(() => console.log(`learnin\' stuff on: ${port}`))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })