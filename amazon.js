import { cart } from "./data/cart.js";
import { products } from "./data/products.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div>
        <select class="product-quantity-selector product-quantity-selector-${
          product.id
        }">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

let cartQuantity = 0;

document.querySelector(".js-products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const quantitySelector = document.querySelector(
      `.product-quantity-selector-${productId}`
    );
    const quantity = Number(quantitySelector.value);

    let matchingItem = cart.find((item) => item.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
      });
    }

    cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );
    if (addedMessage) {
      addedMessage.classList.add("added-to-cart-visible");
      setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-visible");
      }, 2000);
    }
  });
});
