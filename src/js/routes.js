(function(angular){
 'use strict'
          var app  = angular.module("travelRoutes",['ui.router','LoginComponent','SearchFlightComponent','toastr']);
          app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
                $urlRouterProvider.otherwise('/');
                $locationProvider.hashPrefix('!');
                //$locationProvider.html5Mode(true);
                $stateProvider
                    .state('index', {
                        url: '/',
                        template:`<div> <login-widget></login-widget></div>`,
                    })
                    .state('login', {
                        url: '/login',
                        template: `<div> <login-widget></login-widget></div>`,
                    })
                    .state('home', {
                        url: '/home',
                        template:`<div><search-widget></search-widget></div>`,
                        authenticate: true
                    })
                    .state('logout', {
                        url: '/logout',
                        controller: function($state, UserService) {
                          UserService.logout();
                          $state.go('index');
                        },
                    });
                //enables case insensitive URLs (in browser address bar you can
                //enter upper or lower case letters. no matter)
                $urlRouterProvider.rule(function ($injector, $location) {
                    var path = $location.path();
                    var normalized = path.toLowerCase();

                    if (path !== normalized) {
                        console.log("Lowercasing rule is applied!");
                        return normalized;
                    }
                    return null;
                });

            });

            app.config(function($httpProvider){
              $httpProvider.interceptors.push('AuthInterceptor');
            });

            app.run(function($rootScope,AuthService,$state, toastr){
                  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                     if(toState.authenticate && toState.name !== 'login' && !AuthService.isLoggedIn()){
                       toastr.error("Un Authorised Access, Please log in", 'Error');
                       event.preventDefault();
                       $state.transitionTo('login');
                     }
                  });
            });

})(angular);
