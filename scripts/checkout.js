import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import '../data/cart-class.js';
// import '../data/backend-practice.js';

/* Async Await */
// Async await can only be used with promises
async function loadPage() { // async = makes a function return a promise
  // console.log('load page'); // we use await inside an async function
  try {   
    // throw 'error';       // to manually create an error
    await loadProductsFetch(); // await substitutes the .then() use

    await new Promise((resolve, reject) => {    // reject creates an error in the future
        // throw 'error2';  // another error
      loadCart(() => {
        // reject('error3');   // to throw an error in the future
        resolve();
      });
    });
  } catch(error) {
    console.log(`Unexpected error. Please try again later.${error}`);
  }
  
  renderOrderSummary();
  renderPaymentSummary();          // await - writes asynchronous code like normal code
}
loadPage().then(() => {
  console.log('next step');
});

/*
We can run multiple promises simultaneously:
  Promise.all() let us run multiple promises simultaneously and wait for all of them to finish 
*/
/*
Promise.all([
  // new Promise((resolve) => { // resolve is a function like done() in jasmine
  //   loadProducts(() => {  // we run  the function and wait
  //     resolve('value1'); // we call resolve to finish and go to the next step
  //   });
  
  // }),
  loadProductsFetch(),  // we replaced the above promise with the fetch() function
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {   // .then() adds the next step
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});

*/

/*
// ---Using a promise----flattens the code
// a promise runs the inner function immediately
new Promise((resolve) => { // resolve is a function like done() in jasmine
  loadProducts(() => {  // we run  the function and wait
    resolve('value 1'); // we call resolve to finish and go to the next step
  });

}).then((value) => {  // 'value 1' above is saved in value here
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

// ---Using a Callback----nest the code which is no good practice
/*
loadProducts(() => {  // can create an anonymous function to run in future after loadProducts
  // the functions below are saved into fun() in products.js and called back later
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

/* ---How the above code executes----
new Promise((resolve) => {  --->  loadProducts(() => {  ---> resolve(); ---> //next step.
  loadProducts(() => {  ---> renderOrderSummary(); ---> renderPaymentSummary();
*/
// Promises allow JavaScript to do multiple things at the same time

/* Async Await is a shortcut for promises
*/