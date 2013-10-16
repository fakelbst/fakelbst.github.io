var $, APIkey, User, getData, j;

$ = jQuery;

APIkey = "4dff88a0423651b3570253b10b745b2c";

User = "fakelbst";

j = 1;

getData = function(page) {
  var albums, i, url;
  i = 0;
  console.log(i);
  albums = [];
  url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + User + "&period=12month&api_key=" + APIkey + "&format=json&limit=" + 50 + "&page=" + page + "&callback=?";
  return $.getJSON(url, function(data) {
    return $(data.topalbums.album).each(function() {
      var markup;
      if (this.image[this.image.length - 1]["#text"] !== "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png") {
        markup = $("<div class='album'><div class='front'><img class='lazy' height='200px' width='200px' src='/images/transparent.gif' data-original='" + this.image[3]['#text'] + "'></img></div><div class='back'><h5>" + this.artist.name + "</h5><h6>" + this.name + "</h6></div></div>");
        return $('.albums').append(markup);
      }
    });
  });
};

getData(1);
