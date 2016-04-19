var express = require('express');
var app = express();
var path = require('path');

// For demo, store all Angular files for displaying
app.use(express.static(__dirname+'/../client'));

// Home page will be the calendar
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../client/views/index.html'));
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
