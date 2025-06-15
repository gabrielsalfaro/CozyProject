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
        spotId: 2,
        userId: 1,
        review: 'Absolutely stunning property—if you don\'t mind insomnia. 10/10 would not sleep here again.',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Lovely spot—just wish the neighbors didn\'t treat every hour like a meet-and-greet. So friendly it hurts!',
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
        review: 'Sleep was tricky—the bed being nailed to the garage wall didn\'t help. Very innovative layout though!',
        stars: 3,
      },
      {
        spotId: 5,
        userId: 5,
        review: 'If screeching tires and midnight donuts are your lullaby of choice, this place is basically a luxury resort.',
        stars: 4,
      },
      {
        spotId: 6,
        userId: 6,
        review: 'The pool was amazing—really helped soothe the bedbug rash. Can\'t wait to jump back in!',
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

}
};
