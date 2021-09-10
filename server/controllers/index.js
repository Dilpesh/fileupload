/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express')
  , router = express.Router();
  

var iam         = require('../middlewares/iam');
var authenticate         = require('./authenticate');


router.get('/', function(req, res) {
  res.send('FP RESTFULL Server');
});

router.use("/authenticate",authenticate.router);
router.use("/user",require("./user"));

router.use(iam.authenticate);

router.use("/data",require("./data"));


module.exports = router;



