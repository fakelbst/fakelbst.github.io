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

			APIkey:		null,			// [string] required in order to retrieve content from last.fm
			User:			null,			// [string] required username to retrieve data for
			Behavior:	"hover",	// [string] controls detail content behavior. can be changed to 'click'
			limit:		1000,				// [integer] the number of albums you'd like to show. max of 50
			period:		"12month"	// [string] overall | 7day | 1month | 3month | 6month | 12month the period of time for which to retrieve top albums
		}, options);

		var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + settings.User + "&period=" + settings.period + "&api_key=" + settings.APIkey + "&format=json&limit=" + settings.limit +"&callback=?";
		//var url = "serverFixture.json"; //turn this on to try wihtout an api key or user
		var albums = [];

		function isLoaded (albumElement) {

			for (var i = 0; i < albums.length; i++){
				var markup = $("<div class='album'><div class='front'><img height='200px' width='200px' src='" + albums[i].art + "'></div><div class='back'><h5>" + albums[i].artist + "</h5><h6>" + albums[i].name + "</h6></div></div>");
				//var markup = $("<img height='200px' width='200px' src='" + albums[i].art + "'>");
				albumElement.append(markup);
			}
/*
			if (settings.Behavior == "hover") {
				albumElement.find('.album').hover(function(){
					$(this).addClass('flip');
				},function(){
					$(this).removeClass('flip');
				});
			} else {
				$(document).bind('click', function (e) {
					$('.flip').removeClass('flip');
				});

				albumElement.find('.album').click(function(e){
					e.stopPropagation();
					if($('.flip')[0] === this){
						$(this).removeClass('flip');
					} else {
						$('.flip').removeClass('flip');
						$(this).addClass('flip');
					}
				});
			}
            */
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
