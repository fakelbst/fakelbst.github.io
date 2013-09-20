var douban = function(){

    var doubanUrl = 'http://api.douban.com/shuo/v2/statuses/user_timeline/wber?alt=xd&callback=?';

    $.getJSON(doubanUrl, function(data){
        console.log(data);
    });
}

var tumblr = function(){

    var tumblrUrl = 'http://api.tumblr.com/v2/blog/fakelbst.tumblr.com/posts?callback=?',
        apiKey = 'sPqRaIY7bBbKgIdD8MutLOAAU038xZKZ10u0p9QtQ0uh7Qc6Rd'

    $.getJSON(tumblrUrl,{api_key: apiKey, limit: 20}, function(data){
        console.log(data);
    });
}

var twitter = function(){
    var cb = new Codebird;
    var key = 'XafFt0iCQpMmBgpY82mWPg';
    var sec = 'RvJXDhFk7XYLdigAGyNDn49iLVL3K72o5VYOv9REA';
    var ato = '416526409-mTNHoColey7XWOBBxbZiXkM6p48ZDj66R3sWOyOr';
    var ats = '8j8PE3eXjDPb579ZVD5sAAMVSK6foXQOEjW1DWkmQ';
    cb.setConsumerKey(key, sec);
    cb.setToken(ato, ats);
    cb.__call(
        "statuses_userTimeline",
        {
        screen_name: "fakelbst"
        },
        function (reply) {
            console.log(reply);
        }
    );
}

var facebook = function(){

}

var github = function(){

    var githubUrl = 'https://api.github.com/users/fakelbst/events';
    

}
var instagram = function(){

    var instagramUrl = 'https://api.instagram.com/v1/users/287140978/media/recent/?access_token=287140978.f316052.2c964e349edc4fc7b2497e60ca88f2c3';
    //id: 287140978
}
