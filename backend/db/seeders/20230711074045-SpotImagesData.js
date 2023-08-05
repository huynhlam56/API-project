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
          url: 'https://pictures.escapia.com/CINBCH/186791/4019170258.jpg',
          preview: true
        },
        {
          spotId: 2,
          url: 'https://img.geocaching.com/waymarking/display/12bce2fb-bf42-44df-bbd4-8a53013d741f.jpg',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2022/03/New-York-apartment-style-concept-by-Decorilla.jpg',
          preview: true
        },
        {
          spotId: 4,
          url: 'https://www.nar.realtor/magazine/real-estate-news/home-and-design/post-pandemic-vacation-house-changes',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://www.abodeparkcity.com/wp-content/uploads/2023/02/Book-the-best-Park-City-Vacation-Rentals-with-Abode-Park-City-Now-scaled.jpeg',
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
