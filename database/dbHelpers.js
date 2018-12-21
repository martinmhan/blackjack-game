const User = require('./models/User.js');

module.exports = {
  findUser: username => (
    User.findOne({ username })
  ),
  updateBankroll: (username, bankroll) => (
    User.findOneAndUpdate({ username }, { bankroll })
  ),
};
