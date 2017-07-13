const express = require('express');
const bodyParser = require('body-parser');
const apiController = require('./controllers/api');
const BotManager = require('./bot/manager');

const app = express();
const botManager = new BotManager();

//Add timestamp to console log
console.logCopy = console.log.bind(console);
console.log = function (data) {
  var currentDate = '[' + new Date()
    .toUTCString() + '] ';
  this.logCopy(currentDate, data);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', apiController);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// //error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   console.log(err.status + ": " + err.message);
//   res.status(err.status || 500).json({
//     status: 'Error ' + err.status
//   });
// });

botManager.initialize();

module.exports = app;
