export const cart = [
    
    {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1

    },

    {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1

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