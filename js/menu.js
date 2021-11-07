'use strict';

let restaurant = '';
const parentElement = document.querySelector('.cards-menu');

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

const renderItems = (data) => {    
    renderRestaurantTitle(restaurant);
    parentElement.textContent = '';
    for (let {id, image, name, description, price} of data){
                
        const card = `
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
        parentElement.insertAdjacentHTML('beforeend', card);
    }
    //console.log(data);
}

if(localStorage.getItem('restaurant')){
    restaurant = JSON.parse(localStorage.getItem('restaurant'));
    fetch(`./db/${restaurant.products}`)
    .then(response => response.json())
    .then(data => renderItems(data))
    .catch(error => console.error(error));
} else window.location.href = '/';