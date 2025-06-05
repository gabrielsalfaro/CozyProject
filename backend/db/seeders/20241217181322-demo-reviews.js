// ! THIS FILE IS DONE

'use strict';

const { Review} = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'Wonderful property, would not sleep here again.',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Great place, however, the neighbors kept trying to visit and say hello.',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Incredible property!!!! Would never stay here again!',
        stars: 4,
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Could not sleep properly. Bed was nailed to the garage.',
        stars: 3,
      },
      {
        spotId: 5,
        userId: 5,
        review: 'Hope you are into cars because that\'s all you\'ll hear down the block doing donuts!',
        stars: 4,
      },
      {
        spotId: 6,
        userId: 6,
        review: 'The Pool was great, it made the bedbug rash go away quicker! Would like to try the pool again.',
        stars: 5,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
  options.tableName = 'Reviews';
  const Op = Sequelize.Op;

  await queryInterface.bulkDelete(options, {
    spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
  }, {});

  // Reset auto-increment sequences AFTER deleting
  // await queryInterface.sequelize.query("DELETE FROM sqlite_sequence WHERE name='Reviews'");
}
};
