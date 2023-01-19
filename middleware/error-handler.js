const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');  //this package helps in aliasing status codes with name

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later');  //for status code 500
}

module.exports = errorHandlerMiddleware;
