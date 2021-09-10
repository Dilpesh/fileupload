/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
});



UserSchema.static('add', function(userBody, callback) {
	console.log('Adding New Student to account  '+userBody.email);
	this.findOne({email: userBody.email}, function(err,userData) {
		if(err) {
			console.error(err);
			callback(err);
		} else if (userData) {
			console.error('Email Id Already registered');
			callback('Email Id Already registered');
		}else {
			console.log('Creating a new User and adding the student');

			bcrypt.hash(userBody.password, 10, (err, encryptedPassword) => {
		        if (err) {
		            callback(err);
		        } else {
		            var user = new UserModel({ 
						email: userBody.email, 
						password: encryptedPassword
					});
					user.save(function(err,user) {
						if(err) {
							callback(err);
						} else {
							callback(null,user,true);
						}
					});
		        }
		    });
		}
	});
});

UserSchema.static('validate', function (userObj, callback) {
    this.find({ email: userObj.email }).lean()
        .exec(function (err, data) {
            if (err) callback(err)
            else {
                if (data.length > 0) {
                    bcrypt.compare(userObj.password, data[0].password, function (err, res) {
                        if (err) callback(err)
                        else {
                            if (res) {
                                callback(null, data);
                            } else {
                                callback(false);
                            }
                        }
                    })
                } else {
                    callback(false);
                }
            }
        });
});

mongoose.model('User', UserSchema);
var UserModel = mongoose.model('User');
module.exports = UserModel;