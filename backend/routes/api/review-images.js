const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.delete('/:id', requireAuth, async(req, res) => {
    const userId = req.user.id
    const reviewImage = await ReviewImage.findByPk(req.params.id);
    const review = reviewImage ? await Review.findByPk(reviewImage.reviewId) : null

    if(!reviewImage || ! review) {
        return res.status(404).json({"message": "Review Image couldn't be found"})
    }

    if(review.userId === userId){
        await reviewImage.destroy();
        res.json({  "message": "Successfully deleted"})
    }else {
        res.status(403).json({"message": "Unauthorized"})
    }
})








module.exports = router;
