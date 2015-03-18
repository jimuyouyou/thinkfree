var mongoose = require('mongoose'), Schema = mongoose.Schema, crypto = require('crypto');

var schema = new Schema({
	name : String,
	hash_password : String,
	sex : Number,
	email : String,
	phone : String,
	address : {
		city : String,
		street : String
	}
});

schema.virtual("password").set(function(password) {
	this.hash_password = encryptPassword(password);
});

schema.method("authenticate", function(plainText) {
	return encryptPassword(plainText) === this.hash_password;
});

function encryptPassword(password) {
	return crypto.createHash("md5").update(password).digest("base64");
}

mongoose.model('User', schema);