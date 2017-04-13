(() => {
    'use strict';

    /**
     * @ngdoc module
     * @name travelAppMain
     * @requires dependencies
     * @description
     *
     * The `travelAppMain` description.
     *
     */
    angular
        .module('travelAppMain', [
          'ngMaterial' ,'travelRoutes',
          'travel.factory','travel.service',
          'travel.constants','navModule','md.data.table'
        ]);
})();
