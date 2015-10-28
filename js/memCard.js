;(function($){
	var MemCard = function(){
		var self = this;
		this.cardbox = $('#memCard');
		this.baseImgSrc = '../dist/imgs/member/';
		this.tabClassBox = $('.switchbox');
		this.tabClass = this.tabClassBox.find(".items");
		this.tabClassNow = this.tabClassBox.find(".now");

		this.mem_id = window.location.search.slice(4);
		if(this.mem_id){
			this.renderCard();
		}
		// else{
		// 	this.renderTabClass();
		// }
	};
	MemCard.prototype = {
		renderCard:function(){
			var self = this;
			// init
			this.cardbox.css('background','transparent');
			// now member
			$.getJSON('../dist/data/member.json',function(data){
				$.each(data,function(i,val){
					if(val.id == self.mem_id){
						var nowMem = $.extend({},val);
						self.fillCard(nowMem);
						return false;
					}
				});
			});
		},
		fillCard:function(nowMem){
			var dom = '<div class="phto"><img src="'+ this.baseImgSrc + nowMem.imgsrc +'"></div> ' +
			'<p class="name">'+ nowMem.name +'</p>'+
			'<div class="content">'+
				'<p class="part1"><span>专业</span>'+ nowMem.professional +'</p>'+
				'<p class="part2"><span>介绍</span>'+ nowMem.intro +'</p>'+
			'</div>'+
			'<div class="links">'+
				'<a href="'+ nowMem.github +'"><span class="github"></span></a>'+
				'<a href="'+ nowMem.blog +'"><span class="blog"></span></a>'+
			'</div> '

			this.cardbox.append(dom);
			this.renderTabClass(nowMem.classtype);
			this.renderNav(nowMem.classtype,nowMem.id);

		},
		renderNav:function(nowClasstype,nowID){
			var self = this;
			this.tabMemBox = $('#tabMem');
			var members = [];
			$.getJSON('../dist/data/member.json',function(data){
				$.each(data,function(i,val){
				var dom = '<li data-id='+ val.id +'><span class="r"></span></li>';
				var domnow = '<li data-id='+ val.id +'><span class="r now"></span></li>';
					if(val.id == nowID){
						members.push(val);
						self.tabMemBox.append(domnow);
					}else if(val.classtype == nowClasstype){
						members.push(val);
						self.tabMemBox.append(dom);
					}
				});
			});
			alert(this.tabMemBox.find('.r').length);
			this.tabMemBox.find('li').click(function(){
				alert("here");
			});

		},
		renderTabClass:function(nowClasstype){
			var showclasstype = "";
			if(nowClasstype == 1){
				showclasstype = "第一届";
			}else if(nowClasstype == 2){
				showclasstype = "第二届";
			}else if(nowClasstype == 3){
				showclasstype = "第三届";
			}else if(nowClasstype == 4){
				showclasstype = "第四届";
			}else if(nowClasstype == 5){
				showclasstype = "第五届";
			}
			this.tabClassNow.text(showclasstype);
			var self = this;
			this.tabClass.hide();
			this.tabClassBox.hover(function(){
				self.tabClass.fadeIn();
			},function(){
				self.tabClass.fadeOut();
			});
			this.tabClass.find('.item').hover(function(){
				$(this).addClass('active');
			},function(){
				$(this).removeClass('active');
			});
			this.tabClass.find('.item').click(function(){
				self.tabClassNow.text($(this).text());
				var classtype = $(this).attr('data-classtype');
				alert(classtype);
			});
		},
	};
	var memcard = new MemCard();
})(jQuery);