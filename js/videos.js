;(function($){
	var Videos = function(){
		this.videosBox = $('#part-video');
		this.videosBox.css({
			'width':$(window).width()-500
		});
	};
	Videos.prototype = {}
	var videos = new Videos();
})(jQuery);