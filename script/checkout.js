
import { products } from "../data/products.js";
import { cart,removeFromCart,calculateCartQuantity } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";


let cartSummaryHTML = "";
//將儲存在localStorage的商品loop一次，發現有data裡的商品產生一個變數matching product
cart.forEach((cartItem) =>{
    let matchingProduct;

    const cartItemId = cartItem.productId;
    //products 是指produst list裡面，這樣可以取得product所有資料，用於下面
    products.forEach((product)=>{
      if(cartItemId === product.id){
        matchingProduct = product;
     
    }  
})
        cartSummaryHTML  +=

        `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                    </div>

                    <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-updated-link"  data-product-id = '${matchingProduct.id}'>
                            Update
                        </span>
                        <input class = "quantity-input">
                        <span class = "save-quantity-link link-primary">save </span>
                        <span class="delete-quantity-link link-primary js-delete-link"  data-product-id = '${matchingProduct.id}'>
                            Delete
                        </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                        <input type="radio" checked
                            class="delivery-option-input"
                            name="${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                            Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                            FREE Shipping
                            </div>
                        </div>
                        </div>
                        <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                            Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                            $4.99 - Shipping
                            </div>
                        </div>
                        </div>
                        <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                            Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                            $9.99 - Shipping
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>;
        `;

        })

//將localStorage裡的data結合成HTML顯示在page
let order_Summary= document.querySelector ('.order-summary');
order_Summary.innerHTML = cartSummaryHTML ;

//delete product
let deleteButton = document.querySelectorAll('.js-delete-link') 
    deleteButton.forEach((deletebtn) =>{
        deletebtn.addEventListener('click',()=>{
            const deleteProductId = deletebtn.dataset.productId
            removeFromCart(deleteProductId);
        
            const container = document.querySelector(`.js-cart-item-container-${deleteProductId}`);
            container.remove();
            updateCartQuantity()

    })

})


function updateCartQuantity() {
// let totalQuantity = 0;

//   cart.forEach((item)=>{
//     totalQuantity = totalQuantity + item.quantity 
//   })
 const totalQuantity = calculateCartQuantity();
 const checkout_qty = document.querySelector('.js-checkout-quantity')
 checkout_qty.innerHTML = `${totalQuantity} items` ;
}

updateCartQuantity();

//update
const updateButton = document.querySelectorAll(".js-updated-link").forEach((link)=>{
    link.addEventListener("click", ()=>{
       const updatedProductId = link.dataset.productId;
        console.log(updatedProductId);
    }
        

    )
})


