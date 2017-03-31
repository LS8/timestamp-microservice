const moment = require('moment');

function processNaturalDate(dateString) {
  let naturalDate = moment(dateString).toISOString();
  if (naturalDate && naturalDate !== 'Invalid date') {
    const unixDate = +new Date(moment(naturalDate)) / 1000;
    naturalDate = moment(dateString).toLocaleString();
    return {
      unixDate,
      naturalDate,
    };
  }
  return undefined;
}

function processUnixDate(unixTimestamp) {
  let naturalDate = new Date(+unixTimestamp * 1000);
  let unixDate = Date.parse(naturalDate);
  if (unixDate) {
    unixDate /= 1000;
    naturalDate = moment(naturalDate).toLocaleString().slice(0, 15);
    return {
      unixDate,
      naturalDate,
    };
  }
  return undefined;
}

module.exports = {
  processNaturalDate,
  processUnixDate,
};
