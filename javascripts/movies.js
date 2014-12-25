var $, bgdetail;

$ = jQuery;

bgdetail = function() {
  $('#detail').addClass('site-bg');
};

$('#detail').on("click", function() {
  $(this).removeClass('site-bg');
});

$(document).keyup(function(e) {
  if (e.keyCode === 27 && $('.site-bg').length > 0) {
    $('#detail').removeClass('site-bg');
  }
});

jQuery(function($) {
  var Apikey;
  Apikey = 'dbbe52bb8e34a312e6c564b375a159f0';
  return $('.movie a').each(function(i) {
    var id, that, url;
    id = $(this).attr('data-value');
    url = 'http://api.themoviedb.org/3/movie/' + id + '?api_key=' + Apikey;
    that = $(this);
    return $.getJSON(url, function(data) {
      console.log(data);
      return $(that).parent('section').append('<p>' + data.overview + '</p>');
    });
  });
});
