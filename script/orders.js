
import { orders } from "../data/order.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { addTocart, calculateCartQuantity} from  "../data/cart.js"

function renderOrderSummary() {
  let orderHTML = "";

  orders.forEach(order => {
    console.log(order);
    var orderDate = dayjs(order.orderTime)
    const dateString = orderDate.format('MMM D (ddd)');

    orderHTML +=

      ` <div class="order-container">
      <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
             <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `

  })

  function productsListHTML(order) {
    let productsListHTML = "";
    order.products.forEach(product => {
      const matchingProduct = getProduct(product.productId);
      const dateString = dayjs(product.estimatedDeliveryTime).format('DD MMM YYYY');
      const quantity = product.quantity
      console.log(matchingProduct);
     
      productsListHTML +=
        ` <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
              Arriving on: ${dateString}
              </div>
              <div class="product-quantity">
                Quantity:  ${quantity}
              </div>
              <button class="buy-again-button  button-primary js-buy-again data-product-id="${matchingProduct.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message ">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
      `
    })
    return productsListHTML;
  }

  document.querySelector('.js-order-grid').innerHTML = orderHTML;
  document.querySelectorAll('.js-buy-again').forEach((button) =>{
     button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    addTocart(productId);
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
  })
  })

  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

}
renderOrderSummary();