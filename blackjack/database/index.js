const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/blackjackdb', { useNewUrlParser: true})
	.then(() => {
		console.log('Successfully connected to mongodb');
	})
	.catch(err => {
		console.log('Error connecting to mongodb: ', err);
	});

module.exports = mongoose;