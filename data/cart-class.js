import { loadFromStorage } from "./cart.js";

class Cart {

  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: 1
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: 1
      }]; // Normalizing or deduplicating the data
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    const selectedElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = selectedElement ? Number(selectedElement.value) : 1;
    
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        // productId: productId,
        // quantity: selectedValue
        productId,    // shorthand property
        quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let counter = 0;
    this.cartItems.forEach((cartItem) => {
      counter += cartItem.quantity;
    });
    return counter;
  }

  updateCartQuantity() {
    document.querySelector('.js-cart-quantity')
      .innerHTML = this.calculateCartQuantity() === 0? '': this.calculateCartQuantity();
  }

  refreshCheckout() {
    if (this.calculateCartQuantity() === 0) {
      document.querySelector('.js-checkout-header-middle-section')
      .innerHTML = `Checkout ()`;
    } else {
      document.querySelector('.checkout-header-middle-section')
        .innerHTML = `Checkout ( <a class="return-to-home-link"
              href="amazon.html">${this.calculateCartQuantity()} items</a>)`;
    }
  }

  updateQuantity(productId) {
  
    const inputField = document.querySelector(`.js-quantity-input-${productId}`);
    inputField.classList.add('is-editing-quantity');
    const saveBtn = document.querySelector(`.js-save-quantity-link-${productId}`);
    saveBtn.classList.add('is-editing-quantity');
  
    // Make Update and the quantity value disappear
    const updateBtn = document.querySelector(`.js-update-quantity-${productId}`);
    updateBtn.classList.add('js-update-quantity-link');
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.classList.add('js-quantity-label');
  
    // Remove existing event listeners (to prevent duplicates)
    saveBtn.replaceWith(saveBtn.cloneNode(true));
  
  
    // Save the new quantity value
    const newSaveBtn = document.querySelector(`.js-save-quantity-link-${productId}`)
    newSaveBtn.addEventListener('click', () => {
      const newQuantity = Number(inputField.value);
  
      if (!newQuantity) { // if no data remove input and save elements
        inputField.classList.remove('is-editing-quantity');
        newSaveBtn.classList.remove('is-editing-quantity');
        updateBtn.classList.remove('js-update-quantity-link');
        quantityLabel.classList.remove('js-quantity-label');
        return;
    
      } else if (!isNaN(newQuantity) && newQuantity > 0){
          this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
              cartItem.quantity = newQuantity;
              this.saveToStorage();
            }
          });
    
        // Update the displayed quantity
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        this.refreshCheckout();
    
        // Reset the input field
        inputField.value = '';
        inputField.classList.remove('is-editing-quantity');
        newSaveBtn.classList.remove('is-editing-quantity');
        updateBtn.classList.remove('js-update-quantity-link');
        quantityLabel.classList.remove('js-quantity-label');
    
      } else {
        alert('Please enter a valid quantity.');
      }
    });
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);








