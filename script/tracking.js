import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct } from "../data/products.js";
import { getOrder } from "../data/order.js";
import {calculateCartQuantity} from "../data/cart.js"

async function loadPage() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const matchingOrder = getOrder(orderId);
    let orderProduct;
    matchingOrder.products.forEach(product => {
        if (product.productId == productId) {
            orderProduct = product
        }
    })
    console.log(orderProduct);
    const matchingProduct = getProduct(productId);

     //calculate the percentage
    const currentTime =  dayjs();
    const orderTime = dayjs(matchingOrder.orderTime);
    const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime);
    const percentProgress = ((currentTime - orderTime)/(deliveryTime - orderTime) ) * 100;
    console.log("today:", currentTime);
    console.log("orderTime: ", orderTime );
    console.log("deliveryTime :" , deliveryTime );
    
    
    
    console.log(percentProgress);
    
    let trackingContent = "";
    trackingContent =
        `<a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
    </a>

    <div class="delivery-date">
    Arriving on ${dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D')}
    </div>

    <div class="product-info">
    ${matchingProduct.name}
    </div>

    <div class="product-info">
    Quantity: ${orderProduct.quantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
    <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
    Preparing
    </div>
    <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
    Shipped
    </div>
    <div class="progress-label  ${
        percentProgress >= 100 ? "current-status" : ''
      }">
    Delivered
    </div>
    </div>

    <div class="progress-bar-container">
    <div class="progress-bar" style="width: ${percentProgress}%";></div>
    </div>
    `
    document.querySelector('.js-order-tracking').innerHTML = trackingContent;
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

   
    


}
loadPage();