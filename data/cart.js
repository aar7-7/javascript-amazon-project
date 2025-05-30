import { deliveryOption } from "./deliveryOpttion.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// if (!cart) {
//   cart = [
//     {
//       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//       quantity: 2,
//     },
//     {
//       productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//       quantity: 1,
//     },
//   ];
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// Function to add item to cart
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({ productId: productId, quantity: 1, deliveryOption: "1" });
  }

  // Update localStorage after modifying cart
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart quantity display
  let cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}

// Function to remove item from cart
export function removeFromCart(productId) {
  let index = cart.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    cart.splice(index, 1);

    // Update localStorage after modifying cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Remove item from the DOM
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    if (container) {
      container.remove();
    }
  }
}
