const User = require('../database/models/User.js');
const dbHelpers = require('../database/dbHelpers.js');

module.exports = {
  login: {
    existing: {
      post: (req, res) => {
        const { username, password } = req.body;
        dbHelpers.findUser(username)
          .then((user) => {
            const response = { validLogin: false, message: null };
            if (!user) {
              response.message = 'Username does not exist.';
            } else if (user.password !== password) {
              response.message = 'Incorrect password';
            } else {
              response.validLogin = true;
              response.message = user.bankroll.toString();
            }
            res.status(200).send(response);
          });
      },
    },
    new: {
      post: (req, res) => {
        const { username, password } = req.body;
        dbHelpers.findUser(username)
          .then((user) => {
            if (!user) {
              const newUser = new User({ username, password, bankroll: 1000 });
              newUser.save()
                .then(() => res.status(200).send('New user has been created'));
            } else {
              res.send('Username already exists. Please select a different one.');
            }
          });
      },
    },
  },
  user: {
    put: (req, res) => {
      const { username, bankroll } = req.body;
      dbHelpers.updateBankroll(username, bankroll)
        .then(() => res.status(200).send('Successfully updated user bankroll'))
        .catch(err => res.status(404).send(err));
    },
    get: (req, res) => {
      const { username } = req.params;
      dbHelpers.findUser(username)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send(err));
    },
  },
};
