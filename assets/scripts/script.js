$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 600, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

var productsURL = "https://raw.githubusercontent.com/got-hooked/got-hooked.github.io/master/assets/products.json";

$.ajax({
  url: productsURL,
  method: "GET",
  success: (data) => {
    var data = JSON.parse(data);
    
    data.forEach(product => {
      $("#products #body").append(parseProduct(product));
    })
  }
})

function parseProduct (product) {
  let title = product.title,
      img = product.img,
      sets = product.sets;

  let productBody = $("<div class='product'></div>");
  let productHeader = $("<div class='header'></div>");
  let productFooter = $("<div class='footer'></div>");
  let productImg = $("<div class='img'></div>");

  productHeader.text(title);
  productImg.append("<img src='" + img + "'/>");

  if (sets.length > 1) {
    productFooter.append("<div class='multi set'></div>");
    sets.forEach(set => {
      let setElem = $("<div class='set'></div>");
      setElem.append("<span class='price'>Php. " + set.price + "</span>");
      setElem.append("<span class='description'>" + set.description + "</span>");
    })
  } else {
    productFooter.append("<div class='set'></div>");
    productFooter.children('.set').append("<span class='price'>Php. " + sets[0].price + "</span>");
    productFooter.children('.set').append("<span class='description'>" + sets[0].description + "</span>");
  }

  productBody.append(productHeader);
  productBody.append(productImg);
  productBody.append(productFooter);

  return productBody;
}