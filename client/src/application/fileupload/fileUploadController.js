app.controller('fileUploadController', function ($rootScope, $http, FlashService, $scope, HttpService) {

    FlashService.Error('');
    FlashService.Success('');



    getData();

    // The controller callback function
    $scope.uploadFile =  function() {
               
     var file = $scope.myFile;
     var fd = new FormData();
     fd.append('myfile', file);
     console.log('file is ' );
     console.dir(file);
     var uploadUrl = $rootScope.serverURL + "/data/upload";
     return $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    }).success(function (data) {
      alert('success')
      $scope.myFile = null;
      getData();
      })
      .error(function (data, status) {
      alert('fail')

      });
    };

    function getData() {
        var requestHandle = HttpService.HttpGetData($rootScope.serverURL  + '/data');
        requestHandle.then(function (result) {
            $rootScope.mypageloading = false;
            if (result.success) {
                $scope.data_list = result.data;
            }
        });
    }

});