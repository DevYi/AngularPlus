app.controller("MovieCtrl", ['$scope','$http',function($scope,$http) {
        
    $scope.pageChanged = function() {
      var url = rootUrl + $scope.type + '?'+ callBack + '&start=' + $scope.currentPage;
      loading(url);   
    };

    $scope.maxSize = 5;
    $scope.currentPage = 1;


    $scope.types = ['in_theaters','coming_soon','top250','search?q=']
    $scope.type = $scope.types[0];
    var rootUrl = 'https://api.douban.com/v2/movie/';
    var callBack = 'callback=doubanMovieCallback&count=3';
    var url = rootUrl + $scope.type + '?'+ callBack;

    $scope.go = function(id) {
      $scope.type = $scope.types[id];
      var url = rootUrl + $scope.type + '?'+ callBack;
      loading(url);   
      $scope.currentPage = 1;
    };

    $scope.search = function() {
      $scope.type = $scope.types[3]+ $scope.text;
      var url = rootUrl + $scope.type +'&'+ callBack;
      loading(url);   
      $scope.currentPage = 1;
    }

    $scope.pageChanged = function() {
      var url = rootUrl + $scope.type + '?'+ callBack + '&start=' + $scope.currentPage;
      loading(url);   
    };

    //加载页面
    var loading = function(url){
        $scope.successed = true;
        window.doubanMovieCallback = function(data) {
              if (data.msg) {
                // 有错误信息产生；
                $scope.message = data.msg;
              } else {
                $scope.message = '';
                $scope.movies = data;
                $scope.totalItems = data.total;
                $scope.bigTotalItems = data.total * 10 / 3;
              }
              $scope.successed = false;
            };

        $http.jsonp(url).error(function() {
              // $scope.totalItems = 0;
            });
      };

      loading(url);
}]);




       
