describe("Desktop", function(){
  var mobile;
  var userAgent;

  beforeEach(function() {
    mobile    = null;
    userAgent = null;
  });

  describe("Chrome", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.151 Safari/535.19";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be a mobile device", function() {
      expect(mobile.any).not.toBe(true);
    });

  });

  describe("Safari", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.53.11 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be a mobile device", function() {
      expect(mobile.any).not.toBe(true);
    });

  });

});
