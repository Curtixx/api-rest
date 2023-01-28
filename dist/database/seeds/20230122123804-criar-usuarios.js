"use strict";const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      nome: 'Alexandre',
      email: 'alex.marques@gmail.com',
      password_hash: await bcryptjs.hash('123456', 10),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'Andreia',
      email: 'andreiacurtis@gmail.com',
      password_hash: await bcryptjs.hash('123456', 10),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down() {},
};
