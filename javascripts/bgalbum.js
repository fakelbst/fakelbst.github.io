var $, rainbowArray, rainbowColor;

$ = jQuery;

rainbowColor = {
  red: '#FF0000',
  yellow: '#FFFF00',
  green: '#00FF00',
  blue: '#0000FF',
  indigo: '#4B0082',
  violet: '#8B00FF'
};

rainbowArray = ['#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

$(document).ready(function() {
  $('.nav').hide();
  return $("body").keypress(function() {
    $("#back").css('background-color', rainbowArray[Math.floor(Math.random() * 7)]);
    return $("#back").css('opacity', '0.8');
  });
});
