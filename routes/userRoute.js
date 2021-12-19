const express = require('express')
const router = express.Router()
const {
    authenticatedUser,
    authorizePermissions
} = require('../middleware/authentication')
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController')

// Permission can be admin, owner
router.route('/').get(authenticatedUser, authorizePermissions('admin'), getAllUsers)

router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)

router.route('/:id').get(authenticatedUser, getSingleUser)


module.exports = router