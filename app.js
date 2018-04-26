require('dotenv').config();

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var index = require('./routes/index');

let testvar = process.env.BACK_TEST_VAR;
console.log(testvar,' from the back end');
// var users = require('./routes/users');
console.log('app running');
var app = express();

//set server to localhost:3001 for development mode:
// app.set('port', (process.env.PORT || '8080'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + 'client/build/index.html'));
// });
// app.set('port', 5000);
// app.set('port', (3000));
// app.set('port', (3001));

mongoose.connect(process.env.DB_CONN_TEST).then(()=>console.log('connected!')).catch((err)=>{
  console.log('can not connect - ',err);
});
// view engine setup

app.set('views', path.join(__dirname, 'views'));

// app.use(express.static('client/build'));

// app.set('views', path.join(__dirname, 'client/build'));

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/info', index);
app.use('/',express.static('client/build'));
app.use('/user/*',express.static('client/build'));
app.use('/account',express.static('client/build'));
// app.use('/users', users);
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('./client/build'));
// }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// app.use(express.static('./client/build'));
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//below was added on 6/7 from various online articles

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});



module.exports = app;
