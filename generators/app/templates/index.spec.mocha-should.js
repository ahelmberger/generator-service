'use strict';

const should = require('should');

describe('When I ask if 1 equals 1', function () {
  it('should return true', function () {
    (1 === 1).should.equal(true);
  });
});
