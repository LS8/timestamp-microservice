var express = require('express');
var app = express();
var helper = require('./helper.js');
var processNaturalDate = helper.processNaturalDate;
var processUnixDate = helper.processUnixDate;

var date = { unix: null, natural: null };

app.get('*', function(req, res) {
  var param = req.params["0"].slice(1);

  var naturalDate = processNaturalDate(param);
  var dates = processUnixDate(param);
  // Case 1: param is a unix timestamp
  if (dates) {
      date.natural = dates.naturalDate;
      date.unix = dates.unixDate;
  }
  // Case 2: param is a natural language date
  else if  (naturalDate) {
    date.natural = naturalDate.naturalDate.slice(0, 15);
    date.unix = naturalDate.unixDate;
  }
  res.send(JSON.stringify(date));
  res.end();
});

app.listen(process.env.PORT || 8080);

