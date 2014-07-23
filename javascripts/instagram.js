var count, url;

count = 50;

url = "https://api.instagram.com/v1/users/287140978/media/recent/?client_id=f316052a8b2749dbb3b80beab72a29a2&count=" + count;

require.config({
  baseUrl: "../javascripts/lib",
  waitSeconds: 20,
  paths: {
    jquery: "jquery-1.10.2.min",
    async: "async",
    slick: "slick.min"
  }
});

require(["jquery", "slick", "async!" + url], function($, slick, datas) {
  var data, i, medias, tag;
  i = 0;
  medias = datas.data;
  while (i < medias.length) {
    data = medias[i];
    if (data.type === 'video') {
      tag = '<video width="500" height="500" controls><source src="' + data.videos.standard_resolution.url + '" type="video/mp4"></video>';
    } else if (data.type === 'image') {
      tag = '<img width="500" height="500" src="' + data.images.standard_resolution.url + '"/>';
    }
    $('.slider').append('<div>' + tag + '</div>');
    i++;
  }
  return $('.slider').slick({
    lazyLoad: 'ondemand',
    speed: 500,
    fade: true
  });
});
