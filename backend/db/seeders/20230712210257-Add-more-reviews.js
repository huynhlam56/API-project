'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      await Review.bulkCreate([
        {
          spotId: 1,
          userId: 1,
          review: 'Cool place',
          stars: 4
        },
        {
          spotId: 2,
          userId: 2,
          review: 'This place was ok.',
          stars: 2
        },
        {
          spotId: 3,
          userId: 3,
          review: 'Do NOT stay here.',
          stars: 2
        },
        {
          spotId: 4,
          userId: 4,
          review: 'Very nice place.',
          stars: 5
        },
        {
          spotId: 5,
          userId: 5,
          review: 'Beautiful lake house.',
          stars: 4
        },
        {
          spotId: 2,
          userId: 1,
          review: 'Ehhhhhh',
          stars: 3
        },
        {
          spotId: 5,
          userId: 5,
          review: 'it was nice!',
          stars: 4
        },
      ], options);
    } catch (error) {
      console.error('Errors:', error)
      throw Error
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options.tableName, null, options)
  }
};
