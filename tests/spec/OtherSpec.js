describe("Other Mobile Devices", function(){
  var mobile;
  var userAgent;

  beforeEach(function() {
    mobile    = null;
    userAgent = null;
  });

  describe("BlackBerry 10", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.35+ (KHTML, like Gecko) Version/10.2.0.1791 Mobile Safari/537.35+";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be a Chrome device", function() {
      expect(mobile.other.chrome).not.toBe(true);
    });

    it("should be a BlackBerry 10 device", function() {
      expect(mobile.other.blackberry10).toBe(true);
    });

    it("should not be a BlackBerry device", function() {
      expect(mobile.other.blackberry).not.toBe(true);
    });

    it("should not be an Android device", function() {
      expect(mobile.android.device).not.toBe(true);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should be a mobile device", function() {
      expect(mobile.any).toBe(true);
    });

  });

  describe("BlackBerry", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be a Chrome device", function() {
      expect(mobile.other.chrome).not.toBe(true);
    });

    it("should be a BlackBerry device", function() {
      expect(mobile.other.blackberry).toBe(true);
    });

    it("should not be a BlackBerry 10 device", function() {
      expect(mobile.other.blackberry10).not.toBe(true);
    });

    it("should not be an Android device", function() {
      expect(mobile.android.device).not.toBe(true);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should be a mobile device", function() {
      expect(mobile.any).toBe(true);
    });

  });

  describe("Opera Mini", function() {

    beforeEach(function() {
      userAgent = "Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be a Chrome device", function() {
      expect(mobile.other.chrome).not.toBe(true);
    });

    it("should be an Opera Mini device", function() {
      expect(mobile.other.opera).toBe(true);
    });

    it("should not be an Android device", function() {
      expect(mobile.android.device).not.toBe(true);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should be a mobile device", function() {
      expect(mobile.any).toBe(true);
    });

  });

  describe("Firefox OS", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Mobile; rv:14.0) Gecko/14.0 Firefox/14.0";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be a Chrome device", function() {
      expect(mobile.other.chrome).not.toBe(true);
    });

    it("should be a Firefox OS device", function() {
      expect(mobile.other.firefox).toBe(true);
    });

    it("should not be an Android device", function() {
      expect(mobile.android.device).not.toBe(true);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should be a mobile device", function() {
      expect(mobile.any).toBe(true);
    });

  });

  describe("Chrome", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; Android 4.4.4; en-us; Nexus 4 Build/JOP40D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36";
      mobile = new isMobile.Class(userAgent);
    });

    it("should be a Chrome device", function() {
      expect(mobile.other.chrome).toBe(true);
    });

    it("should be an Android device", function() {
      expect(mobile.android.device).toBe(true);
    });

    it("should not be a Firefox OS device", function() {
      expect(mobile.other.firefox).toBe(false);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should be a mobile device", function() {
      expect(mobile.any).toBe(true);
    });

  });

});
