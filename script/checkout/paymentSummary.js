import { cart, calculateCartQuantity, updateQuantity, saveToStorage, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";

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
        const totalCents = productPriceCents + shippingPriceCents + totalBeforeTaxCents;

  
    const paymentSummaryHTML = 
        `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
          `

        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
          
}
