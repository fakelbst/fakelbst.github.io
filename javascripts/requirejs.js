var APIkey, User, url;

APIkey = "4dff88a0423651b3570253b10b745b2c";

User = "fakelbst";

url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + User + "&period=12month&api_key=" + APIkey + "&format=json&limit=" + 50 + "&page=" + 1 + "&callback=?";

require.config({
  baseUrl: "../js/lib",
  waitSeconds: 45,
  paths: {
    image: "image",
    async: "async"
  }
});

require(["async!" + url], function(datas) {
  var albums, i, imageUrl;
  console.log(datas.topalbums.album[0].image[3]['#text']);
  albums = datas.topalbums.album;
  i = 0;
  while (i < albums.length) {
    imageUrl = albums[i].image[3]['#text'];
    require(["image!" + imageUrl], function(awesome) {
      var wrapper;
      wrapper = document.getElementById("wrapper");
      wrapper.appendChild(awesome);
    });
    i++;
  }
});
