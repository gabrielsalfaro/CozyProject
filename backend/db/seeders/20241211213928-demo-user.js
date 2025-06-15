'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'demo',
        lastName: 'user',
        email: 'demo@user.io',
        username: 'demo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'first',
        lastName: 'user',
        email: 'user1@user.io',
        username: 'user1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'second',
        lastName: 'user',
        email: 'user2@user.io',
        username: 'user2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'third',
        lastName: 'user',
        email: 'user3@user.io',
        username: 'user3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'fourth',
        lastName: 'user',
        email: 'user4@user.io',
        username: 'user4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'fifth',
        lastName: 'user',
        email: 'user5@user.io',
        username: 'user5',
        hashedPassword: bcrypt.hashSync('password5')
      },
      { 
        firstName: 'sixth',
        lastName: 'user',
        email: 'user6@user.io',
        username: 'user6',
        hashedPassword: bcrypt.hashSync('password6')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    // First delete from SpotImages
    const spotImageOptions = { ...options, tableName: 'SpotImages' };
    await queryInterface.bulkDelete(spotImageOptions, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});

    // Then delete from Spots
    const spotOptions = { ...options, tableName: 'Spots' };
    await queryInterface.bulkDelete(spotOptions, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});

    // Then delete from Users
    const userOptions = { ...options, tableName: 'Users' };
    await queryInterface.bulkDelete(userOptions, {
      username: { [Op.in]: ['demo', 'user1', 'user2', 'user3', 'user4', 'user5', 'user6'] } 
    }, {});

  }
};
