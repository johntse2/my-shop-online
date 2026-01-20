import { products } from "../data/products.js";

function Cart(){
    const cart = {
        cartItems: undefined,
        loadFromStorage: function () {
            this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
            if (!this.cartItems) {
                this.cartItems = [
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
        },
        saveToStorage() {
            localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
        },
        //將商品加到購物車
        addTocart(productId) {
            //如果想購買的商品已存在購物車
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            })
    
            //用於array裡顯示商品全部data
            let matchingProduct;
            products.forEach((product) => {
                if (productId === product.id) {
                    matchingProduct = product;
    
                }
            })
    
            //顯示購物車的商品數量
            //const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`)
            //let quantity = Number(quantitySelect.value)
    
            if (matchingItem) { //如果加過同樣商品 quantity就會加上去
                matchingItem.quantity += 1;
            }
            else { //如果是第一次加商品，就會push一個array包含ProductID and quantity
                this.cartItems.push({
                    productId: productId,
                    name: matchingProduct.name,
                    quantity: 1,
                    deliveryOptionId: '1'
                })
            }
    
           
            this.saveToStorage()//更新購物車cart locakStorage
    
        },
        // removeFromCart
        removeFromCart(deleteProductId) {
            const newCartArray = [];//創造一個新的array
            this.cartItems.forEach((cartItem) => { //下面表達如果購物車有(不要刪除的商品)就會Push到新的arra
                if (cartItem.productId !== deleteProductId) {
                    newCartArray.push(cartItem);
                }
            })
            this.cartItems = newCartArray; //刪除了商品產生一個新的array，然後output去localStorage
            this.saveToStorage();
        },
    
        calculateCartQuantity() {
            let totalQuantity = 0;
            this.cartItems.forEach((item) => {
                totalQuantity += item.quantity
            })
            return totalQuantity;
        },
        //for save btn
        updateQuantity(saveProductID, newQuantity) {
            let matchingItem;
    
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === saveProductID) {
                    matchingItem = cartItem;
                }
            })
            if (matchingItem) {
                matchingItem.quantity = newQuantity;
            }
            this.saveToStorage()
        },
        
        //for Update Delivery Option
        //以下方法
        //loop theough the cart to find the product
        //update the delivery option if the product
    
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    matchingItem = cartItem;
                }
            })
    
            matchingItem.deliveryOptionId = deliveryOptionId;
    
            this.saveToStorage();
        }
    }

    return cart;
}

const newCart = Cart();
newCart.loadFromStorage();
console.log(newCart);













