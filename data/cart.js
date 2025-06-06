import { products } from "../data/products.js";
import { deliveryOption } from "./deliveryOption.js";
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
   
     {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:3,
    deliveryOptionId:'1'
  },
     {
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity:2,
    deliveryOptionId:'2'
  }
   ];
}
console.log(cart);


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))

}
//將商品加到購物車
export function addTocart(productId){

    //加入同一件商品做法
    let matchingItem; 
    cart.forEach((cartItem) =>{
       //如果想購買的商品已存在購物車
       if(productId === cartItem.productId) {
         matchingItem = cartItem;
      
        
       }
    })

    //用於array裡顯示商品全部data
    let matchingProduct; 
    products.forEach((product)=>{
      if(productId === product.id){
        matchingProduct = product;
        
        }  
      })


  //取得加到購物車的商品數量
   const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`)
   let quantity = Number(quantitySelect.value)
  //如果加過同樣商品 quantity就會加上去
    if(matchingItem){
        matchingItem.quantity += quantity;
      
        
                } 
  //如果是第一次加商品，就會push一個array包含ProductID and quantity
    else{
        cart.push({
          
            productId: productId,
            name:matchingProduct.name,
            quantity:quantity,
            deliveryOptionId:1
        
                }) 
         
            
        }


    saveToStorage()//更新購物車cart locakStorage
  
  }
// removeFromCart
  export function removeFromCart(deleteProductId){
    //創造一個新的array
    const newCartArray = [];
    //下面表達如果購物車有(不要刪除的商品)就會Push到新的array
    cart.forEach((cartItem) =>{
      if(cartItem.productId !== deleteProductId){

        newCartArray.push(cartItem);
      }
    })
    //刪除了商品產生一個新的array，然後output去localStorage
    cart = newCartArray;
    saveToStorage();
   

   
  }

  export function calculateCartQuantity(){
  let totalQuantity = 0;

  cart.forEach((item)=>{
    totalQuantity = totalQuantity + item.quantity 
     
  })
   return totalQuantity;
  }

 export function updateQuantity(saveProductID, newQuantity){
      let matchingItem;
    
   cart.forEach((cartItem)=>{
      if (cartItem.productId === saveProductID){
        matchingItem = cartItem;
      }
    })
       if(matchingItem){
          matchingItem.quantity = newQuantity;
        
          
        }
    saveToStorage()
  }