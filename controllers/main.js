// check username, password in post(login) request
// if exist create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dasboard
//common approach on frontend for token is to setup the authorization header in the API request.

//in this app sending request from frontend only
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
    const { username, password } = req.body;
    //there are 3 methods for validation which we can perform ; 1. Mongoose validation(models->Schema), 2.JOI, 3.checking in controller itself
    if (!username || !password) {  // as not using database so not using mongoose validation, here using another package JOI for validation
        throw new BadRequestError('Please provide email and password');
    }
    const id = new Date().getDate()  //just for demo, normally provided by DB!!!!, here as not using db so providing our own

    // try to keep payload small, better experience for user
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });   //creating a new token, in payload donot share passwords while creating token very bad practice it is
    res.status(200).json({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
}

module.exports = { login, dashboard };
