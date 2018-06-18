var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

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


// mysql test
/*
var Sequelize = require('sequelize');
var config = require('./config/config.json').development;

sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect
});
exports.sequelize = sequelize;

sequelize.query("SELECT COUNT(id) AS count FROM author", { type: sequelize.QueryTypes.SELECT}).then(results => {
  console.log(results[0].count);    
});


var Author = sequelize.import(__dirname + '/models/author');
var bookInstance = sequelize.import(__dirname + '/models/bookInstance');

sequelize.query("SELECT * FROM book_instance", {model: bookInstance}).then(bookInstances => {
  bookInstances.forEach( instance=> {
    console.log(instance.dataValues);
  })
})

sequelize.query("SELECT book.title, genre.name AS genre " + 
  "FROM book INNER JOIN book_genre ON (book.id=book_genre.book_id) " + 
  "INNER JOIN genre ON (book_genre.genre_id=genre.id)",
    { type: sequelize.QueryTypes.SELECT }).then(
        rows => {
            rows.forEach(row => {
                console.log(row);
            })
});
*/
module.exports = app;
