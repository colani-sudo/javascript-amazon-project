import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

// Integration test - test how our page behaves
// Testing a page, we test for: 1. How the page looks 2. How the page behaves 
describe('test suite: renderOrderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // Hooks in Jasmine - allows us to share the code before each test and removes duplication
  /* 
     beforeEach() = runs code before each test
     afterEach() = runs code after each test
     beforeAll() = runs code before all tests
     afterAll() = runs code after all tests
  */

     beforeAll((done) => {  // done() - waits for loadProducts() to finish
      loadProductsFetch().then(() => {
        done();
      });
     });
  beforeEach(() => {  // a beforeEach hook, done() can also be used here
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  // 16.f
  afterEach(() => {
    // remove the HTML after the test
    document.querySelector('.js-test-container').innerHTML = `
    `;
  });

  it('displays the cart', () => { // done() can also be used here

      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
      expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
      expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
      
    });

    it('removes a product', () => {
      
      document.querySelector(`.js-delete-link-${productId1}`).click();

      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
      expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
      expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual(productId2);

    });
});

