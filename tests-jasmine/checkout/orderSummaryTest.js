import { renderOrderSummary } from "../../script/checkout/orderSummary.js"
import { loadFromStorage, cart } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
    const productId1 = "84c7850d-bc08-4acb-8c80-58cc62e1bdd0";
    const productId2 = '7b0402e4-8e5f-4c83-adab-584fe2850bb3';
    
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector(".js-test-container").innerHTML = `
            <div class="main__cart__product"></div>
            <div class="main__cart__pay"></div>
        `
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: productId2,
                quantity: 11,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
    })

    it('displays the cart', () => {
        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2)

        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('11');

        document.querySelector(".js-test-container").innerHTML = ''
    })

    it("removes from cart", () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).not.toEqual(0);
        expect(cart.length).toEqual(productId2);

        document.querySelector(".js-test-container").innerHTML = ''
    })
})