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
        firstName: 'other',
        lastName: 'user',
        email: 'user1@user.io',
        username: 'otheruser1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'onemore',
        lastName: 'user',
        email: 'user2@user.io',
        username: 'otheruser2',
        hashedPassword: bcrypt.hashSync('password2')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demo', 'otheruser1', 'otheruser2'] }
    }, {});
  }
};
