(function(angular,app){

     app.controller("LoginController",function($scope,LoginService,SharedService){
            var ctrl = this;
            ctrl.userName = "";
            ctrl.password = "";
            ctrl.login = function(){
                var loginData = {
                    userId:ctrl.userName,
                    password:ctrl.password
                }
                LoginService.login(loginData).
                    then(function(response){
                      
                      SharedService.setSecurityToken(response.data.securityToken);

                    }).
                    catch(function(err){
                        console.log(err);
                    })

            }
        });


})(angular,travelApp)