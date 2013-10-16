/*
 * jQuery.last.fm
 *
 * A jQuery plugin that populates the given element with
 * album artwork based upon the given parameters. At this time,
 * only for top albums.
 *
 * Copyright © 2013 Alex Cash
 * Dual licensed under the MIT and GPL licenses.
 */

(function( $ ) {
	$.fn.lfm = function(options){
		var settings = $.extend({

			APIkey:		null,
			User:		null,
			limit:		100,
			period:		"12month"	// [string] overall | 7day | 1month | 3month | 6month | 12month the period of time for which to retrieve top albums
		}, options);

		var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + settings.User + "&period=" + settings.period + "&api_key=" + settings.APIkey + "&format=json&limit=" + settings.limit +"&callback=?";
		//var url = "serverFixture.json"; //turn this on to try wihtout an api key or user
		var albums = [];

		function isLoaded (albumElement) {

			for (var i = 0; i < albums.length; i++){
				var markup = $("<div class='album'><div class='front'><img height='200px' width='200px' src='" + albums[i].art + "'></img></div><div class='back'><h5>" + albums[i].artist + "</h5><h6>" + albums[i].name + "</h6></div></div>");
				//var markup = $("<img height='200px' width='200px' src='" + albums[i].art + "'>");
				albumElement.append(markup);
			}
		}

		return this.each(function(){
			var $this = $(this);
			$.getJSON( url, function(data){
				$(data.topalbums.album).each(function(){
					if(this.image[this.image.length-1]["#text"] !== 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png'){
                        albums.push ({
                            name:	this.name,
                            artist: this.artist.name,
                            //played: this.playcount,
                            //art:	this.image[this.image.length-1]["#text"]
                            art:	this.image[3]["#text"]
                        });
                    }
				});
				isLoaded($this);
			});
		});
	};
})( jQuery );

$('.albums').lfm({
	APIkey: "4dff88a0423651b3570253b10b745b2c",
	User: "fakelbst"
});
