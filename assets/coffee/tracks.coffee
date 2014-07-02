@myApp = angular.module('myApp', [])
@myApp.config ['$interpolateProvider', ($interpolateProvider)->
  $interpolateProvider.startSymbol('{(').endSymbol(')}')
]

loadedMark = 0
page = 1

url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=fakelbst&api_key=4dff88a0423651b3570253b10b745b2c&format=json&limit=50&extended=1&page='

recentTracks = ($scope, $http) ->
  $scope.datas = []
  $scope.loadImages = ->
    $http(
      method: "GET"
      url: url + page
    ).success((data, status, headers, config) ->
      $scope.datas = $scope.datas.concat data.recenttracks.track
      loadedMark = 0
      page++
      return
    ).error (data, status, headers, config) ->
      return
    return
  $scope.loadImages()
  return

@myApp.directive "scroller", ->
  (scope, elem, attrs) ->
    rawElement = elem[0]
    $(window).bind "scroll", ->
      if ($(window).scrollTop() + 600) >= rawElement.scrollHeight and loadedMark == 0
        scope.$apply "loadImages()" 
        loadedMark = 1
      return
    return

