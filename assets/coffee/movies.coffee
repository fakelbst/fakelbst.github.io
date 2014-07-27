$ = jQuery

bgdetail = ->
  $('#detail').addClass('site-bg')

$('#detail').on "click", ->
  $(@).removeClass('site-bg')
  return

$(document).keyup (e) ->
  if e.keyCode is 27 && $('.site-bg').length > 0
    $('#detail').removeClass('site-bg')
  return


