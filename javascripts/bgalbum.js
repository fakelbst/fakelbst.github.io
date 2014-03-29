var $, circle, generate, make, particles, polygon, radius, rainbowArray, rainbowColor, rect, two, uupdate;

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
    var a;
    $(".back").css('background-color', rainbowArray[Math.floor(Math.random() * 7)]);
    $(".back").css('opacity', '0.95');
    a = make();
    return uupdate(a);
  });
});

uupdate = function(a) {
  var h, w;
  a.velocity = new Two.Vector(Math.random() * 10, Math.random() * 10);
  a.velocity.rotation = Math.random() * Math.PI / 8;
  a.velocity.scale = Math.random() * 2;
  a.velocity.phase = 0;
  a.velocity.frequency = Math.random() * Math.PI / 32;
  a.rect = a.getBoundingClientRect();
  a.translation.set(two.width / 2, two.height / 2);
  w = a.scale * a.rect.width / 2;
  h = a.scale * a.rect.height / 2;
  a.translation.addSelf(a.velocity);
  if ((a.translation.x < w && a.velocity.x < 0) || (a.translation.x > two.width - w && a.velocity.x > 0)) {
    console.log(333);
    a.velocity.x *= -1;
  }
  if ((a.translation.y < h && a.velocity.y < 0) || (a.translation.y > two.height - h && a.velocity.y > 0)) {
    console.log(44);
    a.velocity.y *= -1;
  }
  two.scene.add(a);
  return particles.push(a);
};

radius = 50;

particles = [];

generate = function(amount) {
  var r;
  r = Math.random() * radius + radius / 2;
  return _.map(_.range(amount), function(i) {
    var anchor, angle, pct, x, y;
    pct = i / amount;
    angle = pct * Math.PI * 2;
    x = r * Math.cos(angle);
    y = r * Math.sin(angle);
    anchor = new Two.Anchor(x, y);
    anchor.origin = new Two.Vector().copy(anchor);
    return anchor;
  });
};

make = function() {
  var points, poly;
  points = generate(3);
  poly = new Two.Polygon(points, true);
  return poly;
};

two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

circle = two.makeCircle(72, 100, 50);

rect = two.makeRectangle(213, 100, 100, 100);

polygon = two.makePolygon(500, 500, 300, 400, 500, 300, false);

circle.fill = "#FF8000";

circle.stroke = "orangered";

circle.linewidth = 5;

rect.fill = "rgb(0, 200, 255)";

rect.opacity = 0.75;

rect.noStroke();

polygon.fill = "#151811";

polygon.stroke = "#8FB8CA";

polygon.linewidth = 7;
