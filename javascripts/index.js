var APIkey, Limit, User, url;

APIkey = "4dff88a0423651b3570253b10b745b2c";

User = "fakelbst";

Limit = 52;

url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + User + "&period=12month&api_key=" + APIkey + "&format=json&limit=" + Limit + "&page=" + 1 + "&callback=?";

require.config({
  baseUrl: "../js/lib",
  waitSeconds: 20,
  paths: {
    jquery: "jquery-1.10.2.min",
    image: "image",
    async: "async"
  }
});

require(["jquery", "async!" + url], function($, datas) {
  var albums, i, imageUrl;
  albums = datas.topalbums.album;
  i = 0;
  while (i < albums.length) {
    if (albums[i].image[3]['#text'] !== "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png") {
      imageUrl = albums[i].image[3]['#text'];
      require(["image!" + imageUrl], function(awesome) {
        var wrapper;
        wrapper = document.getElementsByClassName("albums")[0];
        wrapper.appendChild(awesome);
      });
    }
    i++;
  }
});
