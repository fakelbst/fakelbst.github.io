var $, generate, make, particles, radius, rainbowArray, rainbowColor, two, uupdate;

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
    a = make();
    return uupdate(a);
  });
});

uupdate = function(a) {
  a.velocity = new Two.Vector(Math.random() * 10, Math.random() * 10);
  a.velocity.rotation = Math.random() * Math.PI / 8;
  a.velocity.scale = Math.random() * 2;
  a.velocity.phase = 0;
  a.velocity.frequency = Math.random() * Math.PI / 32;
  a.rect = a.getBoundingClientRect();
  a.translation.set(two.width / 2, two.height / 2);
  a.fill = rainbowArray[Math.floor(Math.random() * rainbowArray.length)];
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

two.bind("update", function(frameCount) {
  _.each(particles, function(particle) {
    var h, w;
    particle.scale = particle.velocity.scale * Math.sin(particle.velocity.phase % Math.PI) + 0.5;
    particle.velocity.phase += particle.velocity.frequency;
    w = particle.scale * particle.rect.width / 2;
    h = particle.scale * particle.rect.height / 2;
    particle.translation.addSelf(particle.velocity);
    if ((particle.translation.x < w && particle.velocity.x < 0) || (particle.translation.x > two.width - w && particle.velocity.x > 0)) {
      particle.velocity.x *= -1;
    }
    if ((particle.translation.y < h && particle.velocity.y < 0) || (particle.translation.y > two.height - h && particle.velocity.y > 0)) {
      return particle.velocity.y *= -1;
    }
  });
}).play();
