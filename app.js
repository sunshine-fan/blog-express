var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var index = require('./routes/index');
var login = require('./routes/login');
// handlebars module
var handlebars=require('express3-handlebars');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({
  layoutsDir: 'views',
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404',{layout:null});
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;