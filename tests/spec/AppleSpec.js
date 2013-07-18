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
      expect(mobile.apple.ipod).not.toBe(true);
    });

    it("should be matched as Any Phone", function() {
      expect(mobile.phone).toBe(true);
    });

    it("should be an Apple device", function() {
      expect(mobile.apple.device).toBe(true);
    });

  });

  describe("iPad UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an iPhone", function() {
      expect(mobile.apple.phone).not.toBe(true);
    });

    it("should be an iPad", function() {
      expect(mobile.apple.tablet).toBe(true);
    });

    it("should not be an iPod", function() {
      expect(mobile.apple.ipod).not.toBe(true);
    });

    it("should be matched as Any Tablet", function() {
      expect(mobile.tablet).toBe(true);
    });

    it("should be an Apple device", function() {
      expect(mobile.apple.device).toBe(true);
    });

  });

  describe("iPod UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an iPhone", function() {
      expect(mobile.apple.phone).not.toBe(true);
    });

    it("should not be an iPad", function() {
      expect(mobile.apple.tablet).not.toBe(true);
    });

    it("should be an iPod", function() {
      expect(mobile.apple.ipod).toBe(true);
    });

    it("should be an Apple device", function() {
      expect(mobile.apple.device).toBe(true);
    });

  });

});
