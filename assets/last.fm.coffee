$ = jQuery

APIkey = "4dff88a0423651b3570253b10b745b2c"
User = "fakelbst"
j = 1

getData = (page) ->
  i = 0
  console.log i
  albums = []
  url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + User + "&period=12month&api_key=" + APIkey + "&format=json&limit=" + 50 + "&page=" + page + "&callback=?"
  $.getJSON url, (data) ->
    $(data.topalbums.album).each ->
      if @image[@image.length - 1]["#text"] isnt "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png"
        markup = $("<div class='album'><div class='front'><img class='lazy' height='200px' width='200px' src='/images/transparent.gif' data-original='" + @image[3]['#text'] + "'></img></div><div class='back'><h5>" + @artist.name + "</h5><h6>" + @name + "</h6></div></div>")
        $('.albums').append markup

    # $("img.lazy").lazy 
    #   effect: "fadeIn"
    #   effectTime: 1000
    #   onLoad: (element) ->
    #     i++
    #     console.log i
    #     if i > 40
    #       getData(2)

getData(1)

# $("img.lazy").lazyload()

