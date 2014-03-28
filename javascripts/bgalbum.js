var $, circle, elem, group, rainbowArray, rainbowColor, rect, two;

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
    $(".back").css('background-color', rainbowArray[Math.floor(Math.random() * 7)]);
    return $(".back").css('opacity', '0.8');
  });
});

elem = document.getElementById("draw-animation");

two = new Two().appendTo(elem);

circle = two.makeCircle(-70, 0, 50);

rect = two.makeRectangle(70, 0, 100, 100);

circle.fill = "#FF8000";

rect.fill = "rgba(0, 200, 255, 0.75)";

group = two.makeGroup(rect);

group.translation.set(two.width / 2, two.height / 2);

group.scale = 0;

group.noStroke();

two.bind("update", function(frameCount) {
  var t;
  if (group.scale > 0.9999) {
    group.scale = group.rotation = 0;
  }
  t = (1 - group.scale) * 0.1;
  group.scale += t;
  group.rotation += t * 4 * Math.PI;
}).play();
