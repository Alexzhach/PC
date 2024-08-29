function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
    
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            
            if(!this.cartItems){
                this.cartItems = [{
                    productId: '84c7850d-bc08-4acb-8c80-58cc62e1bdd0',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '7b0402e4-8e5f-4c83-adab-584fe2850bb3',
                    quantity: 11,
                    deliveryOptionId: '2'
                }];
            }
        },
    
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        
        addToCart(productId){
            let matchingItem;
    
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
    
            if(matchingItem){
                matchingItem.quantity += 1;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
    
            this.saveToStorage();
        },
    
        removeFromCart(productId){
            const newCart = [];
        
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId !== productId){
                    newCart.push(cartItem);
                }
            })
        
            this.cartItems = newCart;
        
            this.saveToStorage();
        },
    
        updatedDeliveryOption(productId, deliveryOptionId){
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            })
            
            matchingItem.deliveryOptionId = deliveryOptionId;
        
            this.saveToStorage();
        },
    
        updatedCartQuantity(){
            let cartQuantity = 0;
        
            this.cartItems.forEach((item) => {
                cartQuantity += item.quantity;
            });
        
            document.querySelector(".cart__quantity").innerHTML = cartQuantity;
        
            if(cartQuantity >= 100){
                cartQuantity = '99+';
            };
        }
    }

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)