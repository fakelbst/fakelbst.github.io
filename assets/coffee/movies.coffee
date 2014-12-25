$ = jQuery

bgdetail = ->
  $('#detail').addClass('site-bg')
  return

$('#detail').on "click", ->
  $(@).removeClass('site-bg')
  return

$(document).keyup (e) ->
  if e.keyCode is 27 && $('.site-bg').length > 0
    $('#detail').removeClass('site-bg')
  return

jQuery ($) ->
  Apikey = 'dbbe52bb8e34a312e6c564b375a159f0'
  # http://api.themoviedb.org/3/movie/9778?api_key=dbbe52bb8e34a312e6c564b375a159f0
  $('.movie a').each (i) ->
    id = $(@).attr 'data-value'
    url = 'http://api.themoviedb.org/3/movie/' + id + '?api_key=' + Apikey
    that = $(@)
    $.getJSON url, (data) ->
      console.log data

      $(that).parent('section').append '<p>' + data.overview + '</p>'

