$(document).ready(function () {

  createProductSpin();

  createInputFile();

  coverImage();

  imageScrollBox();



  prestashop.on('updatedProduct', function (event) {
    createInputFile();
    coverImage();
    if (event && event.product_minimal_quantity) {
      var minimalProductQuantity = parseInt(event.product_minimal_quantity, 10);
      var quantityInputSelector = '#quantity_wanted';
      var quantityInput = $(quantityInputSelector);

      // @see http://www.virtuosoft.eu/code/bootstrap-touchspin/ about Bootstrap TouchSpin
      quantityInput.trigger('touchspin.updatesettings', {min: minimalProductQuantity});
    }
    imageScrollBox();
    $($('.tabs .nav-link.active').attr('href')).addClass('active').removeClass('fade');
    $('.js-product-images-modal').replaceWith(event.product_images_modal);
  });

  function coverImage() {
    $('.js-thumb').on(
      'click',
      function (event) {
        $('.js-modal-product-cover').attr('src',$(event.target).data('image-large-src'));
        $('.selected').removeClass('selected');
        $(event.target).addClass('selected');
        $('.js-qv-product-cover').prop('src', $(event.currentTarget).data('image-large-src'));
      }
    );
  }

  function imageScrollBox()
  {
    if ($('#main .js-qv-product-images li').length > 2) {
      $('#main .js-qv-mask').addClass('scroll');
      $('.scroll-box-arrows').addClass('scroll');
        $('#main .js-qv-mask').scrollbox({
          direction: 'h',
          distance: 113,
          autoPlay: false
        });
        $('.scroll-box-arrows .left').click(function () {
          $('#main .js-qv-mask').trigger('backward');
        });
        $('.scroll-box-arrows .right').click(function () {
          $('#main .js-qv-mask').trigger('forward');
        });
    } else {
      $('#main .js-qv-mask').removeClass('scroll');
      $('.scroll-box-arrows').removeClass('scroll');
    }
  }

  function createInputFile()
  {
    $('.js-file-input').on('change', function(event) {
      var target, file;

      if ((target = $(event.currentTarget)[0]) && (file = target.files[0])) {
        $(target).prev().text(file.name);
      }
    });
  }

  function createProductSpin()
  {
    var quantityInput = $('#quantity_wanted');
    quantityInput.TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'fa fa-chevron-up',
      verticaldownclass: 'fa fa-chevron-down',
      buttondown_class: 'btn btn-touchspin js-touchspin',
      buttonup_class: 'btn btn-touchspin js-touchspin',
      min: parseInt(quantityInput.attr('min'), 10),
      max: 1000000
    });

    var quantity = quantityInput.val();
    quantityInput.on('keyup change', function (event) {
      var newQuantity = $(this).val();
      if (newQuantity !== quantity) {
        quantity = newQuantity;
        var $productRefresh = $('.product-refresh');
        $(event.currentTarget).trigger('touchspin.stopspin');
        $productRefresh.trigger('click', {eventType: 'updatedProductQuantity'});
      }
      event.preventDefault();
      return false;
    });
  }
});


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

	this._currentSel = el.querySelector('.toggler__list-item--active'); 

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

			self._currentSel.className = self._currentSel.className.replace('toggler__list-item--active', '');

			this.parentNode.className += " toggler__list-item--active";

			self._currentSel = this.parentNode 

			self.current = displayer

		})

	}

}
	