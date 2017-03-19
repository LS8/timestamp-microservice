var chai = require('chai');
var helper = require('../js/helper.js');
var processNaturalDate = helper.processNaturalDate;
var processUnixDate = helper.processUnixDate;
var assert = chai.assert;

describe('Process a natural date', function() {

  it('should process a ISO-date and return an object with a unixDate property containing the corresponding unix timestamp', function() {
    var unixDate = processNaturalDate('2001-12-01').unixDate;
    assert.equal(unixDate, 1007161200);
  });

  it('should process a natural language and return an object with a unixDate property containing the corresponding unix timestamp', function() {
    var unixDate = processNaturalDate('01-Dec-01').unixDate;
    assert.equal(unixDate, 1007161200);
  });

  it('should handle an uncomplete datestring', function() {
    var unixDate = processNaturalDate('dec01').unixDate;
    assert.equal(unixDate, 1007161200);
  });

});

describe('Process a unix timestamp', function() {
  
  it('should process a unix timestamp and return an object with a naturalDate property containing the corresponding date', function() {
    var naturalDate = processUnixDate(1007161200).naturalDate;
    assert.equal(naturalDate, "Sat Dec 01 2001");
    var naturalDate = processUnixDate(1234).naturalDate;
    assert.equal(naturalDate, "Thu Jan 01 1970");
  });

});

describe("Handle corrupt input", function() {
  
  it("should return undefined when the input cannot be processed", function() {
    var returnValue = processNaturalDate("abc");
    assert.equal(returnValue, undefined);
  });

  var returnValue = processUnixDate("xyz");
  assert.equal(returnValue, undefined);
});
