const productsContainer = document.querySelector(".product-container");
const CategoriBtns = document.querySelectorAll('.categori-btn');
let products;

// function for fetch Products data from api
const fectchProduct =  async () =>{
    let responce = await fetch(`https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`);
    products = await responce.json();
}

// function for adding Products in Product Container
function addProducts(categoriName) {
    const selectedCategory = products.categories.find((category) => category.category_name == categoriName);
    productsContainer.innerHTML = '';
    selectedCategory.category_products.forEach((product) =>{
        const productCard = document.createElement('div');
        productCard.classList.add("card")
        const discount = Math.floor(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        productCard.innerHTML = `
        <div class='img-container'>
            <img class='card-img' src="${product.image}" alt="product image">
            ${product.badge_text ? `<div class='badge-text'>${product.badge_text}</div>` : ''}
        </div>
        <div class='card-info'>
            <h4>${product.title}</h4>
            <div class='vendor-dot'></div>
            <h5>${product.vendor}</h5>
        </div>
        <div class='card-prices'>
            <h4>Rs ${product.price}.00</h4>
            <h5>${product.compare_at_price}.00</h5>
            <h6 id="dis" >${discount}% Off</h6>
        </div>
        <button class='addToCard-btn'>Add to Card</button>`;
        productsContainer.appendChild(productCard);
    })
}

fectchProduct().then(()=>{
    addProducts("Men");
})

// Event Listeners for categoryes
CategoriBtns.forEach((button) =>{
    button.addEventListener('click',() =>{
        const categori = button.id;
        addProducts(categori);
    })
})


