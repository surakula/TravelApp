(function(angular){
    var app  = angular.module("SearchFlightComponent",['toastr']);


    app.component("searchWidget",{
          templateUrl:'js/home/searchflight.tpl.html',
          controller: function(CountryListService, SharedService,TravelService,$filter,toastr, $state){

               this.$onInit = function(){
                   var ctrl= this;
                 CountryListService.fetchCities().then(function(response){
                     ctrl.countries = response.data;
                 }).
                 catch(function(err){
                    toastr.error(err.data, 'Error');
                    $state.go('login');
                     console.log(err);
                 });
               }
               this.searchFlight = function(){
                     var ctrl= this;
                     var data ={};
                     this.resultsData="";
                     data.originPlace = this.originPlace;
                     data.destinationPlace = this.destinationPlace;
                     data.country = this.country;
                     data.outboundPartialDate = $filter('date')(this.outboundPartialDate, "yyyy-MM-dd");
                     data.inboundPartialDate = $filter('date')(this.inboundPartialDate, "yyyy-MM-dd");
                     TravelService.queryFlight(data).
                     then(function(response){
                         ctrl.resultsData = response.data;
                         console.log(ctrl.resultsData);
                         SharedService.setPlaces(ctrl.resultsData.Places);
                         SharedService.setCarriers(ctrl.resultsData.Carriers);
                     }).
                     catch(function(err){
                         console.log(err);
                     });

                 }
                 this.getCarrierName = function(carrierId){
                    var carrierName= "NA";
                    var carriers = SharedService.getCarriers();
                    angular.forEach(carriers, function (value, index) {
                        if(carriers[index].CarrierId === carrierId){
                            carrierName = carriers[index].Name;
                        }
                    });
                    return carrierName;
                 }
          },
          //controllerAs: "travelCtrl"
    });



 return app;

})(angular)
