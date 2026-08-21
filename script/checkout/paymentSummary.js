import { cart, calculateCartQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
import { addOrder } from "../../data/order.js";
export function renderPaymentSummary() {
  //let productId = element.dataset.productId;
  //let deliveryOptionId = element.dataset.deliveryOptionId;
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach(cartItem => {

    const matchingProduct = getProduct(cartItem.productId);
    const priceCent = matchingProduct.priceCents;
    const quantity = cartItem.quantity;
    productPriceCents += priceCent * quantity; //計算購物車的價錢

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCent //計算運費的價錢
  }
  )
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents ;
  let paymentQuantity = 0;

  const paymentSummaryHTML =
    `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class = "js-payment-itemQuantity">Items (<a class="js-payment-quantity"></a>):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
          `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  //payment-items-quantity
  document.querySelector(".js-payment-quantity").innerHTML = calculateCartQuantity();


  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        console.log(order);
        addOrder(order);

      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }
     window.location.href = 'orders.html';
    });

}

