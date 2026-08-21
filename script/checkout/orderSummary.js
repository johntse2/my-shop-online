
import { getProduct, products } from "../../data/products.js";
import {cart, calculateCartQuantity, updateQuantity, updateDeliveryOption, removeFromCart} from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
    let cartSummaryHTML = "";
    //將儲存在localStorage的商品loop一次，發現有data裡的商品一致產生一個變數matching product
    cart.forEach((cartItem) => {

        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId)
        var dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML +=

            `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                        <div class="delivery-date">
                            Delivery date: ${dateString}
                        </div>

                        <div class="cart-item-details-grid">
                        <img class="product-image"
                            src="${matchingProduct.image}">

                        <div class="cart-item-details">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-price">
                                ${matchingProduct.getPrice()}
                            </div>
                            
                            <div class="product-quantity">
                                <span>
                                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary js-updated-link" data-product-id ='${matchingProduct.id}'>
                                    Update
                                </span>
                                <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
                                <span class = "save-quantity-link link-primary js-save-link" data-product-id ='${matchingProduct.id}'>save</span>
                                <span class="delete-quantity-link link-primary js-delete-link"  data-product-id = '${matchingProduct.id}'>
                                    Delete
                                </span>
                            </div>
                        </div>

                        <div class="delivery-options">
                            <div class="delivery-options-title">
                                Choose a delivery option:
                            </div>
                        ${deliveryOptionHTML(matchingProduct, cartItem)}
                            
                            
                        </div>
                        </div>
                    </div>;
            `;

    })
    //以下
    //1 loop through the delivery option
    //2 generate html
    //3 combine the html
    function deliveryOptionHTML(matchingProduct, cartItem) {
        let html = "";
        deliveryOptions.forEach((option) => {
        var dateString = calculateDeliveryDate(option)
            //delivery price
            const priceString = option.priceCent === 0 
                ? 'free'
                : `$${formatCurrency(option.priceCent)}`;

            const ischecked = option.id === cartItem.deliveryOptionId;
            html +=
                `
                <div>
                        <div class="delivery-option js-delivery-option"
                            data-product-id = '${matchingProduct.id}'
                            data-delivery-option-id = '${option.id}'
                            >
                            <input type="radio"
                            ${ischecked ? 'checked' : ''}
                                class="delivery-option-input"
                                name="${matchingProduct.id}">

                            <div>
                                <div class="delivery-option-date">
                                ${dateString}
                                </div>
                                <div class="delivery-option-price">
                                ${priceString} - Shipping (${option.deliveryTime} days)
                                </div>
                            </div>
                            </div>
                </div>
            `

        })
        return html;
    }
    //將localStorage裡的data結合成HTML顯示在page
    let order_Summary = document.querySelector('.order-summary');
    order_Summary.innerHTML = cartSummaryHTML;

    //delete product
    let deleteButton = document.querySelectorAll('.js-delete-link')
    deleteButton.forEach((deletebtn) => {
        deletebtn.addEventListener('click', () => {
            const deleteProductId = deletebtn.dataset.productId
            removeFromCart(deleteProductId);
            //const container = document.querySelector(`.js-cart-item-container-${deleteProductId}`);
            //container.remove();
            //用MVC代替
            updateCartQuantity();
            renderPaymentSummary();
            renderOrderSummary();
        })

    })

    //checkout header
    updateCartQuantity();
    function updateCartQuantity() {

        const totalQuantity = calculateCartQuantity();
        const checkout_qty = document.querySelector('.js-checkout-quantity')
        checkout_qty.innerHTML = `${totalQuantity} items`;
    }



    //update button
    const updateButton = document.querySelectorAll(".js-updated-link").forEach((link) => {
        link.addEventListener("click", () => {
            const updatedProductId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${updatedProductId}`)
            container.classList.add('is-editing-quantity')
        }


        )
    })
    //save button
    document.querySelectorAll('.js-save-link').forEach(link => {

        link.addEventListener('click', () => {

            const saveProductID = link.dataset.productId;
            //save input
            const quantityInput = document.querySelector(`.js-quantity-input-${saveProductID}`);
            handleUpdateQuantity(saveProductID, quantityInput);
            quantityInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    console.log(1213);
                    //handleUpdateQuantity(saveProductID, quantityInput);
                }
            });
        })

    })

    function handleUpdateQuantity(saveProductID, quantityInput) {
        const newQuantity = Number(quantityInput.value)

        if (newQuantity <= 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }
        updateQuantity(saveProductID, newQuantity);
        updateCartQuantity();
        // document.querySelector(`.js-quantity-label-${saveProductID}`)
        //     .innerHTML = newQuantity;

        document.querySelector(`.js-cart-item-container-${saveProductID}`)
            .classList.remove('is-editing-quantity');

        renderPaymentSummary();
        renderOrderSummary();
    }
    //delivery option

    document.querySelectorAll('.js-delivery-option').forEach(element => {
        element.addEventListener('click', () => {
            //let productId = element.dataset.productId;
            //let deliveryOptionId = element.dataset.deliveryOptionId;
            //shorthand
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    })
    return null;
}
