/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jwt = require('jsonwebtoken');

if (process.env.SETUP) {
    accKey = process.env.ACC_KEY_IAM;
} else {
    accKey = "1234567890";
}

module.exports.api = (req, res, next) => {
    var token = req.headers.authorization;
    console.log('token ' + token)
    if(token == undefined ){
        res.status(401).json("Unauthorized, token expired / not available");
        return;
    }
    token = token.split(" ")[1];
    try {
        var decoded = jwt.verify(token, accKey);
        req.user = {
            uid : decoded.uid,
        }
        next();
    } catch (error) {
        res.status(401).json("Unauthorized, token expired / not available");
    }
}
