/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var jwt = require('jsonwebtoken');
var UnauthorizedAccessError = require('./../errors/UnauthorizedAccessError');

module.exports.fetch = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length === 2) {
            var token = part[1];
            return token;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

var authenticate = function (req, res, next) {
    var token = exports.fetch(req.headers);
    console.log('token iam' +token)
    if (!token) {
        console.log('Request Body ' + JSON.stringify(req.body));
        return next(new UnauthorizedAccessError('You are not authorised'));
    } else {
        var decoded = jwt.decode(token);
        
        if (decoded ) {
            return auth.api(req,res,next);
        }
    }
};


module.exports.authenticate = authenticate;