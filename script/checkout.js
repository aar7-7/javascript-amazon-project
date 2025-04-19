import {products} from "../data/products.js";
import {cart, removeFromCart} from "../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOption } from "../data/deliveryOpttion.js";
let productHTML = "";
let checkoutSum = 0;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingItem;
  checkoutSum += 1;

  products.forEach((prduct) => {
    if (prduct.id === productId) {
      matchingItem = prduct;
    }
  });
  console.log(matchingItem);

  productHTML += `
        <div class="cart-item-container js-cart-item-container-${
          matchingItem.id
        }">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                    matchingItem.id
                  }">
                    Update
                    <div class="quantity-edit-container js-quantity-edit-container-${
                      matchingItem.id
                    }">
                    <input class="quantity-input primary-link" />
                    <span class="save-quantity-link primary-link">Save</span>
                    </div>
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-delete-link='${
                    matchingItem.id
                  }'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${DeliveryOptionsHTML(matchingItem)}
                
              </div> 
            </div>
          </div>
    `;
});
function DeliveryOptionsHTML(matchingItem) {
  let html = "";
  deliveryOption.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const deliveryString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE -"
        : `${deliveryOption.priceCents / 100} - `;

    html += `
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryString} Shipping
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
                `;
  });
  return html;
}

document.querySelector(".order-summary").innerHTML = productHTML;
document.querySelector(".js-return-to-home-link").innerHTML = checkoutSum;
document.querySelectorAll(".js-delete-link").forEach((button) => {
  let productId = button.dataset.deleteLink;

  button.addEventListener("click", () => {
    removeFromCart(productId);
  });
});
document.querySelectorAll(".js-update-quantity-link").forEach((button) => {
  let productId = button.dataset.productId;
  button.addEventListener("click", () => {
    const itemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    itemContainer.classList.add("is-editing-quantity");
    const inputContainer = document.querySelector(
      `.js-quantity-edit-container-${productId}`
    );
    if (inputContainer) {
      inputContainer.style.display = "block"; // or "block", based on layout
    }
  });
});
