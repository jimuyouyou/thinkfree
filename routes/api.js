var Log = require('log'), log = new Log('info');
var UserModel = require("./../models").User;
var QuestionModel = require("./../models").Question;

exports.requireAuthentication = function(req, res, next) {
	log.info("session-user:" + req.session.user);
	if (!req.session.user) {
		return res.render('index');
	}
	next();
};

exports.login = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	log.info('login - email: ' + email + ' password: ' + password);

	UserModel.findOne({
		email : req.body.email
	}, function(err, user) {
		if (err) {
			return res.render('index', {
				err : err
			});
		}
		if (!user) {
			return res.render('index', {
				err : 'user does not exist'
			});
		}
		if (!user.authenticate(req.body.password)) {
			return res.render('index', {
				err : 'incorrect password'
			});
		}

		req.session.user = user;
		log.info('req.session.user:' + req.session.user);
		// res.json(user);
		res.render('user/home');
	});
};

exports.signup = function(req, res) {
	res.render('user/signup');
};

exports.logout = function(req, res) {
	req.session.user = null;
	res.render('user/home');
};

exports.create = function(req, res) {
	var rdSignup = 'user/signup';
	if (req.body.password !== req.body.confirmPassword) {
		return res.render(rdSignup, {
			err : 'confirmPassword does not match with password'
		});
	} else {
		var createUser = new UserModel(req.body);
		UserModel.findOne({
			email : req.body.email
		}, function(err, user) {
			if (err) {
				return res.render(rdSignup, {
					err : err
				});
			}
			if (user) {
				return res.render(rdSignup, {
					err : 'Already existing user.'
				});
			}
			createUser.save(function(err, user) {
				if (err) {
					return res.render(rdSignup, {
						err : err
					});
				}
				// req.session.user = user;
				// res.json();
			});
		});
	}

	res.render('user/created');
};

exports.home = function(req, res) {
	res.render('user/home');
};

exports.question = function(req, res) {
	log.info("session-user:" + req.session.user);
	res.render('question/question');
};

exports.addQuestion = function(req, res) {
	var rd = 'question/question';
	var model = new QuestionModel(req.body);
	model.save(function(err, data) {
		if (err) {
			return res.render(rd, {
				err : err
			});
		}
	});

	res.render(rd, {
		err : 'One record been added successfully.'
	});
};

exports.listQuestion = function(req, res) {
	log.info("session-user:" + req.session.user);
	var rd = 'question/listQuestion';
	QuestionModel.find({}, function(err, data) {
		return res.render(rd, { // { "_id": 0, "__v": 0},
			err : err,
			data : JSON.stringify(data)
		});
	});
};

exports.findQuestionByName = function(req, res) {
	if (req.query.questName) {
		QuestionModel.findOne({
			questName : req.query.questName
		}, function(err, data) {
			if (err) {
				return res.json({
					err : err
				});
			} else {
				return res.json(data);
			}
		});
	} else {
		return res.josn({});
	}
};
