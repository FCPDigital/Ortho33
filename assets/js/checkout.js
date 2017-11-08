
function setUpCheckout() {
  if ($('.js-cancel-address').length !== 0) {
    $('.checkout-step:not(.js-current-step) .step-title').addClass('not-allowed');
  }

  $('.js-terms a').on('click', function(event) {
    event.preventDefault();
    var url = $(event.target).attr('href');
    if (url) {
      // TODO: Handle request if no pretty URL
      url += `?content_only=1`;
      $.get(url, function(content) {
        $('#modal').find('.js-modal-content').html($(content).find('.page-cms').contents());
      }).fail(function(resp) {
        prestashop.emit('handleError', {eventType: 'clickTerms', resp: resp});
      });
    }

    $('#modal').modal('show');
  });

  $('.js-gift-checkbox').on('click',  function(event) {
    $('#gift').collapse('toggle');
  });
}

$(document).ready(function() {
  if ($('body#checkout').length === 1) {
    setUpCheckout();
  }

  prestashop.on('updatedDeliveryForm', function(params) {
    if (typeof params.deliveryOption === 'undefined' || 0 === params.deliveryOption.length) {
        return;
    }
    // Hide all carrier extra content ...
    $(".carrier-extra-content").hide();
    // and show the one related to the selected carrier
    params.deliveryOption.next(".carrier-extra-content").slideDown();
  });
});
