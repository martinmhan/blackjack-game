const User = require('../models/User.js'); // import the User model

const seedData = [
  { username: 'martin', password: 'asdf', bankroll: 1000 },
  { username: 'test', password: 'asdf', bankroll: 1000 },
  { username: 'test2', password: 'asdf', bankroll: 1000 },
  { username: 'test3', password: 'asdf', bankroll: 1000 },
];

const insertData = () => {
  User.insertMany(seedData) // invoke insertMany with array of seed data
    .then(() => {
      console.log('Seed data has been inserted');
    });
};

insertData();