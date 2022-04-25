


timeout = 0;






let itemTotalPrices = function (ele) {
  console.log(ele);
  let prices = parseFloat($(ele).find('.single-price div').text()); 
  let quants = parseFloat($(ele).find('.quantity input').val()); 
  let total = (prices * quants).toFixed(2); 
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
  $('tbody tr').not('.final-price').each(function (i, ele) { //how do I exclude #final-price
    pricesArr.push(itemTotalPrices(ele));
   });
  console.log(pricesArr)
  finalPrice = pricesArr.reduce((a, b) => a + b);
  $('.final-price').html(finalPrice);
}

$(document).ready(function () {
  fireAll()
});