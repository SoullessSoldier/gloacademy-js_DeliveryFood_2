'use strict';

//const url = '/db/partners.json';
const url = 'https://gloacademy-js-deliveryfood2-default-rtdb.europe-west1.firebasedatabase.app/db/partners.json';

const init = () => {
    fetch(url)
    .catch(err => console.warn('error fetching data', err))
    .then(response => response.json())
    .then(data => renderRestaurantCard(data))
    .catch(err => console.warn('error processing data', err));
};

const checkIfAuthorized = () => {
    if (!localStorage.getItem('user')){ 
        let event = new Event("click");          
        document.querySelector('.button-auth').dispatchEvent(event);
    }
};

const renderRestaurantCard = (data) => {
    const cardsParent = document.querySelector('.cards-restaurants');
    cardsParent.textContent = '';
    for (let item of data){
        const { image: cardImage, name: cardName, time_of_delivery: cardDeliveryTime,
            stars: cardStars, price: cardPrice, kitchen: cardKitchen, products: cardProductsDb} = item;
        let card = document.createElement('a');
        card.classList.add('card', 'card-restaurant');
        card.innerHTML = `            
                <img src="${cardImage}" alt="image" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${cardName}</h3>
                        <span class="card-tag tag">${cardDeliveryTime} мин</span>
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
        `;
        cardsParent.append(card);
        card.addEventListener('click', (e) => {
            e.preventDefault();
            if (localStorage.getItem('user')){           
                localStorage.setItem('restaurant', JSON.stringify(item));            
                window.location.href = '/restaurant.html';
            } else {
                checkIfAuthorized();
            }
        });
    }        
};

init();
