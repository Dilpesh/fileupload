
//angular
//        .module('TrackWebApp')
app.factory('HttpService',
    //UserService.$inject = ['$http'];
    function HttpService($http, $rootScope, $location, FlashService, $window, $route) {
        var service = {};

        // Calling a localstorage to get a access token.
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage.getItem('access_token');

        service.HttpGetData = HttpGetData;
        service.HttpPostData = HttpPostData;
        service.HttpUpdateData = HttpUpdateData;
        service.HttpDeleteData = HttpDeleteData;

        return service;

        // function refreshToken(){$rootScope.firebaseUser.getToken().then(function (result) {
        //     console.log(result)
        // });}
        // function APICallAfterRefresh(apiMethod, postData, apiUrl) {
        //     $rootScope.mypageloading = true;
        //     $http({
        //         method: apiMethod,
        //         url: apiUrl,
        //         data: postData,
        //         headers: {
        //             'Authorization': 'Bearer ' + $window.localStorage.getItem('access_token')
        //         }
        //     }).then(function mySuccess(response) {
        //         console.log('==================================================');
        //         console.log(response);
        //         $route.reload();
        //         $rootScope.mypageloading = false;

        //     }, function myError(error) {
        //         //$location.path('/login');
        //         $rootScope.mypageloading = false;
        //     });
        // }

        function HttpGetData(url) {
            //$rootScope.mypageloading = true;
            // refreshToken();
            return $http.get(url).then(handleSuccess, handleError);
        }

        function HttpPostData(url, data) {
            //$rootScope.mypageloading = true;
            // refreshToken();
            return $http.post(url, data).then(handleSuccess, handleError);
        }

        function HttpUpdateData(url, data) {
            //$rootScope.mypageloading = true;
            // refreshToken();
            return $http.put(url, data).then(handleSuccess, handleError);
        }

        function HttpDeleteData(url) {
            //$rootScope.mypageloading = true;
            // refreshToken();
            return $http.delete(url).then(handleSuccess, handleError);
        }


        // private functions

        function handleSuccess(response) {
            $rootScope.mypageloading = false;
            $rootScope.global.error = '';
            return { success: true, data: response.data };

        }

        function handleError(response) {
            $rootScope.mypageloading = false;
            console.log(response);
            var urlData = response.config.url;
            var apiData = response.config.data;
            var apiiMethod = response.config.method;

            console.log(response.config.url);
            console.log(response.config.data);
            console.log(response.config.method);
            if (response.status == '401') {

                console.log($location.path());
                if ($location.path() != '/login') {

                    // $rootScope.mypageloading = true;
                    $location.path('/login');
                    $rootScope.mypageloading = false;
                    //$window.localStorage.removeItem('access_token');
                    //$window.localStorage.removeItem('refresh_token');

                    // $http({
                    //     method: "GET",
                    //     url: $rootScope.serverURL + '/authenticate/reftoken',
                    //     headers: {
                    //         'Authorization': 'Bearer ' + $window.localStorage.getItem('refresh_token')
                    //     }
                    // }).then(function mySuccess(response) {

                    //     $window.localStorage.setItem('access_token', response.data.accessToken)
                    //     $window.localStorage.setItem('refresh_token', response.data.refreshToken)
                    //     $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
                    //     console.log('Redirecting to ' + $location.path());

                    //     //var pathValue = $location.path();
                    //     // var urlData = response.config.url;
                    //     // var apiData = response.config.data;
                    //     // var apiiMethod = response.config.method;

                    //     ///=============================================================
                    //     $http({
                    //         method: apiiMethod,
                    //         url: urlData,
                    //         data: apiData,
                    //         headers: {
                    //             'Authorization': 'Bearer ' + $window.localStorage.getItem('access_token')
                    //         }
                    //     }).then(function mySuccess(response) {
                            
                    //         $route.reload();
                    //         $rootScope.mypageloading = false;
            
                    //     }, function myError(error) {
                    //         //$location.path('/login');
                    //         $route.reload();
                    //         $rootScope.mypageloading = false;
                    //     });


                    //     //APICallAfterRefresh(apiiMethod, apiData, urlData);
                        
                    //     //$route.reload();
                    //     //$location.path('/');
                    //     //$rootScope.mypageloading = false;

                    // }, function myError(error) {
                    //     $location.path('/login');
                    //     $rootScope.mypageloading = false;
                    // });


                    //alert('Your session has expired! Please login again.');
                    // $rootScope.firebaseUser.getToken(true).then(function (result) {});
                    // $location.path('/login');
                }

            }
            else if (response.status == '500' || response.status == '-1') {

                $rootScope.global.error = 'Error connecting server, please try again after sometime.';
            }
            else if (response.status == '400') {
                if (response.data == null || response.data == '' || response.data == undefined)
                    response.data = 'Oops something went wrong, please try again after sometime';
            }
            else if (response.status == '404') {
                response.data = 'Bad request.';
            }



            if (response == null || response == '' || response == undefined || response.data == null || response.data == '' || response.data == undefined) {
                FlashService.Error('Oops, something went wrong! Please login again.');
            }
            else {
                FlashService.Error(response.data);
            }

            return { success: false, data: response.data };
        }
    }

);