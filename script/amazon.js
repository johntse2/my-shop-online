 
import {cart, addTocart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js'
import {formatCurrency} from'./utils/money.js';

//先製造一個空白字串，然後loop一下商品，將它們都放在HTML
let productsHTML = '';
products.forEach((product)=>{

productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              87
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class='js-quantity-selector-${product.id}'>
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

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id = '${product.id}'>
            Add to Cart
          </button>
        </div>`;

})


//改變商品數量function
function updateCartQuantity(productId){
  
const cart_quantity = document.querySelector('.cart-quantity');

const totalQuantity = calculateCartQuantity();

cart_quantity.innerHTML = totalQuantity;

  //add 'added to cart' msg
//   const addMsg = document.querySelector(`.js-added-${productId}`)
//   addMsg.classList.add('added-to-cart-visible');

 
//  const timeout = setTimeout(() =>{
//     addMsg.classList.remove('added-to-cart-visible');
//   }, 500)

}


//將商品內容顯示在頁面
document.querySelector('.js-product-grid').innerHTML = productsHTML;

updateCartQuantity();
//'click' button 將商品加到購物車
const buttons = document.querySelectorAll('.add-to-cart-button')
buttons.forEach((button) =>{
    
    button.addEventListener('click', ()=>{
    let productId =  button.dataset.productId
    
    addTocart(productId);
    updateCartQuantity(productId);
console.log(cart);

    })
})











