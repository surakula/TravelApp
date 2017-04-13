(() => {
    var app  = angular.module("LoginComponent",['ngMaterial']);


    app.component("loginWidget",{

          templateUrl:'js/login/templates/login.tpl.html',
          controller: function(UserService,Storage,$scope,$state,AuthTokenFactory,$mdToast){

             this.$onInit = function(){
                 console.log("Login component Hello World");
             }
            this.login =function(username,password){
               var ctrl= this;
                ctrl.loginError=null;
                var request_body={"username":username,"password":password};
                console.log(request_body);
                UserService.login(request_body)
                .then(function(response){
                        AuthTokenFactory.setToken(response.data.token);
                        Storage.save('username',response.data.profile.username);
                        Storage.save('loggedIn',true);
                             $mdToast.show(
                               $mdToast.simple()
                                 .content('Welcome back '+ response.data.profile.username)
                                 .hideDelay(2000)
                                 .position('bottom right')
                                 .theme("success-toast")
                             );
                        $state.go('travel.dashboard');
                      },
                      function(error){
                        $mdToast.show(
                          $mdToast.simple()
                            .content('Error:'+ error.data)
                            .hideDelay(2000)
                            .position('bottom right')
                            .theme("error-toast")
                        );

                      });
              }


              this.logout=function(){
                UserService.logout();

                $mdToast.show(
                  $mdToast.simple()
                    .content('You are logged out')
                    .hideDelay(2000)
                    .position('bottom right')
                    .theme("success-toast")
                );
                $state.go('index');
              }
          }
    });


})()
