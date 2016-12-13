import { paramStr2paramObj } from '../pub/http.js';


setAppMenu();

Zepto(function($){
	var query = paramStr2paramObj(decodeURIComponent(location.href))

	var deviceHeight = query.height;
	var dpr = window.devicePixelRatio || 1;
	var swipeHeight = deviceHeight/dpr;
	var footerHeight = $('.creditFooter').height();
	var rpx = swipeHeight - footerHeight-65;
	$('#protocol-container').css('height', rpx + 'px');
	alert(document.body.scrollTop)
	setTimeout(function(){
		document.body.scrollTop = 0
		
	},10);
	
	
});

function setAppMenu(){
	var param = {menus:[{
           buttonText:'更多',
           clickEventMethod:function() {
           		VH.utils.redirect('/h5/protocol');
           }
       }]
   }
	var param2 = {menus:[{
           buttonText:'更多',
           type:'MENU_BUTTON_TYPE_CUSTOM',
           clickEventMethod:function() {
           		VH.utils.redirect('/h5/protocol');
           }
       }]
   }
    VH.ui.showMenuButtonV2(param2);
}
