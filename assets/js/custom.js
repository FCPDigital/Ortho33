/*
 * Custom code goes here.
 * A template should always ship with an empty custom.js
 */



window.addEventListener("load", function(){
	HeaderManage.init();
	CarouselManage.init();
	TogglerManage.init();
	ToggleThumbnailManage.init();
	$( function() {
		$( ".tabs" ).tabs();
	});
}, false)