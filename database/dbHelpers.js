const User = require('./models/User.js');

module.exports = {
  findUser: (username) => {
    console.log('about to search db for username: ', username);
    return User.findOne({ username });
  },
  updateBankroll: (username, bankroll) => {
    console.log('about to update bankroll for username: ', username);
    return User.findOneAndUpdate({ username }, { bankroll });
  }
};