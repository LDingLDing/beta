;(function($){
	var BtnSound = function(bodybox){
		var self = this;
		this.alllink = $('a');
		this.bodyBox = $('body');


		var dom = 	'<audio preload="auto" id="myAudio" width="0" height="0">'+
						'<source src="../links/btn.mp3" type="audio/mp3" />'+
						'<source src="../links/btn.ogg" type="audio/ogg" />'+
						'<embed src="../links/btn.mp3" hidden="true"/>'+
					'</audio>'
		this.bodyBox.append(dom);
		this.audio =  document.getElementById('myAudio');
		this.alllink.hover(function(){
			self.audio.play();
		},function(){});
		$('body').click(function(){
			self.audio.play();
		});

	};
	var btnsound = new BtnSound();
})(jQuery);