export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [ ];
}
console.log(cart);



function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))

}
//將物品加到購物車
export function addTocart(productId){

    //加入同一件物件做法
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
    saveToStorage()
  
  }

  export function removeFromCart(deleteProductId){
     
    const newCartArray = [];
    cart.forEach((cartItem) =>{
      if(cartItem.productId !== deleteProductId){

        newCartArray.push(cartItem);

        // const order_Summary= document.querySelector ('.order-summary');
        // order_Summary.classList.add(`.js-cart-item-container-${cartItem.productId}`)
      }
    })

    cart = newCartArray;
    saveToStorage();
    console.log(cart);
   
  }