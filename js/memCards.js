;(function($){
	var MemCards = function(){
		var self = this;
		this.mem_id = window.location.search.slice(4);
		if(!this.mem_id){
			window.location.search = '?id=1';
			this.mem_id = 1;
		}
		this.members = [];
		this.nowMem = {};
		this.switchbox = $('.switchbox');
		this.switchbox.hide();
		this.classItems = this.switchbox.find(".items");
		this.classNow = this.switchbox.find(".now");
		this.tabMem = $("#tabMem");
		this.cardbox = $('#memCard');
		this.baseImgSrc = '../dist/imgs/member/';
		$.ajax({
			url:'../dist/data/member.json',
			async:false,
			dataType:'json'
		}).done(function(data){
			$.each(data,function(i,val){
				self.members.push(val);
				if(self.mem_id == val.id){
					self.nowMem = val;
				}
			});
		});
		this.renderClassNav();
		this.renderMemCard();
	};
	MemCards.prototype = {
		renderClassNav:function(){
			var self = this;
			this.switchbox.show();
			this.classItems.hide();
			this.fillClassNav(this.nowMem.classtype);
			this.switchbox.hover(function(){
				self.classItems.fadeIn();
			},function(){
				self.classItems.fadeOut();
			});
			this.classItems.find('.item').hover(function(){
				$(this).addClass('active');
			},function(){
				$(this).removeClass('active');
			}).click(function(){
				// todo
				var classtype = $(this).attr('data-classtype');
				$.each(self.members,function(i,val){
					if(val.classtype == classtype){
						self.mem_id = val.id;
						return false;
					}
				});
				self.fillClassNav(classtype);
				self.renderMemNav(classtype);
				self.renderMemCard();

			});

			this.renderMemNav(this.nowMem.classtype);
		},
		fillClassNav:function(classtype){
			var str = "";
			if(classtype=='1'){
				str="第一届";
			}else if(classtype=='2'){
				str="第二届";
			}else if(classtype=='3'){
				str="第三届";
			}else if(classtype=='4'){
				str="第四届";
			}else if(classtype=='5'){
				str="第五届";
			}
			this.classNow.text(str);
		},
		renderMemNav:function(classtype){
			var self = this;
			var members = this.getClassNow(classtype);
			self.tabMem.html("");
			var MemNavHeight = $(window).height() - 300;
			var rMargin = (MemNavHeight-14*members.length)/members.length;
			$.each(members,function(i,val){
				if(val.id == self.mem_id){
					self.tabMem.append('<li data-id='+ val.id +'><span class="r now"></span></li>')
				}else {
					self.tabMem.append('<li data-id='+ val.id +'><span class="r"></span></li>');
				}
			});


			this.tabMem.find('li')
				.css({
					'marginTop':rMargin,
					'marginBottom':0
				})
				.click(function(){
					self.tabMem.find('li').find('span').removeClass('now');
					$(this).find('span').addClass('now');
					self.updateMem_id($(this).attr('data-id'));
					self.renderMemCard();
			});
		},
		updateMem_id:function(id){
			this.mem_id = id;
			// window.location.search='?id='+id; //更改location造成全局刷新，更新为联系通道
		},
		renderMemCard:function(){
			var self = this;
			this.cardbox.css('background',"transparent");
			$.each(self.members,function(i,val){
				if(self.mem_id == val.id){
					self.nowMem = val;
					return false;
				}
			});
			var dom = '<div class="phto"><img src="'+ this.baseImgSrc + this.nowMem.imgsrc +'"></div> ' +
			'<p class="name">'+ this.nowMem.name +'</p>'+
			'<div class="content">'+
				'<p class="part1"><span>专业</span>'+ this.nowMem.professional +'</p>'+
				'<p class="part2"><span>介绍</span>'+ this.nowMem.intro +'</p>'+
			'</div>'+
			'<div class="links">'+
				'<a href="'+ this.nowMem.github +'" class="not-a"><span class="github"></span></a>'+
				'<a href="'+ this.nowMem.blog +'" class="not-a"><span class="blog"></span></a>'+
			'</div> ';
			this.cardbox.html(dom);

		},
		getClassNow:function(classtype){
			var set = [];
			$.each(this.members,function(i,val){
				if(val.classtype == classtype){
					set.push(val);
				}
			});
			return set;
		}
	};
	var memcard = new MemCards();
})(jQuery);