var server = require('../index.js');
var url = "http://localhost:3000";
var Browser = require("zombie");

describe('Feature', function(){
  var browser = new Browser();

  beforeEach(function(done){
    server.listen(3000);
    browser.visit(url, function(){
      done();
    });
  });

  afterEach(function(){
    server.close();
  });

  describe("runningSimulation", function(){
    it("should have an option to input brand factor", function(){
      browser.document.getElementById("BrandFactorInput").value = 2.9;
      expect(browser.html("body")).toContain(2.9);
    });
  });
});
