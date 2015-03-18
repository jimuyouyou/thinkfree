var mongoose = require('mongoose'), Schema = mongoose.Schema;

var schema = new Schema({
	questName : String,
	questType : String,
	questBackground : String,
	questAns1 : String,
	questCorrect1 : Boolean,
	questAns2 : String,
	questCorrect2 : Boolean,
	questAns3 : String,
	questCorrect3 : Boolean,
	questAns4 : String,
	questCorrect4 : Boolean,
	questAns5 : String,
	questCorrect5 : Boolean,
	questAns6 : String,
	questCorrect6 : Boolean,
	questAns7 : String,
	questCorrect7 : Boolean,
	questAns8 : String,
	questCorrect8 : Boolean,
	questAns9 : String,
	questCorrect9 : Boolean
});

mongoose.model('Question', schema);