//in this app using browser's localstorage and not using any database.
//JWT - json web token (example docs jwt.io) - also we use package name jsonwebtoken to use jwt
//a jwt token consist of 3 parts -> header, payload, signature
//one of the feature of http is that server does not remember any previous request made by same client so every time have to provide token to authenticate
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const mainRouter = require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// express middlewares
app.use(express.static('./public'));  //serving static files (frontend)
app.use(express.json());  //if we donot use it we won't have data in req.body used for post request here

//routes & userdefined middlewares
app.use('/api/v1', mainRouter);  //base url
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//setting up port for server
const port = process.env.PORT || 3000;

//starting the server
const start = async () => {
    try {
       app.listen(port,  console.log(`Server is listening on port ${port}...`) );
    }catch(error){
        console.log(error);
    }
  };
start();
