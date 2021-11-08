'use strict';

let restaurant = '';
const parentElement = document.querySelector('.cards-menu');

const cartArray = [];

const renderRestaurantTitle = (restaurant) => {
    const blockRestaurantTitle = document.querySelector('.restaurant-title'),
        blockRestaurantRating = document.querySelector('.rating'),
        blockRestaurantPrice = document.querySelector('.price'),
        blockRestaurantCategory = document.querySelector('.category');
    blockRestaurantTitle.textContent = restaurant.name;
    blockRestaurantRating.textContent = restaurant.stars;
    blockRestaurantPrice.textContent = `От ${restaurant.price} ₽`;
    blockRestaurantCategory.textContent = restaurant.kitchen;
};

const addToCart = (cartItem) => {
    console.log(cartItem);
    cartArray.push(cartItem);

    localStorage.setItem('cart', JSON.stringify(cartArray))

};

const renderItems = (data) => {    
    renderRestaurantTitle(restaurant);
    parentElement.textContent = '';
    for (let {id, image, name, description, price} of data){
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = id;        
        card.innerHTML = `
        <div class="card" data-id="${id}">
            <img src="${image}" alt="${name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <!-- /.card-heading -->
                <div class="card-info">
                    <div class="ingredients">${description}
                    </div>
                </div>
                <!-- /.card-info -->
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>
            <!-- /.card-text -->
        </div>
        <!-- /.card -->
        `;
        
        const buttonCardText = card.querySelector('.button-card-text');
        buttonCardText.addEventListener('click', () => {
            addToCart({name, price, count: 1});
        });

        parentElement.append(card);
    }
    
}

if(localStorage.getItem('restaurant')){
    restaurant = JSON.parse(localStorage.getItem('restaurant'));
    fetch(`./db/${restaurant.products}`)
    .then(response => response.json())
    .then(data => renderItems(data))
    .catch(error => console.error(error));
} else window.location.href = '/';