ToggleThumbnailManage = {

	setup: function(){
		this.els = document.querySelectorAll('.toggle-thumbnail');
		this.modals = document.querySelectorAll('.js-product-images-modal');
		this.togglers = []
		for(var i = 0; i < this.els.length; i++) {
			this.togglers.push(new ToggleThumbnail(this.els[i], 'medium'));
		}
		for(var i = 0; i < this.modals.length; i++) {
			this.togglers.push(new ToggleThumbnail(this.modals[i], 'large'));
		}
	},

	init: function(){
		this.setup();
		var self = this;
		prestashop.on('updateProduct', function(){
			setTimeout(function(){
				self.setup();
			}, 1000)
			
		})
	}
}


function ToggleThumbnail(el, size){
	this.classes = {
		thumb: {
			medium: '.js-thumb',
			large: '.js-modal-thumb',
		},
		selected: '.selected'
	}
	this.size = size;
	this.target = size;
	if(this.size === 'large') this.target = 'modal'

	this.el = el;

	this.coverEl = this.el.querySelector('.js-'+this.target+'-product-cover');
	this.thumbs = this.el.querySelectorAll(this.classes.thumb[this.size]);
	this._current = this.thumbs[0];
	this.initEvents()
}

ToggleThumbnail.prototype = {
	get current() {
		return this._current;
	},

	set current(el){
		this.toggle(el)
		this.current.className = this.current.className.replace(this.classes.selected, '');
		this._current = el
		if(!this.current.className.match(this.classes.selected)) this.current.className += ' '+this.classes.selected
	},

	initEvent: function(el){
		var self = this;
		el.addEventListener('click', function(){
			self.current = this;
		})
	},

	toggle: function(newEl) {
		this.coverEl.setAttribute('src', newEl.getAttribute('data-image-'+this.size+'-src')); 
	},

	initEvents: function(){
		for(var i = 0; i<this.thumbs.length; i++){
			this.initEvent(this.thumbs[i]);
		}
	}
}