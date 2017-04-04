var travelApp =  (function(angular){
    var app = angular.module("travelAppMain",['travelRoutes','travel.factory','travel.service','travel.constants']);


    return app;
})(angular);
