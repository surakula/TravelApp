(function(angular,app){
 'use strict'
        app.service("TravelService",function($http, SKYSCANNER_API){
            this.queryFlight = function(data){
                //console.log("Service - Data " + data.country);
                var queryFlightURLCCODE = SKYSCANNER_API.BROWSE_QUOTES.replace('{country}',data.country).replace('{currency}','USD').replace('{locale}','en_US');
                var queryFlightURLOriDes =  queryFlightURLCCODE.replace('{originPlace}',data.originPlace).replace('{destinationPlace}',data.destinationPlace);
                var finalQuery= queryFlightURLOriDes.replace('{outboundPartialDate}',data.outboundPartialDate).replace('{inboundPartialDate}',data.inboundPartialDate);
                var _finalQuery=SKYSCANNER_API.SEARCH_FLIGHTS+"?searchQuery="+finalQuery;
                //console.log(_finalQuery);
                return $http.get(_finalQuery);

             };
        });

        app.service("SharedService",function(){
             var security_token = "";
            this.setSecurityToken = function(securityToken){
                security_token = securityToken;
            };

            this.getSecurityToken = function(){
                return security_token;
            }
            var _places="";
            this.setPlaces = function(places){
                _places= places;
            }
            this.getPlaces=  function(){
                return _places;
            }

            var _carriers="";
            this.setCarriers=function(carriers){
                _carriers=carriers;
            }
            this.getCarriers=function(){
                return _carriers;
            }
            
        })
        app.service("LoginService",function($http,SKYSCANNER_API){
           
            this.login = function(loginData){
                return $http.post(SKYSCANNER_API.LOGIN_URL,loginData);
            };

        

        });

        app.service("CountryListService",function($http,SKYSCANNER_API){

            this.fetchCities = function(){
                return $http.get(SKYSCANNER_API.COUNTRY_URL);

            }

        })

          app.factory('LoginInterceptor',function(SharedService){
            return{
                request:function(config){
                    if(config.url.startsWith("/")){
                        config.headers['Auth-Token'] = SharedService.getSecurityToken();
                    }  
                    return config;
                }
            }

        });
        app.config(function($httpProvider){
            $httpProvider.interceptors.push('LoginInterceptor')

        });
})(angular,travelApp);