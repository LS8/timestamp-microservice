var moment = require('moment');
function processNaturalDate(dateString) {
  var naturalDate = moment(dateString).toISOString();
  if (naturalDate && naturalDate !== "Invalid date") {
    var unixDate = +new Date(moment(naturalDate)) / 1000;
    var naturalDate = moment(dateString).toLocaleString();
    return {
      unixDate: unixDate,
      naturalDate: naturalDate
    }
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

module.exports = {
  processNaturalDate: processNaturalDate,
  processUnixDate: processUnixDate
}
