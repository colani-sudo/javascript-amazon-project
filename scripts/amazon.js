import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

// import {cart as myCart} from '../data/cart.js'; // example
/*
  import * as cartModule from '../data/cart.js';
  cartModule.cart
  cartModule.addToCart('id');
*/

let productsHTML = '';

// The products variable will be coming from products.js
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

/* 
-------Syntax rules for a data attribute---------
- is an HTML attribute
- have to start with "data-", e.g data-product-name=""
- then give it any name
- the attributes name is converted from Kebab to Camel case
Purpose: to attach any information to an element
*/

// Load all products to the page
document.querySelector('.js-products-grid').innerHTML = productsHTML;


function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function flashAddedMessage(productId) {
  const addedElement = document.querySelector(`.js-added-to-cart-${productId}`)

  let timeoutId;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
      addedElement.classList.remove('js-added-to-cart-${product.id}');
      addedElement.classList.remove('js-added-to-cart');
  }, 1500);
  addedElement.classList.add('js-added-to-cart-${product.id}');
  addedElement.classList.add('js-added-to-cart');
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {

      const productId = button.dataset.productId;
      // product.id gets converted from Kebab case to Camel Case productId

      addToCart(productId);
      
      updateCartQuantity();
      // Show Added message
      /*
        -Grab the initial class
        -Clear timeout
        -Add the temporary js class with product.id tag using .classList.add()
        -Add temporary js class without product.id  
        -Remove both temporary js classes using classList.remove()
        -setTimeout() to remove message
        -remove temporary classs
      */
      
      flashAddedMessage(productId);
    });
  });

  
  