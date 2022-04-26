timeout = 0;

let itemTotalPrices = function (ele) {
  let prices = parseFloat($(ele).find('.single-price div').text()); 
  let quants = parseFloat($(ele).find('.quantity input').val()); 
  let total = parseFloat((prices * quants).toFixed(2)); 
  $(ele).children('.total-price').html(total + "€");
  return total;
};

$(document).on('input', 'tr input', function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    fireAll();
  }, 500);
});

let fireAll = function () {
  let pricesArr = [];
  finalPrice = 0;
  $('.items').each(function (i, ele) {  
    pricesArr.push(itemTotalPrices(ele));
   });

  if (pricesArr.length == 0) {
    $('.final-price').html("-");
  }
  else {
    finalPrice = pricesArr.reduce((a, b) => a + b).toFixed(2);
    $('.final-price').html(finalPrice + "€");
  }
}

$(document).ready(function () {
  fireAll();
  $(document).on('click', '.btn.remove', function () {
    $(this).closest('tr').remove();
    fireAll()
  });

  $('#add-item').on('submit', function (event) {
    event.preventDefault();
    var quant = 1;
    var name = $(this).children('#item-name').val();
    var price = $(this).children('#item-price').val();

    $('tbody:last').prepend('<tr class="items">' +
      '<td class="name">' + name + '</td>' +
      '<td class="single-price"><div>' + price + '</div></td>' +
      '<td class="quantity"><input type="number" value="' + quant + '" /></td>' +
      '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
      '<td class="total-price"></td>' +
    '</tr>');

    fireAll()
    $(this).children('#item-name').val('');
    $(this).children('#item-price').val('');
  });
});