import {cart, addToCart, updatedCartQuantity} from '/data/cart.js';

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productImage = params.get('image');
    const productName = params.get('name');
    const productAvailability = params.get('availability');
    const productGraphicsCard = params.get('graphicsCard');
    const productProcessor = params.get('processor');
    const productRam = params.get('ram');
    const productDrive = params.get('drive');
    const productMotherBoard = params.get('motherBoard');
    const productPowerSupply = params.get('powerSupply');
    const productPriceCents = params.get('price');

    const productDetailsContainer = document.getElementById('product-details');
    productDetailsContainer.innerHTML = `
        <div class="main__product__description">
            <div class="main__product__image">
                <img src="${productImage}" alt="A picture of a product">
            </div>
            <div class="main__product__info">
                <div class="main__product__header">
                    <h1>${productName}</h1>
                </div>
                <div class="main__product__availability">
                    <p>Availability: ${productAvailability}</p>
                </div>
                <div class="main__product__characteristics">
                    <li>Graphics card: ${productGraphicsCard}</li>
                    <li>Processor: ${productProcessor}</li>
                    <li>RAM: ${productRam}</li>
                    <li>Storage: ${productDrive}</li>
                    <li>Motherboard: ${productMotherBoard}</li>
                    <li>Power supply: ${productPowerSupply}</li>
                </div>
                <div  class="main__product__price">
                    <span>${productPriceCents}€</span>
                </div>
                <div class="main__product__buttons">
                    <button type="button" class="main__product__cart" data-product-id="${productId}">Add to cart</button>
                    <button class="main__product__buy">Buy</button>
                </div>
                <div class="main__product__delivery">
                    <p class="main__product__delivery__header">Delivery:</p>
                    <p class="main__product__dhl">Delivery via DHL or pickup in our <a href="map.html">store</a></p>
                </div>
            </div>
        </div>
        `;


    
        
    document.querySelectorAll('.main__product__cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;   
            addToCart(productId);
            updatedCartQuantity();
        });
    });
};

updatedCartQuantity();
