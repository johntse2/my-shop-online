
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
            $${product.priceCents/100}
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id = '${product.id}'>
            Add to Cart
          </button>
        </div>`;

})

productGrid = document.querySelector('.js-product-grid').innerHTML = productsHTML;

const buttons = document.querySelectorAll('.add-to-cart-button')

buttons.forEach((button) =>{
    
    button.addEventListener('click', ()=>{
      let productId =  button.dataset.productId
        
      let matchingItem; 
     
        cart.forEach((cartItem) =>{
           
           if(productId === cartItem.productId) {
             matchingItem = cartItem;
                
           }
        })

        const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`)
      
        
        let quantity = Number(quantitySelect.value)
       
      

        if(matchingItem){
            matchingItem.quantity += quantity;
            
                    } 
        else{
            cart.push({
                productId: productId,
                quantity:quantity
                    }) 
                
            }
      

    const cart_quantity = document.querySelector('.cart-quantity');

      let totalQuantity = 0;
   
      cart.forEach((item)=>{
        totalQuantity = totalQuantity + item.quantity 
      })

    cart_quantity.innerHTML = totalQuantity
    console.log(totalQuantity);
    })
})










