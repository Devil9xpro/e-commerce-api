const express = require('express')
const router = express.Router()
const {
    authenticatedUser,
    authorizePermissions
} = require('../middleware/authentication')
const {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController')

router.route('/')
    .post([authenticatedUser, authorizePermissions('admin')], createProduct)
    .get(getAllProduct)

router.route('/uploadImage')
    .post([authenticatedUser, authorizePermissions('admin'), uploadImage])

router.route('/:id')
    .get(getSingleProduct)
    .patch([authenticatedUser, authorizePermissions('admin')], updateProduct)
    .delete([authenticatedUser, authorizePermissions('admin')], deleteProduct)

module.exports = router