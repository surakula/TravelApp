(() => {
    'use strict';

    /**
     * @ngdoc module
     * @name topnav.component
     * @requires ngMaterial
     * @description
     *
     * The `topnav.component` description.
     *
     */
    var app  = angular
        .module('topnav.component', [
            'ngMaterial'
        ]);


      app.component('topNavWidget', {
              templateUrl:'js/common/views/templates/nav.tpl.html',
              controller: function(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast) {

                this.$onInit = function(){
                    console.log("Top Nav Hello World");
                    var ctrl= this;
                    ctrl.menuItems = [];
                     navService
                      .loadAllItems()
                      .then(function(menuItems) {
                        ctrl.menuItems = [].concat(menuItems);
                      });

                }


                  this.selectItem = selectItem;
                  this.toggleItemsList = toggleItemsList;
                  this.title = $state.current.data.title;
                  this.showSimpleToast = showSimpleToast;
                //  this.toggleRightSidebar = toggleRightSidebar;




                  function toggleItemsList() {
                    var pending = $mdBottomSheet.hide() || $q.when(true);

                    pending.then(function(){
                      $mdSidenav('left').toggle();
                    });
                  }

                  function selectItem (item) {
                    this.title = item.name;
                    this.toggleItemsList();
                    this.showSimpleToast(this.title);
                  }
                  function showSimpleToast(title) {
                      $mdToast.show(
                        $mdToast.simple()
                          .content(title)
                          .hideDelay(2000)
                          .position('bottom right')
                          .theme("info-toast")
                      );
                    }

              },
      });
})();
