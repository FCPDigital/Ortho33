prestashop.cart = prestashop.cart || {};

prestashop.cart.active_inputs = null;

var spinnerSelector = 'input[name="product-quantity-spin"]';

/**
 * Attach Bootstrap TouchSpin event handlers
 */
function createSpin()
{
  $.each($(spinnerSelector), function (index, spinner) {
     $(spinner).TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'fa fa-chevron-up',
      verticaldownclass: 'fa fa-chevron-down',
      buttondown_class: 'btn btn-touchspin js-touchspin js-increase-product-quantity',
      buttonup_class: 'btn btn-touchspin js-touchspin js-decrease-product-quantity',
      min: parseInt($(spinner).attr('min'), 10),
      max: 1000000
    });
  });
}



$(document).ready(function(){
  var productLineInCartSelector = '.js-cart-line-product-quantity';
  console.log(productLineInCartSelector)
  var promises = [];

  prestashop.on('updateCart', function() {
    $('.quickview').modal('hide');
  });

  prestashop.on('updatedCart', function() {
    createSpin();
  });

  createSpin();

  var $body = $('body');

  function isTouchSpin(namespace) {
    return namespace === 'on.startupspin' || namespace === 'on.startdownspin';
  }

  function shouldIncreaseProductQuantity(namespace) {
    return namespace === 'on.startupspin';
  }

  function findCartLineProductQuantityInput($target) {
    var $input = $target.parents('.bootstrap-touchspin').find(productLineInCartSelector);

    if ($input.is(':focus')) {
      return null;
    } else {
      return $input;
    }
  }

  function camelize(subject) {
    var actionTypeParts = subject.split('-');
    var i;
    var part;
    var camelizedSubject = '';

    for (i = 0; i < actionTypeParts.length; i++) {
      part = actionTypeParts[i];

      if (0 !== i) {
        part = part.substring(0, 1).toUpperCase() + part.substring(1);
      }

      camelizedSubject = camelizedSubject + part;
    }

    return camelizedSubject;
  }

  function parseCartAction($target, namespace) {
    if (!isTouchSpin(namespace)) {
      return {
        url: $target.attr('href'),
        type: camelize($target.data('link-action'))
      }
    }

    var $input = findCartLineProductQuantityInput($target);
    if (!$input) {
      return;
    }

    var cartAction = {};
    if (shouldIncreaseProductQuantity(namespace)) {
      cartAction = {
        url: $input.data('up-url'),
        type: 'increaseProductQuantity'
      };
    } else {
      cartAction = {
        url: $input.data('down-url'),
        type: 'decreaseProductQuantity'
      }
    }

    return cartAction;
  }

  var abortPreviousRequests = function() {
    var promise;
    while (promises.length > 0) {
      promise = promises.pop();
      promise.abort();
    }
  };

  var getTouchSpinInput = function($button) {
    return $($button.parents('.bootstrap-touchspin').find('input'));
  };

  var handleCartAction = function(event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var dataset = event.currentTarget.dataset;

    var cartAction = parseCartAction($target, event.namespace);
    var requestData = {
      ajax: '1',
      action: 'update'
    };

    if (typeof cartAction === 'undefined') {
      return;
    }

    abortPreviousRequests();
    $.ajax({
      url: cartAction.url,
      method: 'POST',
      data: requestData,
      dataType: 'json',
      beforeSend: function (jqXHR) {
        promises.push(jqXHR);
      }
    }).then(function (resp) {
      var $quantityInput = getTouchSpinInput($target);
      $quantityInput.val(resp.quantity);

      // Refresh cart preview
      prestashop.emit('updateCart', {
        reason: dataset
      });
    }).fail(function(resp) {
      prestashop.emit('handleError', {
        eventType: 'updateProductInCart',
        resp: resp,
        cartAction: cartAction.type
      });
    });
  };

  $body.on(
    'click',
    '[data-link-action="devare-from-cart"], [data-link-action="remove-voucher"]',
    handleCartAction
  );

  $body.on('touchspin.on.startdownspin', spinnerSelector, handleCartAction);
  $body.on('touchspin.on.startupspin', spinnerSelector, handleCartAction);

  function sendUpdateQuantityInCartRequest(updateQuantityInCartUrl, requestData, $target) {
    abortPreviousRequests();

    return $.ajax({
      url: updateQuantityInCartUrl,
      method: 'POST',
      data: requestData,
      dataType: 'json',
      beforeSend: function (jqXHR) {
        promises.push(jqXHR);
      }
    }).then(function (resp) {
      $target.val(resp.quantity);

      var dataset;
      if ($target && $target.dataset) {
        dataset = $target.dataset;
      } else {
        dataset = resp;
      }


      // Refresh cart preview
      prestashop.emit('updateCart', {
        reason: dataset
      });
    }).fail(function(resp) {
      prestashop.emit('handleError', {eventType: 'updateProductQuantityInCart', resp: resp})
    });
  }

  function getRequestData(quantity) {
    return {
      ajax: '1',
      qty: Math.abs(quantity),
      action: 'update',
      op: getQuantityChangeType(quantity)
    }
  }

  function getQuantityChangeType($quantity) {
    return ($quantity > 0) ? 'up' : 'down';
  }

  function updateProductQuantityInCart(event)
  {
    var $target = $(event.currentTarget);
    var updateQuantityInCartUrl = $target.data('update-url');
    var baseValue = $target.attr('value');

    // There should be a valid product quantity in cart
    var targetValue = $target.val();
    if (targetValue != parseInt(targetValue) || targetValue < 0 || isNaN(targetValue)) {
      $target.val(baseValue);

      return;
    }

    // There should be a new product quantity in cart
    var qty = targetValue - baseValue;
    if (qty == 0) {
      return;
    }

    var requestData = getRequestData(qty);

    sendUpdateQuantityInCartRequest(updateQuantityInCartUrl, requestData, $target);
  }

  $body.on(
    'focusout',
    productLineInCartSelector,
    function(event) {
      updateProductQuantityInCart(event);
    }
  );

  $body.on(
    'keyup',
    productLineInCartSelector,
    function(event) {
      if (event.keyCode == 13) {
        updateProductQuantityInCart(event);
      }
    }
  );

  $body.on(
    'click',
    '.js-discount .code',
    function(event) {
      event.stopPropagation();

      var $code = $(event.currentTarget);
      var $discountInput = $('[name=discount_name]');

      $discountInput.val($code.text());

      return false;
    }
  )
});


