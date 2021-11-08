'use strict';
const cart = () => {
    //В случае, если проект не собирается сборщиком, имена переменных будут в глобальной области видимости
    //и можно применить инапсуляцию
    const buttonCart = document.getElementById('cart-button'),
        modalCart = document.querySelector('.modal-cart'),
        close = modalCart.querySelector('.close');
    buttonCart.addEventListener('click', () => {
        modalCart.classList.add('is-open');
    });
    close.addEventListener('click', ()=>{
        modalCart.classList.remove('is-open');
    });
};

cart();

