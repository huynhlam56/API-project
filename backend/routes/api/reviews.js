const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateReviews = [
  check('review')
  .exists({ checkFalsy: true })
  .withMessage('Review text is required'),
  check('stars')
  .exists({ checkFalsy: true })
  .isInt({min: 1, max: 5})
  .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

// Get all reviews of current user

router.get('/current', requireAuth, async(req, res) => {
  const userId = req.user.id;

  const userReviews = await Review.findAll({
  where: { userId },
  include: [
    {
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    },
    {
      model: Spot,
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
    },
    {
      model: ReviewImage,
      attributes: ['id', 'url']
    }
  ],
  attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
})
  let reviews = []
  for(let i = 0; i < userReviews.length; i++) {
    let previewImage = await SpotImage.findOne({
      where: {
        spotId: userReviews[i].spotId,
        preview: true
      }
    })
    let review = {
      id: userReviews[i].id,
      userId: userReviews[i].userId,
      spotId: userReviews[i].spotId,
      review: userReviews[i].review,
      stars: userReviews[i].stars,
      createdAt: userReviews[i].createdAt,
      updatedAt: userReviews[i].updatedAt,
      User: userReviews[i].User,
      Spot: {
        id: userReviews[i].spotId,
        ownerId: userReviews[i].Spot.ownerId,
        address: userReviews[i].Spot.address,
        city: userReviews[i].Spot.city,
        state: userReviews[i].Spot.state,
        country: userReviews[i].Spot.country,
        lat: userReviews[i].Spot.lat,
        lng: userReviews[i].Spot.lng,
        name: userReviews[i].Spot.name,
        price: userReviews[i].Spot.price,
        previewImage: previewImage ? previewImage.url : 'No preview'
    },
      ReviewImages: userReviews[i].ReviewImages
    }
    reviews.push(review)
  }

  return res.json({ Reviews: reviews });
})

// Add an Image to a Review based on the Review's Id

router.post('/:id/images', requireAuth, async(req,res) => {
  const userId = req.user.id;
  const reviewId = req.params.id;
  const { url } = req.body

  const review = await Review.findByPk(req.params.id)

  if(!review) {
    return res.status(404).json({ "message": "Review couldn't be found" })
  }

  const imageCount = await ReviewImage.count({
    where: { reviewId }
  });


  if(imageCount >= 10) {
    return res.status(403).json({  "message": "Maximum number of images for this resource was reached" })
  }

  if(userId === review.userId) {
    const image = await ReviewImage.create({
      reviewId,
      url
    })
    const newImage = {
      id: image.id,
      url: image.url
    }
    return res.json(newImage)
  } else {
    return res.status(403).json({ "message": "Unauthorized"})
  }
})

// Edit a review

router.put('/:id', requireAuth, validateReviews, async (req, res) => {
  const userId = req.user.id;

  const { review, stars } = req.body;

  const updatedReview = await Review.findByPk(req.params.id)

  if(!updatedReview) {
    return res.status(404).json({ "message": "Review couldn't be found"})
  }
  if(userId === updatedReview.userId) {
    if(review) {
      updatedReview.review = review
    }
    if(stars) {
      updatedReview.stars = stars
    }
    updatedReview.save()
    res.json(updatedReview)
  }else {
    res.status(403).json({"message": "Unauthorized"})
  }
})

//Delete a review

router.delete('/:id',requireAuth, async(req, res) => {
  const userId = req.user.id;
  let reviewToDelete = await Review.findByPk(req.params.id);

  if(!reviewToDelete) {
    return res.status(404).json({"message": "Review couldn't be found"})
  }

  if(userId === reviewToDelete.userId) {
    await reviewToDelete.destroy();
    res.json({"message": "Successfully deleted"})
  }else {
    res.status(403).json({"message": "Unauthorized"})
  }
})

module.exports = router;
