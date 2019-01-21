const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/blackjackdb', { useNewUrlParser: true })
  .then(() => { console.log('Successfully connected to mongodb'); })
  .catch((err) => { console.error(err); });

module.exports = mongoose;
