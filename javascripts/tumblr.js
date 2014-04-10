var $;

$ = jQuery;

$.getJSON("http://api.tumblr.com/v2/blog/fakelbst.tumblr.com/posts?callback=?", {
  api_key: "sPqRaIY7bBbKgIdD8MutLOAAU038xZKZ10u0p9QtQ0uh7Qc6Rd",
  limit: 15
}, function(data) {
  $.each(data.response.posts, function(i, post) {
    var pdate;
    pdate = post.date;
    pdate = pdate.substring(0, pdate.length - 4);
    $("<div class='photos'>").append("<a href=" + post.source_url + "><img src=" + post.photos[0].alt_sizes[0].url + "></a>").append("<a href=" + post.source_url + ">" + post.source_title + "<a/>").append("<p>" + pdate + "</p>").appendTo(".tumblrposts");
  });
});
