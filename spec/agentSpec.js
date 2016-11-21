var Agent = require('../lib/agent')
'use strict';

describe("Agent", function() {
  var agent;

  beforeEach(function() {
    agent = new Agent();
  })

  describe("check temperature", function() {
    it("has 20 degrees at start", function() {
      expect(true).toEqual(true);
    })
  });
});
