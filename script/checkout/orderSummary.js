import { cart, removeFromCart, updatedCartQuantity, updatedDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js"
import { formatCurrency } from "../utils/money.js"
import { renderPaymentSummary } from "./paymentSummary.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


export function renderOrderSummary(){

    window.togglePopup = function(popupId){
        document.getElementById(popupId).classList.toggle("active");
    }


    let cartSummaryHTML = '';
    let cartPopupHTML = '';


    cart.forEach((cartItem) => {

        const productId = cartItem.productId;
        let quantityNumberHTML = '';
        let quantityOptionsHTML = '';
        let quantitySelectHTML = '';

        const matchingProduct = getProduct(productId);

        function quantityOption(){
            for(let i = 1; i <= 9; i++) {
                quantityOptionsHTML += `
                    <option value="${i}" ${cartItem.quantity === i ? 'selected' : ''}>${i}</option>   
                `;
            }
            quantityOptionsHTML += `<option value="10+" ${cartItem.quantity >= 10 ? 'selected' : ''}>10+</option>`;
            return quantityOptionsHTML;
        }

        
        quantitySelectHTML += `
        <select class="quantity" data-automation="quantity-select" aria-labelledby="quantity-select-f2f94e45-f06e-41fa-92e4-d63b8a1f0340" id="quantity-${cartItem.productId}">
            ${quantityOption()}
        </select>`;

        quantityNumberHTML += `<input value="${cartItem.quantity}"></input>`;

        function quantity() {
            if (cartItem.quantity >= 10) {
                return quantityNumberHTML;
            } else {
                return quantitySelectHTML;
            }
        }


        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        
        cartSummaryHTML += `
            <div class="main__cart__product__filler js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="main__cart__product__s1">
                    <div class="main__cart__product__image">
                        <img src="${matchingProduct.image}" alt="product in bag">
                    </div>
                    <div class="main__cart__product__info">
                        <div class="main__cart__product__info__full">
                            <div class="main__cart__product__info__not__full">
                                <h3>${matchingProduct.name}</h3>
                                <p>${matchingProduct.description}</p>
                                <p>Gaming PC</p>
                                <div class="main__cart__product__info__quantity">
                                    <p>Quantity</p>
                                    <div class="main__cart__quantity js-product-quantity-${matchingProduct.id}">
                                        ${quantity()}
                                    </div>
                                </div>
                            </div>
                            <div class="main__cart__product__info__price">
                                <p>€${formatCurrency(matchingProduct.priceCents)}</p>
                            </div>
                        </div>
                        <div class="main__cart__product__delete" data-product-id="${matchingProduct.id}">
                            <img class="main__cart__product__delete__image js-delete-link-${matchingProduct.id}" src="/images/trash.png" alt="delete">
                        </div>
                    </div>
                </div>
                <div class="main__cart__product__s2">
                    <div class="main__cart__product__delivery">
                        <h4>Delivery</h4>
                        <p>You can <button class="main__cart__product__choose" onclick="togglePopup('popup-${cartItem.productId}')">choose</button> the speed of delivery</p>
                    </div>
                    <div class="popup__delivery__date">
                        <p>Delivery Date: ${dateString}</p>
                    </div>
                </div>
            </div>   
        `;

        document.getElementById(`quantity-${cartItem.productId}`).amount.addEventListener('click', () => {
            if(quantityOption >= 1){
                cartItem.quantity = quantityOption();
                renderOrderSummary();
                renderPaymentSummary();
            }
        })
        console.log(cart);

        function deliveryOptionsHTML(matchingProduct, cartItem) {
            let deliveryOptionsArrayHTML = '';
        
            deliveryOptions.forEach((deliveryOption, index) => {
                
                const today = dayjs();

                const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

                const dateString = deliveryDate.format('dddd, MMMM D');

                const priceString = deliveryOption.priceCents === 0
                    ? 'FREE'
                    : `€${formatCurrency(deliveryOption.priceCents)} -`;
        
                const optionId = `option${index + 1}-${cartItem.productId}`;
                const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        
                deliveryOptionsArrayHTML += `
                    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" id="${optionId}" data-cart-item-id="${cartItem.productId}" ${index === 0 ? 'checked' : ''}>
                        <label for="${optionId}">
                            <div class="delivery__option__info">
                                <div class="delivery-option-date">
                                    ${dateString}
                                </div>
                                <div class="delivery-option-price">
                                    ${priceString} Shipping
                                </div>
                            </div>
                        </label>
                    </div>
                `;
            });
        
            return deliveryOptionsArrayHTML;
        }
        

        cartPopupHTML +=`
            <div class="popup" id="popup-${cartItem.productId}">
                <div class="overlay">

                </div>
                <div class="content">
                    <div class="close-btn" onclick="togglePopup('popup-${cartItem.productId}')">
                        &times;
                    </div>
                    <h2>Shipping options</h2>
                    <div class="delivery-options" data-delivery-option-id="${cartItem.productId}">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', cartPopupHTML);
    });


    document.querySelector('.main__cart__product').innerHTML = cartSummaryHTML;

    document.querySelector('.pop__js').innerHTML = cartPopupHTML;


    document.querySelectorAll('.main__cart__product__delete').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.remove();

            renderPaymentSummary();
        });
    });


    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updatedDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    updatedCartQuantity();
}