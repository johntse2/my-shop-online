export let cart = [
    
    {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    name :'Cotton Socks'

    },

    {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    name : 'Basketball'


    }
 
];

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
  
  }

  export function removeFromCart(deleteProductId){
     
    const newCartArray = [];
    cart.forEach((cartItem) =>{
      if(cartItem.productId !== deleteProductId){

        newCartArray.push(cartItem);
      
       
        cart = newCartArray;
        console.log(cartItem.productId); 
        // const order_Summary= document.querySelector ('.order-summary');
        // order_Summary.classList.add(`.js-cart-item-container-${cartItem.productId}`)
      }
    })
  
   
  }