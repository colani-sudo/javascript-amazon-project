// export enables this variable to be accessed from outside of this file
export let cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}]; // Normalizing or deduplicating the data

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const selectedElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(selectedElement.value);
  
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      // productId: productId,
      // quantity: selectedValue
      productId,    // shorthand property
      quantity
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
}