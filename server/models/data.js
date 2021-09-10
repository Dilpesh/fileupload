/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DataSchema = new Schema({
	title: { type: String},
	body: { type: String},
	userId: { type: String},
	id: { type: String},
	my_user_id: { type: String}
});

DataSchema.static('getAll',function(my_user_id,callback){
	this.find({my_user_id:my_user_id})
		.lean()
		.exec(callback);
});



mongoose.model('Data', DataSchema);
var DataModel = mongoose.model('Data');
module.exports = DataModel;