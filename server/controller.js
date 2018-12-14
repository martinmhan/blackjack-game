const User = require('../database/models/User.js');
const dbHelpers = require('./dbHelpers.js');

module.exports = {
  login: {
    existing: {
      post: (req, res) => {
        console.log('GET request for existing user login received');
        const { username, password } = req.body;

        dbHelpers.findUser(username)
          .then((user) => {
            if (!user) {
              res.send('Username does not exist.');
            } else if (user.password !== password) {
              res.send('Incorrect password');
            } else {
              res.send(user.bankroll.toString());
            }
          });
      }
    },
    new: {
      post: (req, res) => {
        console.log('GET request for new user login received');
        const { username, password } = req.body;

        dbHelpers.findUser(username)
          .then((user) => {
            console.log(user);
            if (!user) {
              let newUser = new User({ username, password, bankroll: 1000 });
              newUser.save()
                .then(() => {
                  res.send('New user has been created');
                });
            } else {
              res.send('Username already exists. Please select a different one.');
            }
          });
      }
    }
  },
  user: {
    put: (req, res) => {
      console.log('PUT request received');
      const { username, bankroll } = req.body;
      dbHelpers.updateBankroll(username, bankroll)
        .then(() => {
          console.log('Successful updated user bankroll');
        })
        .catch((err) => {
          console.log('Error updating user bankroll');
        });
    }
  }
};