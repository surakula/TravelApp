(function(angular,app){
 'use strict'

       app.controller("TravelController",function($scope,$filter,$rootScope,SharedService,TravelService,CountryListService){

            var ctrl = this;

                // function to submit the form after all validation has occurred            
            $scope.searchFlight = function() {

                // check to make sure the form is completely valid
                if ($scope.userForm.$valid) {
                    alert('our form is amazing');
                }

            };
    
            $scope.$watch(function(){
                
                return SharedService.getSecurityToken();
            }, function(newValue,oldValue){
                   if(newValue){
                        CountryListService.fetchCities().then(function(response){
                            ctrl.countries = response.data;
                        }).
                        catch(function(err){
                            console.log(err);
                        });
                        ctrl.authToken = newValue;
                   }
            });

            ctrl.searchFlight = function(){
                var data ={};
                ctrl.resultsData="";
                data.originPlace = ctrl.originPlace;
                data.destinationPlace = ctrl.destinationPlace;
                data.country = ctrl.country;
                data.outboundPartialDate = $filter('date')(ctrl.outboundPartialDate, "yyyy-MM-dd");
                data.inboundPartialDate = $filter('date')(ctrl.inboundPartialDate, "yyyy-MM-dd");
                //console.log(data);
                TravelService.queryFlight(data).
                then(function(response){
                    ctrl.resultsData = response.data;
                    SharedService.setPlaces(ctrl.resultsData.Places);
                    SharedService.setCarriers(ctrl.resultsData.Carriers);
                })

            }

            ctrl.range = function(min, max, step){
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) input.push(i);
                return input;
              };

             ctrl.getCarrierName = function(carrierId){
                var carrierName= "NA";
                var carriers = SharedService.getCarriers();
                angular.forEach(carriers, function (value, index) {
                    if(carriers[index].CarrierId === carrierId){
                        carrierName = carriers[index].Name;
                    }
                });
                return carrierName;
             } 

             ctrl.getPlaceByName = function(destinationId){
                var placeName= "NA";
                var places = SharedService.getPlaces();
                angular.forEach(places, function (value, index) {
                    if(places[index].destinationId === destinationId){
                        place = places[index].Name;
                    }
                });
                return placeName;
             }

             ctrl.showDetails = function(quoteDetails){
                 var result = {};
                 result.quoteDetails = quoteDetails;
                $rootScope.$broadcast("SearchFlight:quoteDetails",result);
             } 

        });

       app.controller("TravelDetailsController",['$scope','SharedService',function($scope, SharedService){
            var nCtrl = this;

            $scope.$watch(function(){
                return SharedService.getSecurityToken();
            });

            $scope.$on("SearchFlight:quoteDetails",function(event,data){
                //console.log(data.quoteDetails);
                nCtrl.quoteDetails = data.quoteDetails;

            });

            nCtrl.getCarrierName = function(carrierId){
                var carrierName= "NA";
                var carriers = SharedService.getCarriers();
                angular.forEach(carriers, function (value, index) {
                    if(carriers[index].CarrierId === carrierId){
                        carrierName = carriers[index].Name;
                    }
                });
                return carrierName;
             } 

            nCtrl.getPlaceByName = function(destinationId){
                var placeName= "NA";
                var places = SharedService.getPlaces();
                angular.forEach(places, function (value, index) {
                    if(places[index].PlaceId === destinationId){
                        placeName = places[index].Name;
                    }
                });
                return placeName;
            }


        }]);

})(angular,travelApp);