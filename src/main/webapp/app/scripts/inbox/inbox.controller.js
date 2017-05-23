
(function () {
    'use strict';

    angular
        .module('zerohqt.inbox')
        .controller('InboxController', InboxController);

    InboxController.$inject = ['$scope', '$ionicLoading', '$rootScope'];

    /* @ngInject */
    function InboxController($scope, $ionicLoading, $rootScope) {
        $scope.notificationsMap = {};
        $scope.shouldShowDelete = false;
        $scope.listCanSwipe = true;

        $scope.$on('wsMessageAck', function (event, informationBay) {
            if (typeof informationBay.acknowledge !== 'undefined' && informationBay.acknowledge !== null) {
                var acknowledge = informationBay.acknowledge;
                $scope.notificationsMap[acknowledge.id] = acknowledge;
                $scope.$apply(); //Apply changes to the page
            }
        });

        $scope.loadMore = function () {
        }

        $scope.$on('$ionicView.loaded', function (viewInfo, state) {
            $scope.isRemoveAllEnabled = false;
            var notifs = JSON.parse(localStorage.getItem('notifications'));
            if (notifs) {
                $scope.notificationsMap = notifs;
            }
        });

        $scope.$on('$ionicView.enter', function (viewInfo, state) {
            $scope.isRemoveAllEnabled = false;
            if ($rootScope.acknowledges) {
                angular.forEach($rootScope.acknowledges, function (value) {
                    var acknowledge = value.acknowledge;
                    $scope.notificationsMap[acknowledge.id] = acknowledge;
                    $scope.$apply(); //Apply changes to the page
                })
            }
        });

        $scope.deleteAcknowledge = function (id) {
            var isAck3 = $scope.notificationsMap[id].ackType === 'ack3';
            if (!isAck3)
                delete $scope.notificationsMap[id];
        }

        $scope.enableRemoveAll = function () {
            if (angular.equals($scope.notificationsMap, {})) return;
            $scope.isRemoveAllEnabled = true;
        }

        $scope.removeAll = function () {
            for (var i in  $scope.notificationsMap) {
                var elem = $scope.notificationsMap[i];
                if (elem.ackType !== 'ack3') {
                    localStorage.removeItem(elem.id)
                    delete $scope.notificationsMap[i];
                }
            }
            $scope.isRemoveAllEnabled = false;
        }

        $scope.$on('$ionicView.afterLeave', function (viewInfo, state) {
            try {
                localStorage.clear();
                localStorage.setItem('notifications', JSON.stringify($scope.notificationsMap)); //TODO check Mb of data
                $rootScope.acknowledges = [];
            } catch (error) {
                console.log('Error encountered saving notifications in localStorage: ' + error);
            }
            console.log('Saved notifications!!!');

        });

        $scope.$on('$ionicView.afterLeave', function (viewInfo, state) {
            $rootScope.informationBays = [];
        });

    }
})();
