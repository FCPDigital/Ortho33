TogglerManage = {
	init: function(){
		var togglers = document.querySelectorAll('.toggler');
		this.togglers = [];
		for(var i = 0; i<togglers.length; i++){
			this.togglers.push(new Toggler(togglers[i]));
		}
	}
}

function Toggler(el){
	this.selectors = el.querySelectorAll('a[data-toggle-id]');
	this._current = el.querySelector('.toggler__item--active');
	console.log(this.selectors)
	for(var i=0; i<this.selectors.length; i++){
		this.onclick(this.selectors[i]);
	}
}

Toggler.prototype = {

	hide: function(el){
		if(el.className.match("toggler__item--active")) {
			el.className = el.className.replace("toggler__item--active", "");
		}
	},

	display: function(el){
		if(!el.className.match("toggler__item--active")) {
			el.className += " toggler__item--active";
		}
	},

	get current() {
		return this._current
	},

	set current(el){
		this.hide(this._current)
		this._current = el
		this.display(this._current);
	},

	onclick: function(el){
		var id = el.getAttribute('data-toggle-id');
		var displayer = document.querySelector('#toggler-item-'+id)
		var self = this;
		el.addEventListener('click', function(e){
			e.preventDefault();
			console.log(displayer)
			self.current = displayer
		})
	}
}

