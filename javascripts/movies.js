var $, a;

$ = jQuery;

for (a in movies) {
  $('.movies').append('<a href="#">' + a + '</a>');
}
