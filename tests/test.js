var loginPage = require("./loginPage.js");
var origFn = browser.driver.controlFlow().execute;
  browser.driver.controlFlow().execute = function () {
    var args = arguments;
// queue 100ms wait
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(200); // here we can adjust the execution speed
      });
    return origFn.apply(browser.driver.controlFlow(), args);
  };

  describe("Testing Travel App Suite", function(){
    beforeEach(function(){
      browser.get("http://localhost:8080/");
      console.log("... Before Each --- Main");
    });

    afterEach(function(){
      console.log("... Completed Main Test");
    });


    it("Test Login Click by Page Object", function(){

        loginPage.inputUserId("admin").
                  inputPassword("admin").
                  login();
        browser.sleep(2000);


    });
    


  })
