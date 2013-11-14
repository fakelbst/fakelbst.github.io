var $, APIkey, User, getData, j, totalpage;

$ = jQuery;

APIkey = "4dff88a0423651b3570253b10b745b2c";

User = "fakelbst";

j = 1;

totalpage = 0;

getData = function(page) {
  var albums, url;
  albums = [];
  url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + User + "&period=12month&api_key=" + APIkey + "&format=json&limit=" + 30 + "&page=" + page + "&callback=?";
  return $.getJSON(url, function(data) {
    if (totalpage === 0) {
      totalpage = data['topalbums']['@attr']['totalPages'];
      return getData(j);
    } else {
      return $(data.topalbums.album).each(function() {
        var lastdata, markup;
        if (this.image[this.image.length - 1]["#text"] !== "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png") {
          markup = $("<div class='album'><div class='front'><img class='lazy' height='200px' width='200px' src='/images/transparent.gif' data-src='" + this.image[3]['#text'] + "'></img></div><div class='back'><h5>" + this.artist.name + "</h5><h6>" + this.name + "</h6></div></div>");
          $('.albums').append(markup);
          $('.albums').find('.album').hover(function() {
            return $(this).addClass('coverhover');
          }, function() {
            return $(this).removeClass('coverhover');
          });
          lastdata = data;
          return $("img.lazy").lazy({
            effect: "fadeIn",
            effectTime: 1000
          });
        }
      });
    }
  });
};

getData(j);

$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height() && j < totalpage) {
    j++;
    return getData(j);
  }
});
