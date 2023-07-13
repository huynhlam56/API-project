const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:id', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const spotImage = await SpotImage.findByPk(req.params.id);
    const spot = spotImage ? await Spot.findByPk(spotImage.spotId) : null

    if(!spotImage || !spot) {
        return res.status(404).json({"message": "Spot Image couldn't be found"})
    }

    if(spot.ownerId === userId) {
        await spotImage.destroy();
        res.json({ "message": "Successfully deleted"})
    }else {
        res.status(403).json({"message": "Unauthorized"})
    }
})












module.exports = router;
