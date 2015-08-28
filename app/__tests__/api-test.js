var assert = require('assert');

jest.dontMock('../api');

describe("api", function() {
  var api = require('../api');

  describe("#search", function() {
    it("should exist", function() {
      assert(api.search);
    });

  });
});
