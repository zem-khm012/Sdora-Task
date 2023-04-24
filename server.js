const express = require('express')
const app = express()
var dotenv = require('dotenv').config({
    path: "./config.env"
})
global.dotenv = dotenv
var port = process.env.PORT

const db = require('./db/connection')

//Middleware for transfer of data between client and server 
const bodyparser = require('body-parser')
app.use(bodyparser.json())


//Cors module for non blocking the api
const cors = require('cors')
app.use(cors())


const userRoutes=require('./Routes/user')
app.use('/api',userRoutes)


//Static path for image 
app.use('/view/uploads',express.static('view/uploads'))


//Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Listening event
app.listen(port, () => {
    console.log(`server started at ${port}`);
})