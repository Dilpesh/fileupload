app.controller('headercontroller', function ($scope, $location, $rootScope, $log, $route) {

    var playSound = playSound;
    $scope.$route = $route;
    $rootScope.$on('callHeaderController', function () {
        $log.debug('callHeaderController called in headercontroller');
        $rootScope.showVer = true;
        $scope.state = false;
        $scope.showSideNav = false;
        $scope.unSeen = 0;
        $scope.toggleState = function () {
            $rootScope.showVer = false;
            $scope.showSideNav = !$scope.showSideNav;
            $scope.state = !$scope.state;
            sidebarService.update($scope.showSideNav);
        };


    });
});