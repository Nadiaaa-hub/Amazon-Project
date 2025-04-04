import {
  cart,
  addToCart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { Car } from "../data/car.js";
// import "../data/cart-class.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct = products.find((product) => product.id === productId);

  if (!matchingProduct) {
    console.error(`Product with ID ${productId} not found in products list`);
    return;
  }

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container" data-product-id="${
      matchingProduct.id
    }">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>
    </div>
    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}">
      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity">
          <span>Quantity: <span class="quantity-label">${
            cartItem.quantity
          }</span></span>
          <span class="update-quantity-link js-update-link link-primary" data-product-id="${
            matchingProduct.id
          }">
            Update
          </span>
            <input class="quantity-input js-quantity-input-${
              matchingProduct.id
            }">
            <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
               </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input" name="delivery-option-${
            matchingProduct.id
          }">
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option-${
            matchingProduct.id
          }">
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option-${
            matchingProduct.id
          }">
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    if (container) {
      container.remove();
    }

    updateCartQuantity();
  });
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${cartQuantity} items`;
  document.querySelector(".quantity-label").innerHTML = updateCartQuantity();
  updateCartQuantity();
}

updateCartQuantity();

const updateLink = document
  .querySelectorAll(".js-update-link")
  .forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity ");
    });
  });

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
  });
});

const keyDown = document.addEventListener("keydown", function (event) {
  if (event === "Enter") {
    console.log(updateLink);
  }
});
