app.controller('LoginController', function ($rootScope,$location, $http, $window, FlashService, $log, HttpService) {

    $rootScope.toolbar.visible = false;
    $rootScope.global.showModal = false;

    var credentials = this;
    $log.debug("login Controller - reporting for duty.");
    credentials.login = login;

    //$window.localStorage.removeItem('access_token');
    //$http.defaults.headers.common.Authorization = '';
    $window.localStorage.removeItem('access_token');
    $window.localStorage.removeItem('login_username');
    $window.localStorage.removeItem("currentUserDetail");
    $window.localStorage.removeItem('classData');
    $window.localStorage.removeItem('subjectData');
    $http.defaults.headers.common.Authorization = '';

    (
        function initController() {
            var modalFadeElement = angular.element(".modal-backdrop");
            $log.debug('document.getElementsByClassName: ', modalFadeElement);

            if (modalFadeElement[0] != undefined) {
                modalFadeElement[0].style.display = 'none';
            }
        })();

    function login() {
        $log.debug('login called');
        credentials.dataLoading = true;

        $rootScope.mypageloading = true;
        var payloadRequest = {
            "email": credentials.eMailid,
            "password": credentials.password
        };

        
        var requestHandle = HttpService.HttpPostData($rootScope.serverURL + '/authenticate/login', payloadRequest);
        requestHandle.then(function (result) {
            $rootScope.mypageloading = false;
            if (result.success) {
                console.log('result = ' + result.data)
                $window.localStorage.setItem('access_token', result.data.accessToken)
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.accessToken;
                var decoded = jwt_decode(result.data.accessToken);
                if(decoded){
                    var userData = {
                        'type': 'TEACHER',
                        'user_id': decoded['uid']
                    }
                    $window.localStorage.setItem("currentUserDetail", JSON.stringify(userData));
                    $rootScope.loginUserType = JSON.parse($window.localStorage.getItem("currentUserDetail"));
                }
                $rootScope.toolbar.visible = true;
                credentials.dataLoading = false;
                $location.path('/');
            }
            else{
                credentials.dataLoading = false;
            }
        })
    }
    ;
    $rootScope.showBackStrech = true;
    
});




