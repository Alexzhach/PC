import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '84c7850d-bc08-4acb-8c80-58cc62e1bdd0',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('84c7850d-bc08-4acb-8c80-58cc62e1bdd0');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('84c7850d-bc08-4acb-8c80-58cc62e1bdd0');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('84c7850d-bc08-4acb-8c80-58cc62e1bdd0');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('84c7850d-bc08-4acb-8c80-58cc62e1bdd0');
        expect(cart[0].quantity).toEqual(1);
    });
});