var http = require('http');
var express = require('express');
var app = express();

app.get('*', function(req, res) {
  var supposedTimeFormat = req.params["0"].slice(1);
  res.end();
})

app.listen(3000);
