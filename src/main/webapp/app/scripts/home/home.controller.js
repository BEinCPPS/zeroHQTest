(function () {
    'use strict';

    angular
        .module('zerohqt.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope'];

    /* @ngInject */
    function HomeController($scope, $rootScope) {
        $scope.entries = {};
        // $scope.isWsConnected = false;
        $scope.MAX_NR_BAYS = 4;

        $scope.$on('wsMessage', function (event, informationBay) {
            console.log(informationBay); // 'Broadcast!'
            aggregateData(informationBay);
            $scope.$apply(); //Apply changes to the page
        });


        function aggregateData(informationBay) {
            var stationName = informationBay.stationName;
            var bays = $scope.entries[stationName] ? $scope.entries[stationName] : [];
            initBaysArray(bays);
            var bayNumber = parseInt(informationBay.bayNumber);
            bayNumber--;
            bays[bayNumber] = informationBay; //Station bays numbers starts from 1
            $scope.entries[stationName] = bays;
        }

        function initBaysArray(bays) {
            for (var i = 0; i < $scope.MAX_NR_BAYS; i++) {
                if (bays[i]) continue;
                bays[i] = {};
            }
        }


        $scope.getBackgroundColor = function (stateType) {
            if (stateType === 'normal')  return 'button icon ion-android-checkmark-circle green-button';
            else if (stateType === 'warning') return 'button icon ion-android-warning yellow-button';
            else if (stateType === 'error') return 'button icon ion-android-alert red-button';

        }

        $scope.$on('$ionicView.loaded', function (viewInfo, state) {
        });

        $scope.$on('$ionicView.enter', function (viewInfo, state) {
            if ($rootScope.informationBays) {
                angular.forEach($rootScope.informationBays, function (value) {
                    aggregateData(value);
                    $scope.apply();
                })
            }
        });

        $scope.$on('$ionicView.afterLeave', function (viewInfo, state) {
            $rootScope.informationBays = [];
        });

        /*var listenerCleanFn = $scope.$on('wsMessage', function () {

         });

         $scope.$on('$destroy', function() {
         listenerCleanFn();
         });*/


    }
})();
