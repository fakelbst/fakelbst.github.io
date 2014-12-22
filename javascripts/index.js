var APIkey, Limit, Page, Period, User, url;

APIkey = "4dff88a0423651b3570253b10b745b2c";

User = "fakelbst";

Limit = 78;

Page = 1;

Period = 'overall';

url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + User + "&period=" + Period(+"&api_key=" + APIkey + "&format=json&limit=" + Limit + "&page=" + Page + "&callback=?");

require.config({
  baseUrl: "../javascripts/lib",
  waitSeconds: 20,
  paths: {
    jquery: "jquery-1.10.2.min",
    image: "image",
    async: "async"
  }
});

require(["jquery", "async!" + url], function($, datas) {
  var albums, i, imageUrl, markup;
  albums = datas.topalbums.album;
  i = 0;
  while (i < albums.length) {
    if (albums[i].image[3]['#text'] !== "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png") {
      imageUrl = albums[i].image[3]['#text'];
      markup = "<div class='album'><div class='front'><img height='175px' width='175px' src='" + imageUrl + "'></img></div><div class='back'><h5>" + albums[i].artist.name + "</h5><h6>" + albums[i].name + "</h6></div></div>";
      $('.albums').append(markup);
    }
    i++;
    $('.albums').find('.album').hover(function() {
      return $(this).addClass('coverhover');
    }, function() {
      return $(this).removeClass('coverhover');
    });
  }
});
