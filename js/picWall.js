;(function($){
	var PicWall = function(){
		var self = this;
		this.picWall = $('#picWall');
		this.baseImgSrc = '../dist/imgs/member/';
		this.render();
	};
	PicWall.prototype = {
		render:function(){
			var self = this;
			$.getJSON('../dist/data/member.json',function(data){
				$.each(data,function(i,val){
					self.picWall.append('<div class="item"  title="'+ val.id +'"><img src="'+ self.baseImgSrc + val.imgsrc +'" onClick="location.href=\'about-mem.html?id='+ val.id +'\'"></div>')
				});
			});
		}
	};
	var picwall = new PicWall();
})(jQuery);
