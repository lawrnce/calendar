var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var path = require('path');
var moment = require('moment');

// Connect to db
mongoose.connect('mongodb://localhost/availabledates');

// Define date schema
var dateSchema = mongoose.Schema({
  date: {type: String, required: true, unique: true}
});
dateSchema.plugin(uniqueValidator);

// Create model
var AvailableDates = mongoose.model('AvailableDates', dateSchema);

// Date format
var dateFormat = "YYYY-MM-DD";

// Express config
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.urlencoded({extended: false}));

// Home page will be the calendar
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/client/views/'));
});

// GET
app.get('/api/date', function(req, res) {
  AvailableDates.find({}, function(err, dates) {
    var dateArray = [];
    dates.forEach(function(date) {
      dateArray.push(date['date']);
    })
    res.send(dateArray);
  });
});

// POST
app.post('/api/date', function(req, res) {
  var dateInput = req.body.date;
  if (moment(dateInput, dateFormat, true).isValid()) {
    var date = new AvailableDates({date: dateInput});
    date.save(function(err, date) {
      if (err) {
        res.status(500).json({success: false, message: err});
      } else {
        res.status(200).json({success: true});
      }
    });
  } else {
    return res.status(400).json({success: false, message: 'Invalid date format.'});
  }
});

// DELETE
app.delete('/api/date', function(req, res) {

})

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
