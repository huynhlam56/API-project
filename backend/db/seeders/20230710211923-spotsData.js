'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
  try{
   await Spot.bulkCreate([
    {
      id: 1,
      ownerId: 1,
      address: '123 Maple Rd',
      city: 'San Diego',
      state: 'California',
      country: 'US',
      lat: 23.4500,
      lng: 132.1234,
      name: 'Daisy Rentals',
      description: '4 beds, 3 baths, pets allowed',
      price: 120.99
    },
    {
      id: 2,
      ownerId: 2,
      address: '382 City St',
      city: 'Los Angeles',
      state: 'California',
      country: 'US',
      lat: 19.2300,
      lng: 124.5453,
      name: 'Hollywood Place',
      description: '3 beds, 2 baths, pets allowed, located in the middle of the city.',
      price: 200.99
    },
    {
      id: 3,
      ownerId: 3,
      address: '3492 Greenwood Dr.',
      city: 'new York City',
      state: 'New York',
      country: 'US',
      lat: 16.3200,
      lng: 180.3430,
      name: 'NY Condos',
      description: '3 beds, 1 baths, NO pets allowed',
      price: 300.43
    },
    {
      id: 4,
      ownerId: 4,
      address: '31 1st St',
      city: 'Portland',
      state: 'Maine',
      country: 'US',
      lat: 20.3423,
      lng: 155.3231,
      name: 'Mainly Apartments',
      description: '4 beds, 3 baths, pets allowed, beautiful scenery',
      price: 145.32
    },
    {
      id: 5,
      ownerId: 5,
      address: '123 Lake Way',
      city: 'Salt Lake City',
      state: 'Utah',
      country: 'US',
      lat: 21.3942,
      lng: 134.5423,
      name: 'Lakehousing',
      description: '4 beds, 3 baths, pets allowed',
      price: 400.32
    },
   ], options);
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
},

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options.tableName, null, options)
  }
};
