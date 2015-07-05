describe("Amazon", function(){
  var mobile;
  var userAgent;

  beforeEach(function() {
    mobile    = null;
    userAgent = null;
  });

  describe("Amazon Kindle Fire User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFOT Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Kindle Fire HD User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFTT Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Kindle Fire HD 8.9inch User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFJWI Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Kindle Fire HD 8.9inch 4G User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFJWA Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Kindle Fire HD 7inch (3rd Generation) User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFSOWI Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Kindle Fire HDX 7inch (3rd Generation) User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFTHWI Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Kindle Fire HDX 7 (3rd Generation) 4G User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFTHWA Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Kindle Fire HDX 8.9inch (3rd Generation) User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFAPWI Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Kindle Fire HDX 8.9inch (3rd Generation) 4G User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFAPWA Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Fire HD 6 (4th Generation) User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFARWI Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Fire HD 7 (4th Generation) User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFASWI Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Fire HDX 8.9 (4th Generation) User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFSAWI Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Fire HDX 8.9 (4th Generation) 4G User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; KFSAWA Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should not be an Amazon Phone", function() {
      expect(mobile.amazon.phone).not.toBe(true);
    });

    it("should be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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

  describe("Amazon Fire Phone User Agent", function() {

    beforeEach(function() {
      userAgent = "Mozilla/5.0 (Linux; U; Android android-version; locale; SD4930UR Build/product-build) AppleWebKit/webkit-version (KHTML, like Gecko) Silk/browser-version like Chrome/chrome-version Safari/webkit-version";
      mobile = new isMobile.Class(userAgent);
    });

    it("should be an Amazon Phone", function() {
      expect(mobile.amazon.phone).toBe(true);
    });

    it("should not be an Amazon Tablet", function() {
      expect(mobile.amazon.tablet).not.toBe(true);
    });

    it("should be an Amazon device", function() {
      expect(mobile.amazon.device).toBe(true);
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
});
