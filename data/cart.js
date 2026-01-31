import { products, getProduct } from "../data/products.js";
export let cart = undefined;

loadFromStorage();


export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    cart = [

      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '1'
      },
      {
        productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];

  }
}




export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))

}
//將商品加到購物車
export function addTocart(productId) {

  let matchingItem;
  cart.forEach((cartItem) => {
    //如果想購買的商品已存在購物車
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })


  const matchingProduct = getProduct(productId);

  //取得加到購物車的商品數量
  const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`)
  let quantity = Number(quantitySelect.value)

  //如果加過同樣商品 quantity就會加上去
  if (matchingItem) {
    matchingItem.quantity += quantity;
  }

  //如果是第一次加商品，就會push一個array包含ProductID and quantity
  else {
    cart.push({

      productId: productId,
      name: matchingProduct.name,
      quantity: quantity,
      deliveryOptionId: '1'
    })
  }


  saveToStorage()//更新購物車cart locakStorage

}
// removeFromCart
export function removeFromCart(deleteProductId) {
  //創造一個新的array
  const newCartArray = [];
  //下面表達如果購物車有(不要刪除的商品)就會Push到新的array
  cart.forEach((cartItem) => {
    if (cartItem.productId !== deleteProductId) {

      newCartArray.push(cartItem);
    }
  })
  //刪除了商品產生一個新的array，然後output去localStorage
  cart = newCartArray;
  saveToStorage();

}

export function calculateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity

  })
  return totalQuantity;
}
//for save btn
export function updateQuantity(saveProductID, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === saveProductID) {
      matchingItem = cartItem;
    }
  })
  if (matchingItem) {
    matchingItem.quantity = newQuantity;
  }
  saveToStorage()
}

//for Update Delivery Option

//以下方法
//loop theough the cart to find the product
//update the delivery option if the product

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  })

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}





