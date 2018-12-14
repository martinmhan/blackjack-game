const router = require('express').Router();
const controller = require('./controller.js');

router
	.route('/login/existing')
	.post(controller.login.existing.post);

router
	.route('/login/new')
	.post(controller.login.new.post);

router
	.route('/:userId')
	.put(controller.user.put);

module.exports = router;