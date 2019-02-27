var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var www = require('./bin/www');
var hbs = require('express-handlebars');


let automationdata = require('./controllers/automation-controller')
// Require our Routes
let routes = require('./router/routes')
//let automationmw = require('./automationmiddleware')
var app = express();

//automationmw();
// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Require Database configurations
let mongoDB = require('./dbConnection')
app.use(function (req, res, next) {
  console.log("app ussss");
  var io = req.app.get('socketio');

  io.on('connection', function (socket) {
    console.log('A user connected');
    const start = Date.now()

    setInterval(() => {
      data = automationdata.runHealthChecks(start, function (err, data) {
        console.log("Emitteed Data::" + data);
        io.sockets.emit('Data', data);
      })

    }, 1200)
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected');
    });
  });
  next();
});
// Routes Middleware
app.use(routes)

//app.use(automationmw)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;


