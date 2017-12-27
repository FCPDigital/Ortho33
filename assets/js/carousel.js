CarouselManage = {
	carousels: [],
	launch: function(carousel){
		this.carousels.push(new Carousel(carousel))
	},
	init: function(){
		this.carouselEls = document.querySelectorAll('.carousel');
		console.log(this.carouselEls)
		for(var i=0; i<this.carouselEls.length; i++) {
			this.launch(this.carouselEls[i]);
		}
	}
}





function Carousel(el){
	this.el = el;
	this.innerEl = this.el.querySelector('.carousel__inner');
	this.items = []; 
	this.sizes = {};
	this.interval = parseInt(this.el.getAttribute('data-interval')) ? parseInt(this.el.getAttribute('data-interval')) : null
	this.setControl();
	this.setItems();
	this.setSizing();
	this.initEvents();
	this.setInterval();
}

Carousel.prototype = {
	
	setInterval: function(){
		if(this.interval) {
			var self = this;
			clearTimeout(this.timeinterval);
			this.timeinterval = setTimeout(function(){
				console.log('switch')
				self.select("right");
			}, this.interval)
		}
	},

	setControl(){
		this.control = {
			pointers: [],
			cycle: true
		};
		this.control.left = document.querySelector(".carousel__control--left");
		this.control.right = document.querySelector(".carousel__control--right");
	},

	// Initializers
	setItems: function(){
		var items = this.el.querySelectorAll('.carousel-item');
		var pointers = this.el.querySelectorAll(".carousel__pointer");
		for(var i=0; i<items.length; i++) {
			this.items.push(new CarouselItem(items[i], i))
			if(this.items[i].active === true) {
				this.current = i;	
			}
			this.control.pointers.push(pointers[i]);
		}
	},

	setSizing: function(){
		var w = this.el.offsetWidth, h = 0;
		
		for(var i=0; i<this.items.length; i++) {
			this.items[i].updateSize();
			if(this.items[i].el.offsetHeight > h) h = this.items[i].el.offsetHeight;
		}
		this.innerEl.style.height = h+"px";
		//this.innerEl.style.width = w*this.items.length+'px'; 
		this.sizes.w = w; 
		this.sizes.h = h; 
	},

	// Getter
	getFromDirection(direction){
		var item = null;
		if(this.control.cycle) {
			if( direction === "left" ) item = this.current-1 < 0 ? this.items[this.items.length - 1] : this.items[this.current - 1];
			if( direction === "right" ) item = this.current+1 >= this.items.length ? this.items[0] : this.items[this.current + 1];
		}
		if(!item) return this.items[this.current]; 
		return item;
	},

	get currentItem(){
		return this.items[this.current];
	},

	// Moving
	select: function(item){	
		if(item === "left" || item === "right") item = this.getFromDirection(item);
		this.currentItem.hide();
		item.display();
		this.updatePointerActive(this.current, item.rank);
		this.current = item.rank;
		this.setInterval();
		this.setSizing();
	},

	// General events
	resizeEvent: function(){
		var self = this; 
		window.addEventListener("resize", function(){ self.setSizing(); })
	},

	// Arrow events
	directionEvent: function(){
		var self = this;
		this.control.left.addEventListener('click', function(e){ self.select('left'); e.preventDefault(); })
		this.control.right.addEventListener('click', function(e){ self.select('right'); e.preventDefault(); })
	},

	// Pointer events
	updatePointerActive: function(old, recent){
		this.control.pointers[old].className = this.control.pointers[old].className.replace("carousel__pointer--active", "");
		this.control.pointers[recent].className += "carousel__pointer--active"
	},

	pointerEvent: function(pointer, rank){
		var self = this;
		pointer.addEventListener("click", function(){
			if(self.current !== rank) {
				self.select(self.items[rank]);
			}
		})
	},
	pointerEvents: function(){
		for(var i=0; i<this.control.pointers.length; i++){
			this.pointerEvent(this.control.pointers[i], i);
		}
	},

	initEvents: function(){
		this.resizeEvent();
		this.directionEvent();
		this.pointerEvents();
	}
}

function  CarouselItem(el, rank){
	this.el = el;
	this.rank = rank;
	this.duration = 300; 
	this.content = this.el.querySelector(".carousel-item__content");
	this.class = {
		item: 'carousel-item',
		active: 'carousel-item--active',
		activeEnter: 'carousel-item--active-in',
		activeLeave: 'carousel-item--active-out'
	}
	this.active = false;
	var isActive = this.el.className.match(this.class.active);
	if(isActive !== null) {
		this.active = true;	
	}
}

CarouselItem.prototype = {
	updateSize: function(){
		//if(window.innerWidth < 1000) {
			this.el.setAttribute("style", "height: "+(this.content.offsetHeight + 40)+"px;");
		//}
	},
	display: function(){
		var self = this;
		if( !this.el.className.match(this.class.active)) {
			this.el.className += " " + this.class.active; 
		}
		if( !this.el.className.match(this.class.activeEnter)) {
			this.el.className += " " + this.class.activeEnter; 
		}
		setTimeout(function(){
			self.el.className = self.el.className.replace(self.class.activeEnter, ""); 
		}, this.duration)
	},
	hide: function(){
		var self = this;
		if( !this.el.className.match(this.class.activeLeave)) {
			this.el.className += " " + this.class.activeLeave; 
		}
		setTimeout(function(){
			self.el.className = self.el.className.replace(self.class.activeLeave, ""); 
			self.el.className = self.el.className.replace(self.class.active, "");
		}, this.duration)
	}
}