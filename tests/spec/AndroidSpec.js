describe("Android", function(){
  var mobile;
  var userAgent;

  beforeEach(function() {
    mobile    = null;
    userAgent = null;
  });

  describe("Phone UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>";
      mobile = new isMobile.Class(userAgent);
    });

    it("should be an Android Phone", function() {
      expect(mobile.android.phone).toBe(true);
    });

    it("should not be an Android Tablet", function() {
      expect(mobile.android.tablet).not.toBe(true);
    });

    it("should be matched as Any Phone", function() {
      expect(mobile.phone).toBe(true);
    });

    it("should be an Android device", function() {
      expect(mobile.android.device).toBe(true);
    });

  });

  describe("Tablet UserAgent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev>(KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev>";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Android Phone", function() {
      expect(mobile.android.phone).not.toBe(true);
    });

    it("should be an Android Tablet", function() {
      expect(mobile.android.tablet).toBe(true);
    });

    it("should be matched as Any Tablet", function() {
      expect(mobile.tablet).toBe(true);
    });

    it("should be an Android device", function() {
      expect(mobile.android.device).toBe(true);
    });

  });
});
