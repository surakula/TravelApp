// An example configuration file.
exports.config = {
  directConnect: true,
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
   'chromeOptions': {'args': ['lang=en-GB',  'enable-precise-memory-info' , 'js-flags=--expose-gc', 'no-sandbox']}
  },
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',
  // Spec patterns are relative to the current working directory when
  // protractor is called.
    specs: ['test.js'],
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9000/',



  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  }
};
