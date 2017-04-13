(() => {
 'use strict'
          var app  = angular.module("travelRoutes",['ngAnimate',
             'ui.router', 'ngMaterial',
              'LoginComponent','topnav.component','navModule','search.flight.component']);
          app.config(function($stateProvider, $urlRouterProvider,$locationProvider,$mdThemingProvider) {
                $urlRouterProvider.otherwise('/');
                $locationProvider.hashPrefix('!');
                //$locationProvider.html5Mode(true);
                $stateProvider
                    .state('index', {
                        url: '/',
                        template:`<login-widget></login-widget>`,
                    })
                    .state('login', {
                        url: '/login',
                        template: `<login-widget></login-widget>`,
                    })
                    .state('travel', {
                        url: '',
                        template: `<top-nav-widget class='md-whiteframe-3'></top-nav-widget>`,
                        authenticate: true,
                        abstract: true
                    })
                    .state('travel.dashboard', {
                        url: '/dashboard',
                        template: `<strong>Welcome to Dashboard </strong>`,
                        data: {
                          title: 'Dashboard'
                        }
                    })
                    .state('travel.flight', {
                        url: '/flight',
                        template: `<search-widget></search-widget>`,
                        data: {
                          title: 'Profile'
                        }
                    })
                    .state('travel.hotel', {
                        url: '/hotel',
                        template: `Hello World Hotel`,
                        data: {
                          title: 'Profile'
                        }
                    })
                    .state('travel.profile', {
                        url: '/profile',
                        template: `Hello World Profile`,
                        data: {
                          title: 'Profile'
                        }
                    })
                    .state('logout', {
                        url: '/logout',
                        controller: function($state, UserService) {
                          UserService.logout();
                          $state.go('index');
                        },
                    });
                    $mdThemingProvider.theme("success-toast");
                    $mdThemingProvider.theme("error-toast");
                    $mdThemingProvider.theme('info-toast');
                    $mdThemingProvider.theme('default')
                         .primaryPalette('defaultPrimary', {
                           'default': '400'
                         })
                         .accentPalette('defaultPrimary', {
                           'default': '600'
                         })
                         .warnPalette('red', {
                           'default': '200'
                         });

                     $mdThemingProvider.theme('dark', 'default')
                       .primaryPalette('defaultPrimary')
                       .dark();

                     $mdThemingProvider.theme('custom', 'default')
                       .primaryPalette('defaultPrimary', {
                         'hue-1': '600'
                     });

                     $mdThemingProvider.definePalette('defaultPrimary', {
                       '50':  '#E1F5FE',
                       '100': '#B3E5FC',
                       '200': '#81D4FA',
                       '300': '#4FC3F7',
                       '400': '#29B6F6',
                       '500': '#2196F3',
                       '600': '#039BE5',
                       '700': '#0288D1',
                       '800': '#0277BD',
                       '900': '#01579B',
                       'A100': '#80D8FF',
                       'A200': '#40C4FF',
                       'A400': '#00B0FF',
                       'A700': '#0091EA'
                     });

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

                   app.run(function($rootScope,AuthService,$state, $mdToast){
                         $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                            if(toState.authenticate && toState.name !== 'login' && !AuthService.isLoggedIn()){
                              $mdToast.show(
                                $mdToast.simple()
                                  .content("Access Denied!... Please log in")
                                  .hideDelay(2000)
                                  .position('top right')
                                  .theme("error-toast")
                              );
                              event.preventDefault();
                              $state.transitionTo('login');
                            }
                         });
                   });

})();
