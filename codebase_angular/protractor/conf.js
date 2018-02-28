// An example configuration file.
exports.config = {
  directConnect: true,
	seleniumAddress: 'http://localhost:4444/wd/hub',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
 /* specs: ['location_test.js'],*/
  /*specs: ['AdminScreen_test.js'],*/
  specs: ['device_test.js'],
  
 

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 80000
  }
};
