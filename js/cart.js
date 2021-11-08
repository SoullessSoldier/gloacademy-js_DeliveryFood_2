'use strict';
const cart = () => {
    //В случае, если проект не собирается сборщиком, имена переменных будут в глобальной области видимости
    //и можно применить инапсуляцию

    const renderAmountCart = (elementAmount) => {
        let total = 0;
        const data = JSON.parse(localStorage.getItem('cart'));
        total = data.reduce((sum, el) => sum += el.price * el.count, 0);
        elementAmount.textContent = '';
        elementAmount.insertAdjacentHTML('beforeend', `${total} ₽`);
    };
    
    const renderQuantity = (target, value) => {
        const parentElement = target.closest('.food-counter');
        const counter = parentElement.querySelector('.counter');
        counter.textContent = value;
    };

    const resetCart = () => {
        modalBody.textContent = '';
        localStorage.removeItem('cart');
        modalAmount.textContent = '';
        modalCart.classList.remove('is-open');
    };

    const renderItems = (data) => {        
        modalBody.textContent = '';
        data.forEach(({id, name, price, count}) => {
            const foodRow = document.createElement('div');
            foodRow.classList.add('food-row');
            foodRow.innerHTML = `
                <span class="food-name">${name}</span>
                <strong class="food-price">${price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-decrement" data-index="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button btn-increment" data-index="${id}">+</button>
                </div>
            `;
            modalBody.append(foodRow);
        });
        renderAmountCart(modalAmount);
        
    };


    const buttonCart = document.getElementById('cart-button'),
        modalCart = document.querySelector('.modal-cart'),
        close = modalCart.querySelector('.close'),
        modalBody = document.querySelector('.modal-body'),
        modalAmount = document.querySelector('.modal-pricetag'),
        clearCart = document.querySelector('.clear-cart'),
        sendOrder = document.querySelector('.send-order');

    const url = 'https://jsonplaceholder.typicode.com/posts';

    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }
        modalCart.classList.add('is-open');
    });
    close.addEventListener('click', ()=>{
        modalCart.classList.remove('is-open');
    });

    modalBody.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.matches('.btn-increment') || e.target.matches('.btn-decrement')){
            let data = JSON.parse(localStorage.getItem('cart'));
            for (let i = 0; i < data.length; i++){
                if (data[i].id === e.target.dataset.index) {
                    if (e.target.matches('.btn-increment')){
                        data[i].count++;
                    } else if(e.target.matches('.btn-decrement')){
                        
                        data[i].count = data[i].count > 0 ? data[i].count-1 : 0; 
                    }
                    renderQuantity(e.target, data[i].count);
                    break;
                }
            }            
            localStorage.setItem('cart', JSON.stringify(data));
            renderAmountCart(modalAmount);
        }
    });

    clearCart.addEventListener('click', resetCart);

    sendOrder.addEventListener('click', (e) => {
        const data = localStorage.getItem('cart');
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => {
            if (response.ok) {
                console.log('ok');
                resetCart();                
            }
        })
        .catch(err => console.err(err));
    });
};

cart();

