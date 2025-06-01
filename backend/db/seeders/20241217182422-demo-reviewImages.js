// ! THIS FILE IS NOT DONE

'use strict';

const { ReviewImage } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://i.imgur.com/fx3yQZv.png',
      },
      {
        reviewId: 2,
        url: 'https://i.imgur.com/6SxR9dJ.jpeg',
      },
      {
        reviewId: 3,
        url: 'https://i.imgur.com/sB7gAUY.jpeg',
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
