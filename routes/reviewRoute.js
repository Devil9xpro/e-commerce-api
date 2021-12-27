const express = require('express')
const router = express.Router()
const {
    authenticatedUser
} = require('../middleware/authentication')

const {
    createReview,
    getAllReview,
    getSingleReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController')

router.route('/')
    .post(authenticatedUser, createReview)
    .get(getAllReview)

router
    .route('/:id')
    .get(getSingleReview)
    .patch(authenticatedUser, updateReview)
    .delete(authenticatedUser, deleteReview)

module.exports = router