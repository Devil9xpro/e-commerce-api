const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('./custom-api')

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOTFOUND
    }
}

module.exports = NotFoundError