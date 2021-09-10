/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var UserModel = require('../models/user');
var randomstring = require("randomstring");
var jwt = require('jsonwebtoken');
var router = express.Router();

var accKey = '';
var accExpiry;



if (process.env.SETUP) {
    accKey = process.env.ACC_KEY_IAM;

    accExpiry = Number(process.env.ACCESS_EXPIRY);

    if(accExpiry == 24*60*60) {
        console.log('accExpiry is correct')
    } else {
        console.log('accExpiry is incorrect')
    }
} else {
    accKey = "1234567890";
    accExpiry = 24*60*60;
}

console.log('accKey'+accKey)



router.post('/login',  (req, res, next) => {
    var userData = req.body;
    UserModel.validate(userData, function (err, userData) {
        if (err) {
            console.log(err);
            res.status(401).json(err);
        } else {
            if (userData != undefined && userData.length > 0) {
                generateToken(userData, userData[0]._id, function(err, TokenObj){
                    if(err) return res.status(500).json(err);
                    delete TokenObj.sessionId;
                    res.status(200).json(TokenObj)
                })
            } else {
                res.status(401).json("Invalid username/password");
            }
        }
    });
});



function generateToken(userData, userUid, callback){
    console.log('generateToken')
    let sessionKey = randomstring.generate();
    var uid = '';

    uid = userData[0]._id;
    var token = jwt.sign(
        {  uid: uid },
        accKey,
        { expiresIn: accExpiry }
    );
    
    TokenObj = {
        sessionId: sessionKey,
        accessToken: token
    };
    return callback(null, TokenObj);
}


module.exports = {router : router, generateToken : generateToken};
