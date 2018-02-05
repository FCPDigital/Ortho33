FormManage = {
	parentFocus: function() {
		$('.js-child-focus').focus(function () {
			$(this).closest('.js-parent-focus').addClass('focus');
		});
		$('.js-child-focus').focusout(function () {
			$(this).closest('.js-parent-focus').removeClass('focus');
		});
	},

	togglePasswordVisibility: function() {
		$('button[data-action="show-password"]').on('click', function () {
			var elm = $(this).closest('.input-group').children('input.js-visible-password');
			if (elm.attr('type') === 'password') {
				elm.attr('type', 'text');
				$(this).text($(this).data('textHide'));
			} else {
				elm.attr('type', 'password');
				$(this).text($(this).data('textShow'));
			}
		});
	},
	init: function(){
		this.parentFocus();
		this.togglePasswordVisibility();
	}
}