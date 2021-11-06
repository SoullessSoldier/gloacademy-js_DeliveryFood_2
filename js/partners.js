'use strict';

//const url = '/db/partners.json';
const url = 'https://gloacademy-js-deliveryfood2-default-rtdb.europe-west1.firebasedatabase.app/db/partners.json';

const init = () => {
    fetch(url)
    .catch(err => console.warn('error fetching data', err))
    .then(response => response.json())
    .then(data => renderRestaurantCard(data))
    .catch(err => console.warn('error processing data', err));
}


const renderRestaurantCard = (data) => {
    const cardsParent = document.querySelector('.cards-restaurants');
    cardsParent.textContent = '';
    for (let item of data){
        let cardImage = item.image,
            cardName = item.name,
            cardDeliveryTime = item.time_of_delivery,
            cardStars = item.stars,
            cardPrice = item.price,
            cardKitchen = item.kitchen,
            cardProductsDb = item.products;


        let card = `
            <a href="restaurant.html" class="card card-restaurant">
                <img src="${cardImage}" alt="image" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${cardName}</h3>
                        <span class="card-tag tag">${cardDeliveryTime}</span>
                    </div>
                    <!-- /.card-heading -->
                    <div class="card-info">
                        <div class="rating">
                        ${cardStars}
                        </div>
                        <div class="price">От ${cardPrice} ₽</div>
                        <div class="category">${cardKitchen}</div>
                    </div>
                    <!-- /.card-info -->
                </div>
                <!-- /.card-text -->
            </a>
        `;
        cardsParent.insertAdjacentHTML('beforeend', card);
    }
};


init();
