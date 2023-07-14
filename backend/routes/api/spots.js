const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const validateSpots = [
    check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
    check('country')
    .exists({checkFalsy: true})
    .withMessage('Country is required'),
    check('lat')
    .exists({checkFalsy: true})
    .isFloat()
    .withMessage('Latitude is not valid'),
    check('lng')
    .exists({checkFalsy: true})
    .withMessage('Longitude is not valid'),
    check('name')
    .exists({checkFalsy: true})
    .isLength({max: 49})
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({checkFalsy: true})
    .withMessage('Description is required'),
    check('price')
    .exists({checkFalsy: true})
    .isFloat()
    .withMessage('Price per day is required'),
    handleValidationErrors
  ];

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

// get all spots
router.get('', async (req, res) => {
  let spots = await Spot.findAll()
  let newSpots = []
  for (let i = 0; i < spots.length; i++) {
    let previewImage = await SpotImage.findOne({
    where: {
      spotId: spots[i].id,
      preview: true,
    }
  });
  let avgRating = await Review.findOne({
    attributes: [
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
    ],
    where: {
      spotId: spots[i].id
    },
  })
  let newSpot = {
    id: spots[i].id,
    ownerId: spots[i].ownerId,
    address: spots[i].address,
    city: spots[i].city,
    state: spots[i].state,
    country: spots[i].country,
    lat: spots[i].lat,
    lng: spots[i].lng,
    name: spots[i].name,
    description: spots[i].description,
    price: spots[i].price,
    createdAt: spots[i].createdAt,
    updatedAt: spots[i].updatedAt,
    avgRating: avgRating ? avgRating.dataValues.avgRating : 'No reviews',
    previewImage: previewImage ? previewImage.url : 'No preview image'
  }
  newSpots.push(newSpot)
}

return res.json({
  Spots: newSpots
})
});

// get all spots of current user
router.get('/current', requireAuth, async(req, res) => {
  const usersSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })
  let newSpots = []
  for (let i = 0; i < usersSpots.length; i++) {
    let previewImage = await SpotImage.findOne({
      where: {
        spotId: usersSpots[i].id,
        preview: true,
      }
    });
  let avgRating = await Review.findOne({
    attributes: [
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
    ],
    where: {
      spotId: usersSpots[i].id
    },
  });
  let newSpot = {
    id: usersSpots[i].id,
    ownerId: usersSpots[i].ownerId,
    address: usersSpots[i].address,
    city: usersSpots[i].city,
    state: usersSpots[i].state,
    country: usersSpots[i].country,
    lat: usersSpots[i].lat,
    lng: usersSpots[i].lng,
    name: usersSpots[i].name,
    description: usersSpots[i].description,
    price: usersSpots[i].price,
    createdAt: usersSpots[i].createdAt,
    updatedAt: usersSpots[i].updatedAt,
    avgRating: avgRating ? avgRating.dataValues.avgRating : 'No reviews',
    previewImage: previewImage ? previewImage.url : 'No preview image'
  }
  newSpots.push(newSpot)
}
  return res.json({
    Spots: newSpots
  })
})

// Get all bookings for a spot based on the spot's id

router.get('/:id/bookings', requireAuth, async(req, res) => {
  const ownerId = req.user.id;

  const spot = await Spot.findByPk(req.params.id);
  if(!spot){
    res.status(404).json({ "message": "Spot couldn't be found"})
  };

  const bookings = await Booking.findAll({
    where: {
      spotId: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });

  if(spot.ownerId === ownerId) {
    const userBookings = [];
    for(const booking of bookings) {
      const userBooking = {
        User: {
          id: booking.User.id,
          firstName: booking.User.firstName,
          lastName: booking.User.lastName
        },
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      };
      userBookings.push(userBooking)
    }
    return res.status(200).json({Bookings: userBookings})
  }else {
    const noUserBookings = []
    for ( const booking of bookings) {
      const noUserBooking = {
        spotId: booking.id,
        startDate: booking.startDate,
        endDate: booking.endDate
      }
      noUserBookings.push(noUserBooking)
    }
    return res.json({Booking: noUserBookings})
  }
})

//Create a Booking for a Spot based on the Spot's id

router.post('/:id/bookings', requireAuth, async(req,res) => {
  const spotId = req.params.id;
  const userId = req.user.id
  let { startDate, endDate } = req.body

  const spot = await Spot.findByPk(req.params.id);
  if(!spot) res.status(404).json({"message": "Spot couldn't be found"})
  if(spot.ownerId === userId) return res.status(400).json({"message": "Unable to book your own spot"});

  if(endDate <= startDate) {
    return res.status(400).json({
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
      "endDate": "endDate cannot be on or before startDate"
    }})
  }

  if(startDate < new Date().getTime() || endDate < new Date().getTime()) {
    res.status(403).json({"message": "Start date and End date cannot be before current date"})
  }

  const bookings = await Booking.findAll({where: {spotId }});

  for(let i = 0; i < bookings.length; i++) {
    let booking = bookings[i]
    let bookingStartDate = new Date(booking.startDate)
    let bookingEndDate = new Date(booking.endDate)

    if( (new Date(startDate) >= bookingStartDate && new Date(startDate) <= bookingEndDate || (new Date(endDate) >= bookingStartDate && new Date(endDate) <= bookingEndDate ))) {
      return res.status(403).json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "errors": {
          "startDate": "Start date conflicts with an existing booking",
          "endDate": "End date conflicts with an existing booking"
        }
      });
    }
  }
  const toBook = await Booking.create({ spotId, userId, startDate, endDate })
    const newBooking = {
      id: toBook.id,
      userId: userId,
      spotId: spotId,
      startDate: toBook.startDate,
      endDate: toBook.endDate,
      createdAt: toBook.createdAt,
      updatedAt: toBook.updatedAt
    }
    res.status(200).json(newBooking)
  })

