var recentTracks, url;

this.myApp = angular.module('myApp', []);

this.myApp.config([
  '$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }
]);

url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=fakelbst&api_key=4dff88a0423651b3570253b10b745b2c&format=json&limit=50';

recentTracks = function($scope, $http) {
  $http({
    method: "GET",
    url: url
  }).success(function(data, status, headers, config) {
    $scope.datas = data.recenttracks.track;
  }).error(function(data, status, headers, config) {});
};
