const User = require('../models/User')
const {
    StatusCodes
} = require('http-status-codes')
const CustomError = require('../errors')

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
    res.status(StatusCodes.OK).json({
        user
    })
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({
        user: req.user
    })
}

const updateUser = async (req, res) => {
    res.send(req.body)
}

const updateUserPassword = async (req, res) => {
    res.send(req.body)
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}