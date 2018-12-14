const User = require('../database/models/User.js');

module.exports = {
  findUser: (username) => {
    console.log('about to search db for username: ', username);
    return User.findOne({ username });
  },
  updateBankroll: (username, bankroll) => {
    return User.findOneAndUpdate({ username }, { bankroll });
  } 
};