// Get all reviews by spotId

router.get('/:id/reviews', async(req,res) => {
  const spotId = req.params.id
  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })
    res.status(200).json({Reviews: reviews})
})

//get details for a Spot from an id

router.get('/:id', async(req, res) => {
  const spotId = req.params.id
  const numReviews = await Review.count({
    where: {
      spotId: spotId
    }
  });

  let avgStarRating = await Review.findOne({
    attributes: [
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
    ],
    where: {
      spotId: spotId
    }
  })

  const spot = await Spot.findByPk(req.params.id, {
    include: [
      {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
      },
      {
          model: User, as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
      }
    ],
    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt'
    ]
  });
    if(spot) {
      avgStarRating = avgStarRating.dataValues.avgStarRating
      return res.json({...spot.toJSON(), numReviews, avgStarRating})
    }else {
      res.status(404),
      res.json({"message": "Spot couldn't be found"})
    }
  })

//Create a new review for a spot
router.post('/:id/reviews', requireAuth, validateReviews, async(req,res) => {
  const userId  = req.user.id;
  const spotId = req.params.id
  const { review, stars } = req.body;

  const existingReview = await Review.findOne({
    where: {
      spotId: req.params.id,
      userId: req.user.id
    }
  });

  if(!spotId) {
    res.status(404).json({ "message": "Spot couldn't be found" })
  };

  if(existingReview) {
    return res.status(500).json({  "message": "User already has a review for this spot"})
  } else {
    const reviews = await Review.create({
      userId,
      spotId,
      review,
      stars
    })
    const newReview = {
      id: reviews.id,
      userId: userId,
      spotId: spotId,
      review: reviews.review,
      stars: reviews.stars
    }
    return res.status(201).json({ review: newReview })
  }
})

// create new spot
router.post('', requireAuth, validateSpots, async (req,res) => {
  const ownerId = req.user.id
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  if(ownerId) {
    const spot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    })

    const newSpot = {
      id: spot.id,
      ownerId: ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt
    }
    return res.status(201).json({ spot: newSpot })
  }else {
    res.status(400),
    res.json({
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
    })
  }
});


//Add an Image to a Spot based on the Spot's id

router.post('/:id/images', requireAuth, async(req, res) => {
  const ownerId = req.user.id;
  const spotId = req.params.id;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.id, {
   include: [{ model: SpotImage }]
  })

  if(!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }

  if(ownerId === spot.ownerId) {
    const image = await SpotImage.create({
      spotId,
      url,
      preview
    })
    const newImage = {
      id: image.id,
      url: image.url,
      preview: image.preview
    }
    return res.json(newImage)
  } else {
    res.status(403).json({
      "message": "Not authorized"
    })
  }
})

// Edit a Spot
router.put('/:id', requireAuth, validateSpots, async(req,res) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const updatedSpot = await Spot.findByPk(req.params.id)

  if(!updatedSpot) {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }
  if(ownerId === updatedSpot.ownerId) {
    if(address) {
      updatedSpot.address = address
    }
    if(city) {
      updatedSpot.city = city
    }
    if(state) {
      updatedSpot.state = state
    }
    if(country) {
      updatedSpot.country = country
    }
    if(lat) {
      updatedSpot.lat = lat
    }
    if(lng) {
      updatedSpot.lng = lng
    }
    if(name) {
      updatedSpot.name = name
    }
    if(description) {
      updatedSpot.description = description
    }
    if(price) {
      updatedSpot.price = price
    }
    updatedSpot.save();
    res.json(updatedSpot)
  }else {
    res.status(403).json({
      "message": "Unauthorized"
    })
  }
})

// Delete a spot

router.delete('/:id', requireAuth, async(req, res) => {
  const ownerId = req.user.id;
  let spotToDelete = await Spot.findByPk(req.params.id);
  if(!spotToDelete) {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }
  if(ownerId === spotToDelete.ownerId) {
    await spotToDelete.destroy();
    res.json({
      "message": "Successfully deleted"
    })
  }else {
    res.status(403).json({
      "message": "Unauthorized"
    })
  }
})

module.exports = router;
