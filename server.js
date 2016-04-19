var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');

// Connect to db
mongoose.connect('mongodb://localhost/availabledates');

// Store static files
app.use(express.static(__dirname+'/client'));

// Home page will be the calendar
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/client/views/'));
});

// GET
app.get('/api/date', function(req, res) {

});

// POST
app.post('/api/date', function(req, res) {

});

// DELETE
app.delete('/api/date', function(req, res) {

})

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
