'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate([
        {
          spotId: 1,
          url: 'https://www.vacationbeachhomes.com/san-diego-vacation-rentals/',
          preview: true
        },
        {
          spotId: 2,
          url: 'http://www.destination360.com/north-america/us/california/los-angeles/vacation-rentals',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://www.flipkey.com/book/new-york-city/222593015/hom_home_type.house/',
          preview: true
        },
        {
          spotId: 4,
          url: 'https://www.nar.realtor/magazine/real-estate-news/home-and-design/post-pandemic-vacation-house-changes',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://thinksaltlakecity.com/best-places-to-buy-vacation-property-in-utah/',
          preview: true
        },
      ], options)
    }catch (error) {
      console.error('Error:', error)
      throw Error
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options.tableName, null, options)
  }
};
