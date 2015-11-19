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
					var dom = ' <div class="item">'+
									'<img src="'+ self.baseImgSrc + val.imgsrc +'">'+
									'<div class="mask"></div>'+
									'<div class="mem-intro">'+
										'<p class="name">'+ val.name +'</p>'+
										'<p class="more" onClick="location.href=\'about-mem.html?id='+ val.id +'\'">More Things</p>'+
									'</div>'+
								'</div>';
					self.picWall.append(dom);
				});
				// self.picWall.find('.item').hover(function(){
				// 	$(this).find('.mem-intro').fadeIn();
				// },function(){
				// 	$(this).find('.mem-intro').fadeOut();
				// });
			});
		}
	};
	var picwall = new PicWall();
})(jQuery);
