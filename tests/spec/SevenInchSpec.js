describe("Seven Inch", function(){
  var mobile;
  var userAgent;

  beforeEach(function() {
    mobile    = null;
    userAgent = null;
  });

  describe("Nexus 7", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19";
      mobile = new isMobile.Class(userAgent);
    });

    it("should be a Seven Inch device", function() {
      expect(mobile.seven_inch).toBe(true);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should be a mobile device", function() {
      expect(mobile.any).toBe(true);
    });

  });

});
