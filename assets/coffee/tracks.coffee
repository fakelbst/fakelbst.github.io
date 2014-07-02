@myApp = angular.module('myApp', [])

@myApp.config ['$interpolateProvider', ($interpolateProvider)->
  $interpolateProvider.startSymbol('{(').endSymbol(')}')
]

url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=fakelbst&api_key=4dff88a0423651b3570253b10b745b2c&format=json&limit=50&extended=1'

recentTracks = ($scope, $http) ->
  $scope.loadImages = ->
    console.log 'ssssssss'
    $http(
      method: "GET"
      url: url
    ).success((data, status, headers, config) ->
      $scope.datas = data.recenttracks.track
      return
    ).error (data, status, headers, config) ->
      return
    return
  $scope.loadImages()
  return

@myApp.directive "scroller", ->
  (scope, elem, attrs) ->
    rawElement = elem[0]
    console.log rawElement
    console.log elem
    $(window).bind "scroll", ->
      console.log 33321
      scope.$apply "loadImages()"  if (rawElement.scrollTop + rawElement.offsetHeight + 5) >= rawElement.scrollHeight
      return

    return

