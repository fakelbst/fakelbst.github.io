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
