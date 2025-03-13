import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

// Jasmine testing framework

describe('test suite: addToCart', () => {
  // 16.e
  beforeEach(() => {
    // We also want to mock localStorage's setItem() function to avoid saving to cart permanently
    spyOn(localStorage, 'setItem'); // setItem() will be replaced with a fake version
  });

  it('adds an existing product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);


    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // 16.c
    // Verify that setItem was called with the correct cart data
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    
  });

  it('adds a new product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => { // mocking localStorage's getItem() method, mock let us replace a method with a fake version and we can make the fake version to do anything we want
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    // To check if setItem() was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

    // 16.d
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
});