

var LoginPage = function(){

  this.inputUserId= function(userId){
    element(by.model("$ctrl.userName")).sendKeys(userId);
    return this;
  }

  this.inputPassword= function(password){
    element(by.model("$ctrl.password")).sendKeys(password);
    return this;
  }

  this.login = function(){
    element(by.xpath('//button[normalize-space(text())="Sign in"]')).click()
    //element(by.buttonText("SignIn")).click();

  }
}

module.exports = new LoginPage();
