var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(methodOverride());
app.use(cookieParser());
// app.use(session({
// secret : 'keyboard cat',
// resave : false,
// saveUninitialized : true,
// cookie : {
// secure : true,
// maxAge : 60000
// }
// }));
app.use(session({
	secret : 'koobkooC edoN',
	resave : true,
	saveUninitialized : true
}));
// app.use(session({
// secret : 'foo',
// store : new MongoStore({})
// }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);
/** =================== router section begin =================== * */
app.get('/', routes.index);
app.post('/login', api.login);
app.get('/signup', api.signup);
app.post('/create', api.create);
app.all('*', api.requireAuthentication);
app.get('/home', api.home);
app.get('/question', api.question);
app.post('/addQuestion', api.addQuestion);
app.get('/listQuestion', api.listQuestion);
app.get('/findQuestionByName', api.findQuestionByName);

app.get('*', routes.index);
app.post('*', routes.index);
/** =================== router section end =================== * */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
