var $, douban, facebook, github, instagram, tumblr, twitter;

$ = jQuery;

douban = function() {
  var doubanUrl;
  doubanUrl = "http://api.douban.com/shuo/v2/statuses/user_timeline/wber?alt=xd&callback=?";
  return $.getJSON(doubanUrl, function(data) {
    return console.log(data);
  });
};

tumblr = function() {
  var apiKey, tumblrUrl;
  tumblrUrl = "http://api.tumblr.com/v2/blog/fakelbst.tumblr.com/posts?callback=?";
  apiKey = "sPqRaIY7bBbKgIdD8MutLOAAU038xZKZ10u0p9QtQ0uh7Qc6Rd";
  return $.getJSON(tumblrUrl, {
    api_key: apiKey,
    limit: 20
  }, function(data) {
    return console.log(data);
  });
};

twitter = function() {
  var ato, ats, cb, key, sec;
  cb = new Codebird;
  key = "XafFt0iCQpMmBgpY82mWPg";
  sec = "RvJXDhFk7XYLdigAGyNDn49iLVL3K72o5VYOv9REA";
  ato = "416526409-mTNHoColey7XWOBBxbZiXkM6p48ZDj66R3sWOyOr";
  ats = "8j8PE3eXjDPb579ZVD5sAAMVSK6foXQOEjW1DWkmQ";
  cb.setConsumerKey(key, sec);
  cb.setToken(ato, ats);
  return cb.__call("statuses_userTimeline", {
    screen_name: "fakelbst"
  }, function(reply) {
    return console.log(reply);
  });
};

facebook = function() {};

github = function() {
  var githubUrl;
  return githubUrl = "https://api.github.com/users/fakelbst/events";
};

instagram = function() {};

$.each($('.post_content'), function(index, ele) {
  var i, _i, _len, _ref, _results;
  _ref = $(ele).children();
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    i = _ref[_i];
    _results.push(console.log(i));
  }
  return _results;
});
