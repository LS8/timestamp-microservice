var express = require('express');
var moment = require('moment');
var app = express();
var date = { unix: null, natural: null };

app.get('*', function(req, res) {
  var param = req.params["0"].slice(1);

  // Case 1: param is a natural language date
  var naturalDate = processNaturalDate(param);
  if (naturalDate) {
    var unixDate = +new Date(moment(naturalDate).toISOString()) / 1000;
    date.natural = naturalDate.slice(0, 15);
    date.unix = unixDate;
  }
  // Case 2: param is a unix timestamp
  else {
    var dates = processUnixDate(param);
    if (dates) {
      date.natural = dates.naturalDate;
      date.unix = dates.unixDate;
    }
  }
  res.send(JSON.stringify(date));
  res.end();
});

app.listen(process.env.PORT || 8080);

function processNaturalDate(dateString) {
  var naturalDate = moment(dateString).toLocaleString();
  if (naturalDate && naturalDate !== "Invalid date") {
    return naturalDate;
  } else {
    return void 0;
  }
}

function processUnixDate(unixTimestamp) {
  var naturalDate = new Date(+unixTimestamp*1000);
  var unixDate  = Date.parse(naturalDate);
  if (unixDate) {
    unixDate = unixDate/1000;
    naturalDate = moment(naturalDate).toLocaleString().slice(0, 15);
    return {
      unixDate: unixDate,
      naturalDate: naturalDate
    }
  } else {
    return void 0;
  }
}
