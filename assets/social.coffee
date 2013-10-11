$ = jQuery
douban = ->
    doubanUrl = "http://api.douban.com/shuo/v2/statuses/user_timeline/wber?alt=xd&callback=?"
    $.getJSON doubanUrl, (data) ->
        console.log data

tumblr = ->
  tumblrUrl = "http://api.tumblr.com/v2/blog/fakelbst.tumblr.com/posts?callback=?"
  apiKey = "sPqRaIY7bBbKgIdD8MutLOAAU038xZKZ10u0p9QtQ0uh7Qc6Rd"
  $.getJSON tumblrUrl,
    api_key: apiKey
    limit: 20
  , (data) ->
    console.log data

twitter = ->
  cb = new Codebird
  key = "XafFt0iCQpMmBgpY82mWPg"
  sec = "RvJXDhFk7XYLdigAGyNDn49iLVL3K72o5VYOv9REA"
  ato = "416526409-mTNHoColey7XWOBBxbZiXkM6p48ZDj66R3sWOyOr"
  ats = "8j8PE3eXjDPb579ZVD5sAAMVSK6foXQOEjW1DWkmQ"
  cb.setConsumerKey key, sec
  cb.setToken ato, ats
  cb.__call "statuses_userTimeline",
    screen_name: "fakelbst"
  , (reply) ->
    console.log reply

facebook = ->
# feed: http://fbrss.com/f/d1d598d2e12811e7f42e1c0826798a43.xml

github = ->
  githubUrl = "https://api.github.com/users/fakelbst/events"

instagram = ->
#id: 287140978

$.each $('.post_content'), (index, ele) ->
    for i in $(ele).children()
        console.log i
