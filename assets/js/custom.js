/*
 * Custom code goes here.
 * A template should always ship with an empty custom.js
 */

// Replace all the table element (table, tr, td, tbody, thead) with the selector choose
function tableClean(selector, target){
	var tables = document.querySelectorAll(selector+" .columnWrapTable");
	for(var i=0; i<tables.length; i++){
		tables[i].outerHTML = tables[i].outerHTML.replace(/(?:table|tbody|tr|td)/, target)
	}
}


window.addEventListener("load", function(){
	HeaderManage.init();
	CarouselManage.init();
	//TogglerManage.init();
	ToggleThumbnailManage.init();
	FormManage.init();
	tableClean(".header-responsive", "div");
	$( function() {
		$( ".tabs" ).tabs();
	});
}, false)