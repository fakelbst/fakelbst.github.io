var $, bgdetail;

$ = jQuery;

bgdetail = function() {
  return $('#detail').addClass('site-bg');
};

$('#detail').on("click", function() {
  $(this).removeClass('site-bg');
});

$(document).keyup(function(e) {
  if (e.keyCode === 27 && $('.site-bg').length > 0) {
    $('#detail').removeClass('site-bg');
  }
});
