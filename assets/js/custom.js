/*
 * Custom code goes here.
 * A template should always ship with an empty custom.js
 */

HeaderManage = {
	display: function(){
		if (this.menu.className.match("header-responsive--hide")) {
			this.menu.className = this.menu.className.replace("header-responsive--hide", "header-responsive--display");
		}
	},
	hide: function(){
		if (this.menu.className.match("header-responsive--display")) {
			this.menu.className = this.menu.className.replace("header-responsive--display", "header-responsive--hide");
		}
	},
	initEvents: function(){
		var self = this;
		this.burger.addEventListener("click", function(){
			self.display();
		})
		this.close.addEventListener("click", function(e){
			e.preventDefault();
			self.hide();
		})
	},
	init: function(){
		this.burger = document.querySelector("#menu-burger");
		this.close = document.querySelector("#menu-close");
		this.menu = document.querySelector("#menu-responsive");
		this.initEvents();
	}
}

window.addEventListener("load", function(){
	HeaderManage.init();
}, false)