import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import "../data/cart-class.js";
renderOrderSummary();
renderPaymentSummary();


class book{

    item = "book";
    test(){
        console.log(213);
    }
    
    
}

const book1 = new book();
book1.test;
console.log(book1);
book1.test();


