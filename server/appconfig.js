/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var cors        = require('./middlewares/cors');
var domainMiddleware = require('./middlewares/domain');
// var scheduler = require("./middlewares/scheduler");


app.set('port', (process.env.PORT || 9000));

// Adding CORS for cross Domain support
app.use(cors);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// const jsonParser = bodyParser.json()
// const urlencodedParser = bodyParser.urlencoded({ extended: false })


// const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });


// use morgan to log requests to the console
app.use(morgan('dev'));

// Using domain to handle uncaught exceptions
app.use(domainMiddleware);

app.use(require('./controllers'));


module.exports = app;
