'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Booking.bulkCreate([
        {
          spotId: 1,
          userId: 1,
          startDate: new Date('2023-07-07'),
          endDate: new Date('2023-07-14')
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date('2024-01-07'),
          endDate: new Date('2024-03-14')
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date('2025-02-17'),
          endDate: new Date('2025-04-03')
        },
        {
          spotId: 4,
          userId: 4,
          startDate: new Date('2024-12-21'),
          endDate: new Date('2024-05-14')
        },
        {
          spotId: 5,
          userId: 5,
          startDate: new Date('2025-12-25'),
          endDate: new Date('2026-01-14')
        },
      ], options)
    } catch (error) {
      console.error ('Errors:', error)
      throw Error
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options.tableName, null, options)
  }
};
