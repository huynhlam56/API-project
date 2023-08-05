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
          userId: 2,
          review: 'We booked this place for a one week vacation and it was the best decision ever! The rooms were nice and clean. Getting to bring out dog along was a plus.',
          stars: 5
        },
        {
          spotId: 2,
          userId: 3,
          review: 'This place was ok. It is located in the busiest street so it was hard to get anywhere. The rooms were spacious, but that"s about it.',
          stars: 3
        },
        {
          spotId: 3,
          userId: 1,
          review: 'Do NOT stay here. We saw rats running in the kitchen and the place is cramped.',
          stars: 2
        },
        {
          spotId: 4,
          userId: 5,
          review: 'Very nice place. Located right in front of a lake, so it was nice a peaceful.',
          stars: 4
        },
        {
          spotId: 5,
          userId: 4,
          review: 'Beautiful lake house, not too far from the lake. Very spacious inside.',
          stars: 5
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
