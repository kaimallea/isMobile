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

  describe("Facebook iPhone App UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (iPhone; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B410 [FBAN/FBIOS;FBAV/20.1.0.15.10;FBBV/5758778;FBDV/iPad5,4;FBMD/iPad;FBSN/iPhone OS;FBSV/8.1;FBSS/2; FBCR/;FBID/tablet;FBLC/fi_FI;FBOP/1]";
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

    it("should be an Apple device", function() {
      expect(mobile.apple.device).toBe(true);
    });

  });

  describe("Facebook iPad App UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (iPad; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B410 [FBAN/FBIOS;FBAV/20.1.0.15.10;FBBV/5758778;FBDV/iPad5,4;FBMD/iPad;FBSN/iPhone OS;FBSV/8.1;FBSS/2; FBCR/;FBID/tablet;FBLC/fi_FI;FBOP/1]";
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

    it("should be an Apple device", function() {
      expect(mobile.apple.device).toBe(true);
    });

  });

  describe("Twitter iPhone App UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13D15 Twitter for iPhone";
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

    it("should be an Apple device", function() {
      expect(mobile.apple.device).toBe(true);
    });

  });

  describe("Twitter iPad App UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (iPad; CPU OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13D15 Twitter for iPhone";
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

    it("should be an Apple device", function() {
      expect(mobile.apple.device).toBe(true);
    });

  });

});
