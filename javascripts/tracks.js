var recentTracks, url;

this.myApp = angular.module('myApp', []);

this.myApp.config([
  '$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }
]);

url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=fakelbst&api_key=4dff88a0423651b3570253b10b745b2c&format=json&limit=50&extended=1';

recentTracks = function($scope, $http) {
  $scope.loadImages = function() {
    console.log('ssssssss');
    $http({
      method: "GET",
      url: url
    }).success(function(data, status, headers, config) {
      $scope.datas = data.recenttracks.track;
    }).error(function(data, status, headers, config) {});
  };
  $scope.loadImages();
};

this.myApp.directive("scroller", function() {
  return function(scope, elem, attrs) {
    var rawElement;
    rawElement = elem[0];
    console.log(rawElement);
    console.log(elem);
    $(window).bind("scroll", function() {
      console.log(33321);
      if ((rawElement.scrollTop + rawElement.offsetHeight + 5) >= rawElement.scrollHeight) {
        scope.$apply("loadImages()");
      }
    });
  };
});
