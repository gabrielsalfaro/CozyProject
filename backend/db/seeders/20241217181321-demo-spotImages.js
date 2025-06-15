// ! THIS FILE IS DONE

'use strict';

const { SpotImage } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      // SPOT 1
      {
        spotId: 1,
        url: 'https://i.imgur.com/aa8swRp.png',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/fx3yQZv.png',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/6SxR9dJ.jpeg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/fx3yQZv.png',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/sB7gAUY.jpeg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/6SxR9dJ.jpeg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/6SxR9dJ.jpeg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/phvt0GZ.png',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/6SxR9dJ.jpeg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/fx3yQZv.png',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/6SxR9dJ.jpeg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/phvt0GZ.png',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/sB7gAUY.jpeg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/aa8swRp.png',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/sB7gAUY.jpeg',
        preview: true,
      },
            {
        spotId: 6,
        url: 'https://i.imgur.com/phvt0GZ.png',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/fx3yQZv.png',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/aa8swRp.png',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/6SxR9dJ.jpeg',
        preview: false,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
