
// jQuery/Ajax Practice
$(document).ready(function() {

  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');
  var $treat = $('#treat');


  // Writes orders to the page
  function addOrder(order) {
    $orders.append('<li> \
    Name: <strong>'+ order.name +'</strong> </br> \
    Drink: <strong>'+ order.drink +'</strong> </br> \
    Treat: <strong>'+ order.treat +'</strong> </br> \
    <div class="btn-group"> \
      <button data-id="'+ order.completed +'" class="btn-complete">✓ Complete \
      </button> \
      <button data-id="'+ order.id +'" class="btn-remove">X \
      </button> \
    </div> \
    </li>');
  }



  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/zac/cafe',
    success: function(orders) {
      $.each(orders, function(i, order) {
        addOrder(order);
      });
    },
    error: function() {
      console.log('Error loading orders.');
    }
  });

  $('#add-order').on('click', function() {

    // order is used in ajax data below
    var order = {
      name: $name.val(),
      drink: $drink.val(),
      treat: $treat.val(),
    };

    $.ajax({
      type: 'POST',
      url: 'http://rest.learncode.academy/api/zac/cafe',
      data: order,
      success: function(newOrder) {
        addOrder(newOrder);
      },
      error: function() {
        console.log('Error saving order.');
      }
    });

    // begins "thank you animation"
    $('.thanks').addClass('active');

    // reloads page, resetting values in the form
    function reload() {
      window.location.reload();
    }

    // calls reload function above after delay
    setTimeout(reload, 5000);

  });

  // Delete li
  $orders.delegate('.btn-remove', 'click', function() {

    var $li = $(this).closest('li');

    $.ajax({
      type: 'DELETE',
      url: 'http://rest.learncode.academy/api/zac/cafe/' + $(this).attr('data-id'),
      success: function (){
        $li.remove();
      }
    });

  });

  // Mark li complete
  $orders.delegate('.btn-complete', 'click', function() {
    var $li = $(this).closest('li').toggleClass('completed');
  });

});
