import { getProduct, products } from "../data/products.js";
import {calculateCartQuantity, updateCartQuantity, addTocart} from "../data/cart.js";
const url = new URL(window.location.href);
const productId = url.searchParams.get('productId');
console.log(productId);


const product = getProduct(productId);

let productContent = "";
productContent += `
    
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
   
      <div class="productInfo">
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarUrl()}">
          <span class="product-rating-count link-primary">
             ${product.rating.count}
          </span>
          <span class="review-count">128 則評論</span>
        </div>

        <div class="product-price">
          <span class="current-price">${product.getPrice()}</span>
        </div>

        <div class="product-quantity-container">
          <span class="quantity">Quantity</span>
          <select id='selectQuantity' class='js-quantity-selector-${product.id}'>
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

         <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>
        <button class="add-to-cart-button button-primary" data-product-id='${product.id}'>
          Add to Cart
        </button>
      </div>
`

document.querySelector('.product-container').innerHTML = productContent ;
document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
//'click' button 將商品加到購物車
const button = document.querySelector('.add-to-cart-button')

  button.addEventListener('click', () => {
    
    addTocart(productId);
    updateCartQuantity(productId);

     //add 'added to cart' msg
    const addedMessage = document.querySelector(`.added-to-cart-${productId}`)
    addedMessage.classList.add('added-to-cart-visible');

    setTimeout(() =>{
      addedMessage.classList.remove('added-to-cart-visible');
    }, 700)

  })

  let productDescription = "";
  productDescription += `
    <div class="detail-tabs">
    <button class="tab-btn active">Product Info</button>
  </div>
  <div class="tab-content">
    <h3>Product Description</h3>
    <p>${product.desciption}</p>

    <br>
    <p>📐 Product Size：120cm (length) × 50cm (width) × 180cm (Height)</p>
    <p>📦 Packing：Main component × 1, Accessory pack × 1, Instruction manual × 1</p>
    <p>🚚 Delivery：Nationwide delivery, free or charged delivery based on time, delivery within 0-7 business days after order placement.</p>
  </div>
  `

  document.querySelector('.product-details').innerHTML = productDescription;


  let relatedProducts = "";
  relatedProducts = 
  ` <div class="detail-tabs">
    <button class="tab-btn active">Related Product</button>
  </div>
  <div class="products-scroll-container">
    <div class="products-scroll">
    ${productCards()}
    </div>
  </div>
  `

  function productCards(){
    let productHtml = "";
    let tempProducts = [...products]; 
   for (let i = 0; i < 4; i++) {
    // 如果產品被抽光了就提早結束
    if (tempProducts.length === 0) break;
    const index =  Math.floor(Math.random() * tempProducts.length); 
    const relatedProduct = tempProducts.splice (index, 1) [0];
      productHtml += 
      `
          <div class="product-card">
          <a href="item.html?productId=${relatedProduct.id}">
             <div class="product-card-image-container">
              <img class = "product=image" src="${relatedProduct.image}">
             </div>
          </a>
          <div class="info">
            <div class="name">${relatedProduct.name}</div>
            <div class="price">${relatedProduct.getPrice()}</div>
          </div>
        </div>
      `
    
    }
    return productHtml;

  }

  document.querySelector('.related-products').innerHTML = relatedProducts;

 
