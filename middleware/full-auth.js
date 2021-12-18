const CustomError = require('../errors')
const {isTokenValid} = require('../utils/jwt')

const authenticateUser = async (req, res, next) => {
    let token
    const authHeader = req.headers.authorization
    // check header
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split('')[1]
    }
    // check cookies
    else if (req.cookies.token) {
        token = req.cookies.token
    }

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }

    try {
        const payload = isTokenValid(token)
        req.user = {
            userId: payload.user.userId, role: payload.user.role
        }
        next()
    } catch (err) {
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthenticatedError('Unauthorized to access this routee')
        }
        next()
    }
}

module.exports = {
    authenticateUser, authorizeRoles
}