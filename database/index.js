const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/blackjackdb', { useNewUrlParser: true })
	.then(() => { console.log('Successfully connected to mongodb') })
	.catch(err => { console.error(err) });

module.exports = mongoose;