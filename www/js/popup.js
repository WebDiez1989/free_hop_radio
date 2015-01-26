/**
* @version		0.0.1 16.05.2011 $
* @package		POP-UP jQuery
* @copyright	Copyright (C) 2011 - 2012 Open Source Matters. All rights reserved.
* @license		GNU/GPL
* project page  http://www.cleverscript.ru
* support       support@cleverscript.ru
* author        cleverscript
*/
function PopUp(obj,trig){
	var html = obj.html();
	obj.remove();
	var body = $('body')[0];
				
	var HTML="<div id='popup'><span id='cancel'></span>"+html+"</div>";
	var win = $('<div id="win">'+HTML+'</div>');
	win.appendTo(body);
	
	function showWin(){
		$('#win').css({display: 'block'});
		$('#popup').css({
			display:'block', 
			opacity:0, 
			top: $(window).height()/2-$('#popup').height()/2+'px', 
			left: $(window).width()/2-$('#popup').width()/2+'px'
		});
		$('#popup').css('opacity', 1);			
	}
		
	if($(trig)){
		$(trig).click(function(){
			showWin();
		});
	}
		
	if($('#cancel')){
		$('#cancel').click(function(){
			$('#win').css('display', 'none');
		});
	}
	
}