!function(i){var o=function(o){var n=this;this.alllink=i("a"),this.bodyBox=i("body");var t='<audio preload="auto" id="myAudio" width="0" height="0"><source src="../links/btn.mp3" type="audio/mp3" /><source src="../links/btn.ogg" type="audio/ogg" /><embed src="../links/btn.mp3" hidden="true"/></audio>';this.bodyBox.append(t),this.audio=document.getElementById("myAudio"),this.alllink.hover(function(){n.audio.play()},function(){}),i("body").click(function(){n.audio.play()})};new o}(jQuery);