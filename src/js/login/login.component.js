(function(angular){
    var app  = angular.module("LoginComponent",['toastr']);


    app.component("loginWidget",{

          templateUrl:'js/login/login.tpl.html',
          controller: function(UserService,Storage,$scope,$state,AuthTokenFactory,toastr){

             this.$onInit = function(){
                 console.log("Login component Hello World");
             }
            this.login =function(username,password){
               var ctrl= this;
                ctrl.loginError=null;
                var request_body={"username":username,"password":password};
                UserService.login(request_body)
                .then(function(response){
                        AuthTokenFactory.setToken(response.data.token);
                        Storage.save('username',response.data.profile.username);
                        Storage.save('loggedIn',true);
                        toastr.success('Welcome back '+ response.data.profile.username,
                              { closeButton: true}
                            );
                        $state.go('home');
                      },
                      function(error){ toastr.error(error.data, 'Error');});
              }
              this.logout=function(){
                UserService.logout();
                $state.go('index');
                toastr.success("You are logged out");
              }
          }
    });


})(angular)
