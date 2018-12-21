/* eslint-disable no-console */
const User = require('../models/User.js');

const seedData = [
  { username: 'testuser1', password: 'asdf', bankroll: 1000 },
  { username: 'testuser2', password: 'asdf', bankroll: 1000 },
  { username: 'testuser3', password: 'asdf', bankroll: 1000 },
  { username: 'testuser4', password: 'asdf', bankroll: 1000 },
];

User.insertMany(seedData)
  .then(() => { console.log('Seed data has been inserted'); });
