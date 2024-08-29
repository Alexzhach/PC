export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));
    
    if(!cart){
        cart = [];
    }
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
    
export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if(matchingItem){
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })

    cart = newCart;

    saveToStorage();
}

export function updatedCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });

    document.querySelector(".cart__quantity").innerHTML = cartQuantity;

    if(cartQuantity >= 100){
        cartQuantity = '99+';
    };
}

export function updatedDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })
    
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}