var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var authRouter = require('./routes/auth');
var questionsRouter = require('./routes/questions');
var answersRouter = require('./routes/answers');
var publicRouter = require('./routes/public'); 
var modRouter = require('./routes/mod');
var votesRouter = require('./routes/votes');
const AuthMiddleWare = require("./middleware/auth")



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/auth',authRouter);
app.use('/users',AuthMiddleWare.authv2, usersRouter);
app.use('/api/questions',AuthMiddleWare.authv2,questionsRouter);
app.use('/api/answers',AuthMiddleWare.authv2,answersRouter);
app.use("/api/votes",AuthMiddleWare.authv2,votesRouter);
app.use('/mod',AuthMiddleWare.authv2,modRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
