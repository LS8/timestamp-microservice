var express = require('express');
var moment = require('moment');
var app = express();

app.get('*', function(req, res) {
  var param = req.params["0"].slice(1);
  var date = {
    unix: null,
    natural: null
  }
  // Case 1: param is a unix timestamp

  // Case 2: param is a natural language date
  var naturalDate = moment(param).toLocaleString();

  if (naturalDate && naturalDate !== "Invalid date") {
    console.log(naturalDate);
    var unixDate = +new Date(moment(param).toISOString()) / 1000;
    date.natural = naturalDate.slice(0, 15);
    date.unix = unixDate;
  } else {
    var isoDate = new Date(+param*1000);
    var unixDate  = Date.parse(isoDate);
    if (unixDate) {
      date.unix = unixDate/1000;
      date.natural = moment(isoDate).toLocaleString().slice(0, 15);
    }
  }


  res.send(JSON.stringify(date));
  res.end();
})

app.listen(3000);
