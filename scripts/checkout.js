import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

loadProducts(() => {  // can create an anonymous function to run in future after loadProducts
  // the functions below are saved into fun() in products.js and called back later
  renderOrderSummary();

  renderPaymentSummary();
})

