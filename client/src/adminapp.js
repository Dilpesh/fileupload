'use strict';

var app = angular.module('TrackWebApp', ['ngRoute', 'angular-jwt',
    ]);
/**
 * Configure the Routes
 */
app.config(['$routeProvider', '$logProvider', function ($routeProvider, $logProvider) {
    $routeProvider
        // Home
        .when("/", {
            templateUrl: "src/application/fileupload/fileupload.html", controller: "fileUploadController"
        })
        .when("/login", { templateUrl: "./src/application/login/login.html", controller: "LoginController", controllerAs: 'credentials' })
        // else 404
        .otherwise({ redirectTo: '/' });
    
    // $logProvider.debugEnabled(false);
}]);


app.run(function ($rootScope, $log, $interval, $location, $window, $http) {
    $log.debug('run');
    $rootScope.serverURL = "http://localhost:9000";
    
    $rootScope.global = {
        error: '',
        showModal: false,
    };


    $rootScope.toolbar = {
        visible: true
    };
    $rootScope.showSideMenu = false;
    setTimeout(function () {
        $('#sidebar').addClass('hide');
    })
    $rootScope.loginUserName = $window.localStorage.getItem('login_username');
    $rootScope.isActive = function (route) {
        return route === $location.path();
    };

    $rootScope.logout = function () {
        // $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage.getItem('refresh_token');

        $window.localStorage.removeItem('access_token');
        $location.path('/login')
    }
    
    $rootScope.toggleSideThruIcon = function () {
        $rootScope.showSideMenu = !$rootScope.showSideMenu;
        if ($rootScope.showSideMenu == true) {
            $('#sidebar').removeClass('hide');
        } else {
            $('#sidebar').addClass('hide');
        }
    };

    
    

});


app.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function() {
                     scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);

