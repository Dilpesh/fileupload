var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req,res,next) {
	var route_list = req.body;

	if(!req.body.email) {
		return next('Email id required')
	}
	if(!req.body.password){
		return next('password id required')
	}

	let userBody = {
		'email': req.body.email,
		'password': req.body.password //we will encrypt it
	}

	User.add(userBody, function(err,user_body) {
		if(err) {
			console.error(err);
			return next(err);
		} else {
			res.send(user_body);
		}
	})
});

module.exports = router;