import {products} from './data/products.js';

let productsHTML = '';

products.forEach((product, index) => {
    productsHTML += `
    <div class="main__card__elements">
        <div class="main__card__image">
            <img src="${product.image}" alt="A picture of a product">
        </div>
        <div class="main__card__info">
            <button type="button" class="main__card__name" data-product-index="${index}">${product.name}</button>
            <div class="main__card__components">
                <p>${product.description}</p>
            </div>
            <span class="main__card__price">${(product.priceCents / 100).toFixed(2)}€</span>
        </div>
    </div>
    `;
});

document.querySelector('.main__card').innerHTML = productsHTML;

document.querySelectorAll('.main__card__name')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productIndex = button.dataset.productIndex;
            const selectedProduct = products[productIndex];
            window.location.href = `product.html?name=${selectedProduct.name}&id=${selectedProduct.id}&image=${selectedProduct.image}&availability=${selectedProduct.availability}&graphicsCard=${selectedProduct.graphicsCard}&processor=${selectedProduct.processor}&ram=${selectedProduct.ram}&drive=${selectedProduct.drive}&motherBoard=${selectedProduct.motherBoard}&powerSupply=${selectedProduct.powerSupply}&price=${(selectedProduct.priceCents / 100).toFixed(2)}`;
        });
    });
