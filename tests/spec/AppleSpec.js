describe("Apple", function(){
  var mobile;
  var userAgent;

  beforeEach(function() {
    mobile    = null;
    userAgent = null;
  });

  describe("iPhone UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3";
      mobile = new isMobile.Class(userAgent);
    });

    it("should be an iPhone", function() {
      expect(mobile.apple.phone).toBe(true);
    });

    it("should not be an iPad", function() {
      expect(mobile.apple.tablet).not.toBe(true);
    });

    it("should not be an iPod", function() {
      expect(mobile.apple.tablet).not.toBe(true);
    });

    it("should be an Apple device", function() {
      expect(mobile.apple.device).toBe(true);
    });

  });

});
