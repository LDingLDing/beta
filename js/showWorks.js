;(function($){
	var ShowWorks = function(){
		var self = this;
		this.showWorksbox = $('#showWorks');
		this.container = this.showWorksbox.find('.container');
		this.leftContainer = this.container.find('.left-container');
		this.rightContainer = this.container.find('.right-container');
		this.leftboxWid = parseInt(this.showWorksbox.find('.bg-art').css('width'));
		this.rightboxWid = $(window).width()-this.leftboxWid-4-160;
		this.pageID = 1;
		if($(window).width() < 1200){
			this.renderPlayB();
		}else {
			this.renderPlayA();
		}
		this.rightContainer.find('.buttons').find('.btn-prev').click(function(){
			if(self.pageID > 1){
				self.pageID -= 1;
				self.renderDom();
			}
		});
		this.rightContainer.find('.buttons').find('.btn-next').click(function(){
			if(self.pageID < self.maxPageID){
				self.pageID += 1;
				self.renderDom();
			}
		});
	};
	ShowWorks.prototype = {
		renderPlayA:function(){
			var self = this;
			this.leftContainer.css({
				'width':self.leftboxWid,
				'paddingLeft':'100px',
			});
			this.blockCount = parseInt(($(window).height() - 74)/222);
			this.rightContainer.css({
				'width':self.rightboxWid
			});
			this.renderDom();
		},
		renderPlayB:function(){
			var self = this;
			this.blockCount = parseInt(($(window).width()-310)/340);
			this.leftContainer.find('h1').css({
				'fontSize':'24px',
				'marginBottom':'30px'
			});
			this.leftContainer.css({
				'display':'block',
				'textAlign':'center'
			});
			this.rightContainer.css({
				'display':'block'
			});
			this.rightContainer.find('.blocks').css({
				'width':this.blockCount*(326+30)
			});
			this.rightContainer.find('.buttons').find('.btn-prev').css({
				'marginLeft':'0'
			})
			this.renderDom();
		},
		renderDom:function(){
			var self = this;
			$.ajax({
				url:'../dist/data/works.json',
				dataType:'json'
			}).done(function(data){
				self.maxPageID = Math.ceil(data.length/self.blockCount);
				var dom = "";
				$.each(data,function(i,val){
					if(i+1 > (self.pageID-1)*self.blockCount && i+1 <= self.pageID*self.blockCount ){
						dom +=  '<div class="block">'+
									'<div class="block-side1"><img src="'+ val.imgsrc +'"></div>'+
									'<div class="block-side2">'+ val.name +'</div>'+
								'</div>'
					}
				});
				self.rightContainer.find('.blocks').html(dom);
				self.rightContainer.find('.blocks').find('.block').find('.block-side1').find('img').each(function(index){
					var picWid = $(this).width();
					var picHei = $(this).height();
					if(picWid/picHei >= 324/200){
						$(this).css('height','100%');
					}else {
						$(this).css('width','100%');
					}
				});
			});
		}
	};
	var showworks = new ShowWorks();
})(jQuery);