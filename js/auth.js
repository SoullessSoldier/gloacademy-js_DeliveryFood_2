'use strict';

const buttonAuth = document.querySelector('.button-auth'),
    modalAuth = document.querySelector('.modal-auth'),
    closeAuth = document.querySelector('.close-auth'),
    logInForm = document.getElementById('logInForm'),
    inputLogin = document.getElementById('login'),
    inputPassword = document.getElementById('password'),
    userName = document.querySelector('.user-name'),
    buttonOut = document.querySelector('.button-out'),
    buttonCart = document.querySelector('.button-cart');
    


const login = (user) => {
    modalAuth.style.display = 'none';    
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'block';
    userName.textContent = user instanceof FormData ? user.get('login') : user.login;
    userName.style.display = 'block';
    buttonCart.style.display = 'flex'; 
};

const logout = () => {
    userName.textContent = '';
    userName.style.display = 'none';
    buttonOut.style.display = 'none';
    buttonAuth.style.display = 'block';
    buttonCart.style.display = 'none'; 
    localStorage.removeItem('user');
};
    
buttonAuth.addEventListener('click', (e) => {
    modalAuth.style.display = 'flex';
});

closeAuth.addEventListener('click', (e) => {
    modalAuth.style.display = 'none';
});

buttonOut.addEventListener('click', (e) => {
    logout();
});

logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    if(formData.get('login')){
        const user = {
            login: formData.get('login'),
            password: formData.get('password')
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        login(formData);
    } else {
        [inputLogin, inputPassword].forEach(element => element.value = '');
        alert('Логин не введен!');
    }

});

if (localStorage.getItem('user')){
    login(JSON.parse(localStorage.getItem('user')));
}