const User = require('./models/User.js');

module.exports = {
  findUser: (username) => {
    return User.findOne({ username });
  },
  updateBankroll: (username, bankroll) => {
    return User.findOneAndUpdate({ username }, { bankroll });
  }
};