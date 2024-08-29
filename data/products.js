export function getProduct(productId){
    let matchingProduct;
    
    products.forEach((product) => {
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    return matchingProduct;
}

class Product{
    id;
    image;
    name;
    availability;
    graphicsCard;
    processor;
    ram;
    drive;
    motherBoard;
    powerSupply;
    description;
    priceCents;

    constructor(productDetails){
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.availability = productDetails.availability;
        this.graphicsCard = productDetails.graphicsCard;
        this.processor = productDetails.processor;
        this.ram = productDetails.ram;
        this.drive = productDetails.drive;
        this.motherBoard = productDetails.motherBoard;
        this.powerSupply = productDetails.powerSupply;
        this.description = productDetails.description;
        this.priceCents = productDetails.priceCents;
    }
}

const product1 = new Product({
    id: '84c7850d-bc08-4acb-8c80-58cc62e1bdd0',
    image: '/images/pc-sale-1.png',
    name: 'The gamechanger',
    availability: 'In stock',
    graphicsCard: 'Palit NVIDIA GeForce rtx 4070',
    processor: 'Intel core i5-11370k',
    ram: 'Kingston 32gb',
    drive: 'Samsung 1TB SSD M2',
    motherBoard: 'ASUS ROG B450',
    powerSupply: 'Pure Power 12 M Modular 80+ Gold',
    description: 'rtx 4070 i5-11370k 32gb RAM 1TB SSD M2 ASUS ROG B450',
    priceCents: '130899',
    type: 'pc'
});


class Laptops extends Product {
    screenMatrice;

    constructor(productDetails){
        super(productDetails)
        this.screenMatrice = productDetails.screenMatrice;
    }
}
const laptop = new Product({
    id: 'f15bba30-c722-4454-bca5-14c18fd28ce1',
    image: '/images/pc-sale-1.png',
    name: 'Lenovo ROG Gaming',
    availability: 'Not in stock',
    graphicsCard: 'Palit NVIDIA GeForce rtx 4070',
    processor: 'Intel core i5-11370k',
    ram: 'Kingston 32gb',
    drive: 'Samsung 1TB SSD M2',
    motherBoard: 'ASUS ROG B450',
    powerSupply: 'Pure Power 12 M Modular 80+ Gold',
    description: 'rtx 4070 i5-11370k 32gb RAM 1TB SSD M2 ASUS ROG B450',
    priceCents: '130899',
    type: 'laptop',
    screenMatrice: 'OLED'
})


export const products = [{
    id: '84c7850d-bc08-4acb-8c80-58cc62e1bdd0',
    image: '/images/pc-sale-1.png',
    name: 'The gamechanger',
    availability: 'In stock',
    graphicsCard: 'Palit NVIDIA GeForce rtx 4070',
    processor: 'Intel core i5-11370k',
    ram: 'Kingston 32gb',
    drive: 'Samsung 1TB SSD M2',
    motherBoard: 'ASUS ROG B450',
    powerSupply: 'Pure Power 12 M Modular 80+ Gold',
    description: 'rtx 4070 i5-11370k 32gb RAM 1TB SSD M2 ASUS ROG B450',
    priceCents: '130899',
    type: 'pc'
},
{
    id: '7b0402e4-8e5f-4c83-adab-584fe2850bb3',
    image: '/images/pc-sale-1.png',
    name: 'Big homie',
    availability: 'In stock',
    graphicsCard: 'Palit NVIDIA GeForce rtx 4070',
    processor: 'Intel core i5-11370k',
    ram: 'Kingston 32gb',
    drive: 'Samsung 1TB SSD M2',
    motherBoard: 'ASUS ROG B450',
    powerSupply: 'Pure Power 12 M Modular 80+ Gold',
    description: 'rtx 4070 i5-11370k 32gb RAM 1TB SSD M2 ASUS ROG B450',
    priceCents: '100799',
    type: 'pc'
},
{
    id: '8879e985-e813-4b21-90cb-8a23792ddaae',
    image: '/images/pc-sale-1.png',
    name: 'Ultra-predator',
    availability: 'In stock',
    graphicsCard: 'Palit NVIDIA GeForce rtx 4070',
    processor: 'Intel core i5-11370k',
    ram: 'Kingston 32gb',
    drive: 'Samsung 1TB SSD M2',
    motherBoard: 'ASUS ROG B450',
    powerSupply: 'Pure Power 12 M Modular 80+ Gold',
    description: 'rtx 4070 i5-11370k 32gb RAM 1TB SSD M2 ASUS ROG B450',
    priceCents: '130899',
    type: 'pc'
},
{
    id: 'f15bba30-c722-4454-bca5-14c18fd28ce1',
    image: '/images/pc-sale-1.png',
    name: 'The infinete force',
    availability: 'Not in stock',
    graphicsCard: 'Palit NVIDIA GeForce rtx 4070',
    processor: 'Intel core i5-11370k',
    ram: 'Kingston 32gb',
    drive: 'Samsung 1TB SSD M2',
    motherBoard: 'ASUS ROG B450',
    powerSupply: 'Pure Power 12 M Modular 80+ Gold',
    description: 'rtx 4070 i5-11370k 32gb RAM 1TB SSD M2 ASUS ROG B450',
    priceCents: '130899',
    type: 'pc'
},
{
    id: 'f15bba30-c722-4454-bca5-14c18fd28ce1',
    image: '/images/pc-sale-1.png',
    name: 'Lenovo ROG Gaming',
    availability: 'Not in stock',
    graphicsCard: 'Palit NVIDIA GeForce rtx 4070',
    processor: 'Intel core i5-11370k',
    ram: 'Kingston 32gb',
    drive: 'Samsung 1TB SSD M2',
    motherBoard: 'ASUS ROG B450',
    powerSupply: 'Pure Power 12 M Modular 80+ Gold',
    description: 'rtx 4070 i5-11370k 32gb RAM 1TB SSD M2 ASUS ROG B450',
    priceCents: '130899',
    type: 'laptop',
    screenMatrice: 'OLED'
}].map((productDetails) => {
    if(productDetails.type === 'laptop'){
        return new Laptops(productDetails);
    }
    return new Product(productDetails);
});