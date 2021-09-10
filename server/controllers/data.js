var express = require('express');
var fs = require('fs');
var router = express.Router();

var Data = require('../models/data');

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('myfile'), function (err, req, res, next ) { 
  
  if (err) { 
    console.error(err);
    return res.sendStatus(500);
  }
  next();
}, function (req, res, next) {
    console.log('req.file' + JSON.stringify(req.file));
    const filePath = './'+req.file.path;
    const fileContents = fs.readFileSync(filePath, 'utf8')

	try {
	  const data = JSON.parse(fileContents)
	  let data_list = [];
	  data.forEach(function(data){
	  	if(data.userId && data.id && data.title && data.body) {
	  		data_list.push({
				'userId' : data.userId,
				'id' : data.id,
				'title' : data.title,
				'body' : data.body,
				'my_user_id' : req.user.uid
			})
	  	} else {
	  		console.log('skipping invalid entries')
	  	}
	});

	Data.insertMany(data_list, function(err,data_list_added){
		if(err) {
			console.error(err);
			return next(err);
		} else {
			if (fs.existsSync(filePath)) {
			    fs.unlink(filePath, (err) => {
			        if (err) {
			            console.log(err);
			        }
			        console.log('deleted');
			    })
			}
			res.send(data_list_added);
		}
	});
	} catch(err) {
	  console.error(err)
	}
});

router.get('/', function(req,res,next){
	Data.getAll(req.user.uid, function (err, data_list) {
        if (err) next(err);
        else if (!data_list) {
            res.sendStatus(204);
        } else {
            res.send(data_list);
        }
    });
})

module.exports = router;