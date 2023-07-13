
const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
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
  })
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
    avgRating: avgRating ? avgRating.dataValues.avgRating : 'No reviews',
    previewImage: previewImage ? previewImage.url : 'No preview image'
  }
  newSpots.push(newSpot)
}
  return res.json({
    Spots: newSpots
  })
})

//get details for a Spot from an id
router.get('/:id', async(req, res) => {
  const spotId = req.params.id
  const numReviews = await Review.count({
    where: {
      spotId: spotId
    }
  });

  let avgRating = await Review.findOne({
    attributes: [
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
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
      'price'
    ]
  });
    if(spot) {
      avgRating = avgRating.dataValues.avgRating
      return res.json({...spot.toJSON(), numReviews, avgRating})
    }else {
      res.status(404),
      res.json({"message": "Spot couldn't be found"})
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
      price
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
      price: spot.price
    }
    return res.status(201).json({ spot: newSpot })
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
    return res.json({
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
});

// Edit a spot

router.put('/:id', requireAuth, validateSpots, async(req,res) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const updatedSpot = await Spot.findByPk(req.params.id)

  if(!updatedSpot) {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }
  if(ownerId === updatedSpot.id) {
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
  if(ownerId === spotToDelete.id) {
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
