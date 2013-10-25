$ = jQuery

APIkey = "4dff88a0423651b3570253b10b745b2c"
User = "fakelbst"
j = 1
totalpage = 0

getData = (page) ->
  albums = []
  url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + User + "&period=12month&api_key=" + APIkey + "&format=json&limit=" + 30 + "&page=" + page + "&callback=?"
  $.getJSON url, (data) ->
    if totalpage == 0
      totalpage = data['topalbums']['@attr']['totalPages']
      getData(j)
    else
      $(data.topalbums.album).each ->
        if @image[@image.length - 1]["#text"] isnt "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png"
          markup = $("<div class='album'><div class='front'><img class='lazy' height='200px' width='200px' src='/images/transparent.gif' data-src='" + @image[3]['#text'] + "'></img></div><div class='back'><h5>" + @artist.name + "</h5><h6>" + @name + "</h6></div></div>")
          $('.albums').append markup
          lastdata = data
          $("img.lazy").lazy
            effect: "fadeIn"
            effectTime: 1000

getData(j)

$(window).scroll ->
  if $(window).scrollTop() == $(document).height() - $(window).height() and j < totalpage
    j++
    getData(j)
