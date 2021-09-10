/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var domain = require('domain');
//var CustomError = require('./../utils/custom-error');

var domainMiddleware = function(req, res, next) {
    var reqDomain = domain.create();
    reqDomain.id = domainMiddleware.id(req);
    reqDomain.add(req);
    reqDomain.add(res);

    reqDomain.once('error', function(err) {
        console.log("Exception Ocuured in Domain "+err);
        next(err);
    });
  
    reqDomain.run(next);
  
};

var count = 0;
//you can replace this method to
//supply your own id builder
domainMiddleware.id = function(req) {
  return new Date().getTime() + (count++);
};

module.exports = domainMiddleware;