/*
Main Idea of JavaScript:
1. Save the data
2. Generate the HTML
3. Make it interactive
*/
import { cart, removeFromCart, calculateCartQuantity, saveToStorage, updateQuantity, refreshCheckout } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';  // ./ for the current folder
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

/*
named export : import { hello } from '...';
default export : import hello from '...'; on file.js the syntax is: export default filename/function name;
*/
hello();

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM, D')); // go to dayjs for more options

refreshCheckout();  // reload checkout

let cartSummaryHTML = '';


cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  
  // let matchingProduct;

  // products.forEach((product) => {
  //   if (product.id === productId) {
  //     matchingProduct = product;
  //   }
  // });
let matchingProduct = products.find(product => product.id === productId);

if (!matchingProduct) {
  console.error(`Product with ID ${productId} not found in products array.`);
  return;
}

const deliveryOptionId = cartItem.deliveryOptionId;

let deliveryOption;

// Get the full delivery option we want
deliveryOptions.forEach((option) => {
  if (option.id === deliveryOptionId) {
    deliveryOption = option;
  }
});

const today = dayjs();
const deliveryDate = today.add(
  deliveryOption.deliveryDays,
  'days'
);
const dateString = deliveryDate.format('dddd, MMMM D');

cartSummaryHTML +=
  `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity js-update-quantity-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
            Update  
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}">
            Save
          </span>
          
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
        
      </div>
    </div>
  </div>
`;

});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container){
        container.remove();
      }

      refreshCheckout();
    });
  });

  document.querySelectorAll('.js-update-quantity')
    .forEach((updateLink) => {
      updateLink.addEventListener( 'click', () => {
        const productId = updateLink.dataset.productId;
        // console.log(productId);

        // imported from ../data/cart.js
        updateQuantity(productId);
      });
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = '';
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays,
          'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
        

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html +=
        `<div class="delivery-option">
            <input type="radio" 
            ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>`;
      });
      return html;
    }

  

  

  