'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ReviewImage } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
   try {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'stay_inns/api/reviews/1'
      },
      {
        reviewId: 2,
        url: 'stay_inns/api/reviews/2'
      },
      {
        reviewId: 3,
        url: 'stay_inns/api/reviews/3'
      },
      {
        reviewId: 4,
        url: 'stay_inns/api/reviews/4'
      },
      {
        reviewId: 5,
        url: 'stay_inns/api/reviews/5'
      },
    ], options)
   } catch (error) {
    console.error('Error:', error)
    throw Error
   }
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'ReviewImages';
   return queryInterface.bulkDelete(options.tableName, null, options)
  }
};
