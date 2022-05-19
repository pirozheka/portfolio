const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    overlay = document.querySelector('.menu__overlay');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        menu.classList.remove('active');
    });

//скрипт автоматического пересчета процентов
const counters = document.querySelectorAll('.skills__percentage'),
        lines = document.querySelectorAll('.skills__scale-top');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});