const mongoose = require('../index.js');

const UserSchema = mongoose.Schema({
	username: String,
	password: String,
	bankroll: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;