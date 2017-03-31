const express = require('express');
const processDate = require('./process-date.js');
const path = require('path');
const app = express();
const processNaturalDate = processDate.processNaturalDate;
const processUnixDate = processDate.processUnixDate;
const date = { unix: null, natural: null };

app.use(express.static(path.join(__dirname, '../static')));

app.get('*', (req, res) => {
  const param = req.params['0'].slice(1);

  const naturalDate = processNaturalDate(param);
  const dates = processUnixDate(param);
  if (dates) {
  // Case 1: param is a unix timestamp
    date.natural = dates.naturalDate;
    date.unix = dates.unixDate;
  } else if (naturalDate) {
  // Case 2: param is a natural language date
    date.natural = naturalDate.naturalDate.slice(0, 15);
    date.unix = naturalDate.unixDate;
  }
  res.send(JSON.stringify(date));
  res.end();
});

app.listen(process.env.PORT || 8080);

