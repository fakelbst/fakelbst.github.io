var douban = function(){

    var doubanUrl = 'http://api.douban.com/shuo/v2/statuses/user_timeline/wber';

    $.getJSON(doubanUrl, function(data){
        console.log(data);
    });
}
