(() => {
    'use strict';

    /**
     * @ngdoc module
     * @name search.flight.Component
     * @requires dependencies
     * @description
     *
     * The `search.flight.Component` description.
     *
     */
    var app  =angular
        .module('search.flight.component', [
            'ngMaterial','ngMessages'
        ]);
    app.component("searchWidget",{
          templateUrl:'js/dashboard/templates/searchflight.tpl.html',
          controller: function(CountryListService, SharedService,TravelService,$filter,$mdToast, $state,$scope){
                this.Quotes=[];
                this.totalQuotes;
                this.originPlace= "SFO";
                this.destinationPlace="HYD";
                this.options = {
                    rowSelection: true,
                    multiSelect: false,
                    autoSelect: true,
                    decapitate: false,
                    largeEditDialog: false,
                    boundaryLinks: false,
                    limitSelect: true,
                    pageSelect: true
                  };
                this.limitOptions = [5, 10, 15, {
                    label: 'All',
                    value: this.totalQuotes
                  }];
                this.query = {
                  order: 'QuoteId',
                  limit: 5,
                  page: 1
                };
               $scope.selected = [];
               this.render = function (T) {
                  return T;
                }
               this.$onInit = function(){
                var ctrl= this;
                ctrl.outboundPartialDate=new Date();
                 CountryListService.fetchCities().then(function(response){
                     ctrl.countries = response.data;
                 }).
                 catch(function(err){
                   $mdToast.show(
                     $mdToast.simple()
                       .content('Something went wrong!... please re-login again')
                       .hideDelay(2000)
                       .position('top right')
                       .theme("error-toast")
                   );
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
                     data.country = this.country.value;
                     data.outboundPartialDate = $filter('date')(this.outboundPartialDate, "yyyy-MM-dd");
                     data.inboundPartialDate = $filter('date')(this.inboundPartialDate, "yyyy-MM-dd");
                     console.log(data);
                     TravelService.queryFlight(data).
                       then(function(response){
                            //console.log(response.data);
                           ctrl.resultsData = response.data;
                          // ctrl.Quotes= this.resultsData.Quotes;
                           ctrl.totalQuotes = ctrl.resultsData.Quotes.length;
                           console.log(ctrl.resultsData);
                           SharedService.setPlaces(ctrl.resultsData.Places);
                           SharedService.setCarriers(ctrl.resultsData.Carriers);
                       }).
                       catch(function(err){
                         $mdToast.show(
                           $mdToast.simple()
                             .content('Error:'+ err.data)
                             .hideDelay(2000)
                             .position('top right')
                             .theme("error-toast")
                         );
                         $state.go('login');
                         console.log(err);
                       });
                 }
                 this.getAllQuotes= function(){
                      return this.resultsData.Quotes ;
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
    });

})();
