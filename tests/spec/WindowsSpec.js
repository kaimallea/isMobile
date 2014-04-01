describe("Windows", function(){
  var mobile;
  var userAgent;

  beforeEach(function() {
    mobile    = null;
    userAgent = null;
  });

  describe("Windows Phone UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)";
      mobile = new isMobile.Class(userAgent);
    });

    it("should be a Windows Phone device", function() {
      expect(mobile.windows.phone).toBe(true);
    });

    it("should not be an Android device", function() {
      expect(mobile.android.device).not.toBe(true);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should be matched as Any Phone", function() {
      expect(mobile.phone).toBe(true);
    });

    it("should be a mobile device", function() {
      expect(mobile.any).toBe(true);
    });

  });

  describe("Windows Tablet UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; ARM; Trident/6.0; Touch)";
      mobile = new isMobile.Class(userAgent);
    });

    it("should be a Windows Tablet device", function() {
      expect(mobile.windows.tablet).toBe(true);
    });

    it("should not be a Windows Phone device", function() {
      expect(mobile.other.windows).not.toBe(true);
    });

    it("should not be an Android device", function() {
      expect(mobile.android.device).not.toBe(true);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should be matched as Any Tablet", function() {
      expect(mobile.tablet).toBe(true);
    });

    it("should be a mobile device", function() {
      expect(mobile.any).toBe(true);
    });

  });

  describe("Windows Touch Laptop UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; MAGWJS; rv:11.0) like Gecko";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be a Windows Tablet device", function() {
      expect(mobile.windows.tablet).not.toBe(true);
    });

    it("should not be a Windows Phone device", function() {
      expect(mobile.other.windows).not.toBe(true);
    });

    it("should not be an Android device", function() {
      expect(mobile.android.device).not.toBe(true);
    });

    it("should not be an Apple device", function() {
      expect(mobile.apple.device).not.toBe(true);
    });

    it("should not be matched as Any Tablet", function() {
      expect(mobile.tablet).not.toBe(true);
    });

    it("should not be a mobile device", function() {
      expect(mobile.any).not.toBe(true);
    });

  });

});
