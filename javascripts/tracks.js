var loadedMark, page, recentTracks, url;

this.myApp = angular.module('myApp', []);

this.myApp.config([
  '$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }
]);

loadedMark = 0;

page = 1;

url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=fakelbst&api_key=4dff88a0423651b3570253b10b745b2c&format=json&limit=50&extended=1&page=';

recentTracks = function($scope, $http) {
  $scope.datas = [];
  $scope.loadImages = function() {
    $http({
      method: "GET",
      url: url + page
    }).success(function(data, status, headers, config) {
      $scope.datas = $scope.datas.concat(data.recenttracks.track);
      loadedMark = 0;
      page++;
    }).error(function(data, status, headers, config) {});
  };
  $scope.loadImages();
};

this.myApp.directive("scroller", function() {
  return function(scope, elem, attrs) {
    var rawElement;
    rawElement = elem[0];
    $(window).bind("scroll", function() {
      if (($(window).scrollTop() + 600) >= rawElement.scrollHeight && loadedMark === 0) {
        scope.$apply("loadImages()");
        loadedMark = 1;
      }
    });
  };
});
