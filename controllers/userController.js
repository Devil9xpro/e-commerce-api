const User = require('../models/User')
const {
    StatusCodes
} = require('http-status-codes')
const CustomError = require('../errors')
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} = require('../utils')
const {
    use
} = require('express/lib/router')

const getAllUsers = async (req, res) => {
    const users = await User.find({
            role: 'user'
        })
        // does not include password in users
        .select('-password')

    res.status(StatusCodes.OK).json({
        users
    })
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({
            _id: req.params.id
        })
        .select('-password')
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`)
    }
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({
        user
    })
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({
        user: req.user
    })
}

// update user wiith user.findOneAndUpdate
// const updateUser = async (req, res) => {
//     const {
//         email,
//         name
//     } = req.body
//     if (!email || !name) {
//         throw new CustomError.BadRequestError('Please provide both email and name!!')
//     }
//     const user = await User.findOneAndUpdate({
//         _id: req.user.userId
//     }, {
//         email,
//         name
//     }, {
//         new: true,
//         runValidators: true
//     })
//     const tokenUser = createTokenUser(user)
//     attachCookiesToResponse({
//         res,
//         user: tokenUser
//     })
//     res.status(StatusCodes.OK).json({
//         user: tokenUser
//     })
// }

//update user with user.save
const updateUser = async (req, res) => {
    const {
        email,
        name
    } = req.body
    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide both email and name!!')
    }
    const user = await User.findOne({
        _id: req.user.userId
    })
    user.email = email
    user.name = name
    await user.save()
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({
        res,
        user: tokenUser
    })
    res.status(StatusCodes.OK).json({
        user: tokenUser
    })
}

const updateUserPassword = async (req, res) => {
    const {
        oldPassword,
        newPassword
    } = req.body
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both old and new password')
    }
    const user = await User.findOne({
        _id: req.user.userId
    })
    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({
        msg: 'Success!! Password is updated'
    })
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}