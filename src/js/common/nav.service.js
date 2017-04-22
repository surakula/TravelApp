(() => {
    'use strict';

    /**
     * @ngdoc service
     * @name service
     * @module nav.service
     * @requires  no dependencies
     * @description
     *
     * The `service` service description.
     *
     */
    angular
        .module('navModule',[])
        .service('navService', [
            '$q',
            navService
    ]);

    function navService($q){
      var menuItems = [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          sref: '.dashboard'
        },
        {
          name: 'Flight',
          icon: 'flight',
          sref: '.flight'
        },
        {
          name: 'Hotel',
          icon: 'hotel',
          sref: '.hotel'
        }
      ];

      return {
        loadAllItems : function() {
          return $q.when(menuItems);
        }
      };
    }
})();
