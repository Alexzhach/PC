import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js"
import { formatCurrency } from "../utils/money.js"


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) =>{
        const product = getProduct(cartItem.productId)
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    })

    const taxCents = productPriceCents * 0.1;
    const totalCents = productPriceCents + taxCents + shippingPriceCents;

    const paymentSummaryHTML = `
    <div class="main__cart__pay__div">
        <h3>Summary</h3>
        <div class="main__cart__pay__subtotal">
            <p>Subtotal</p>
            <p>€${formatCurrency(productPriceCents)}</p>
        </div>
        <div class="main__cart__pay__shipping">
            <p>Estimated shipping & handling</p>
            <p>€${formatCurrency(shippingPriceCents)}</p>
        </div>
        <div class="main__cart__pay__tax">
            <p>Estimated tax</p>
            <p>€${formatCurrency(taxCents)}</p>
        </div>
        <div class="main__cart__pay__total">
            <p>Total</p>
            <p>€${formatCurrency(totalCents)}</p>
        </div>
        <div class="main__cart__pay__buy">
            <button>Checkout</button>
        </div>
    </div>
    `;

    document.querySelector('.main__cart__pay').innerHTML = paymentSummaryHTML;
}