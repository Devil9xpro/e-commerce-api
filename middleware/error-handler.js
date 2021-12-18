const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    //default error
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || `Something went wrong try again later`,
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map(item => item.message).join(',')
        customError.statusCode = 400
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value enter for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 404
    }

    if (err.name === 'CastError') {
        customError.msg = `No item fount with id ${err.value}`
    }

    return res.status(customError.statusCode).json({
        msg: customError.msg
    })
}

module.exports = errorHandlerMiddleware