
// ! THIS FILE IS DONE

'use strict';

const { Spot } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 2,
        address: '123 Main St.',
        city: 'Nashville',
        state: 'TN',
        country: 'USA',
        lat: 36.1627,
        lng: 86.7816,
        name: 'The Mansion',
        description: 'The house has a private entrance. 5 blocks to the beach, 2 blocks to village life, shops & restaurants. It has a queen bed, a small private bathroom with a shower, TV, Wifi, etc. Guests will love the location!',
        price: 550.00,
      },
      {
        ownerId: 3,
        address: '2343 E. Raleigh Rd.',
        city: 'Tampa',
        state: 'FL',
        country: 'USA',
        lat: 78.0936,
        lng: 12.7316,
        name: 'Beach Penthouse',
        description: 'Private entrance to a spacious house. Looks out onto pool, spa and patio dining area. Just around the corner from the bus stops (to beach), grocery store, restaurants, shops, library and more!',
        price: 100.00,
      },
      {
        ownerId: 4,
        address: '456 Elmo Ln.',
        city: 'New York City',
        state: 'NY',
        country: 'USA',
        lat: 59.4334,
        lng: 90.7342,
        name: 'Flight Line Madness',
        description: 'The house is under the direct flight path. Please make sure you enter the total number of people!!! Wifi available. Street parking available!',
        price: 400.00,
      },
      {
        ownerId: 5,
        address: '101 React Rd.',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 76.4334,
        lng: 52.7342,
        name: 'The Town',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a, atque quidem dolores dicta eaque iure eum accusamus dolore aliquid tenetur nulla, deleniti enim amet perferendis quisquam impedit cupiditate necessitatibus.',
        price: 650.00,
      },
      {
        ownerId: 6,
        address: '451 Fahrenheit Blvd.',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 47.4334,
        lng: 65.7342,
        name: 'The Cozy Catacomb',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a, atque quidem dolores dicta eaque iure eum accusamus dolore aliquid tenetur nulla, deleniti enim amet perferendis quisquam impedit cupiditate necessitatibus.',
        price: 450.00,
      },
      {
        ownerId: 7,
        address: '123 Four St.',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 49.4334,
        lng: 99.7342,
        name: 'Peculiar Palace',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a, atque quidem dolores dicta eaque iure eum accusamus dolore aliquid tenetur nulla, deleniti enim amet perferendis quisquam impedit cupiditate necessitatibus.',
        price: 750.00,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    // Delete related Reviews first
  options.tableName = 'Reviews';
  await queryInterface.bulkDelete(options, {
    spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
  }, {});

  // Delete related SpotImages second
  options.tableName = 'SpotImages';
  await queryInterface.bulkDelete(options, {
    spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
  }, {});

  // Now delete Spots
  options.tableName = 'Spots';
  return queryInterface.bulkDelete(options, {
    id: { [Op.in]: [1, 2, 3, 4, 5, 6] }
  }, {});
  }
};
