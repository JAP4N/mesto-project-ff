import '../pages/index.css';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

import { initialCards }  from './cards.js';

const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard (cardValue, deleteCard) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);

    const cardTitle = cardItem.querySelector(".card__title").textContent = cardValue.name;
    const cardImage = cardItem.querySelector(".card__image").setAttribute("src", cardValue.link);

    cardItem.querySelector(".card__delete-button").addEventListener("click", deleteCallBack);
    /*
    Комментарий к строке 19. Нужно лучше. Если у функции createCard есть параметр deleteCard, то он должен использоваться в коде функции.
    То есть, в вышележащей инструкции в методе addEventListener должен указываться аргумент deleteCard, а не deleteCallBack.
    Сейчас получилось, что createCard вообще не имеет второго параметра, а deleteCallBack ей доступна по замыканию, так как создана в том
    же модуле.

    */


    return cardItem;
}

// @todo: Функция удаления карточки

function deleteCallBack(evt) {
    let card = evt.target.closest(".card");
    card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(cardData => {
    const newCardItem = createCard(cardData, deleteCallBack);
    /*
    Комментарий к строке 42.  Нужно лучше. Сейчас передача createCard аргумента deleteCallBack не правомерна, так как, как
    написано в комментарии к строке 19, функция createCard не использует параметр-колбэк функцию удаления.
    Если бы в методе addEventListener использовался аргумент deleteCard, то в строке 42 задание аргумента deleteCallBack
    было бы правомерным

    */
    cardList.append(newCardItem);
});

/*
Общий комментарий.

Проект очень хороший. Для запуска проекта используется расширение Live Server. Правильно применяются директивы import и export.

Но, нужно учесть, что проект следующего спринта будет управляться сборщиком webpack, а не Live Server`ом.

В чём нужно разобраться.
1. Если у функции задаётся параметр, то он должен использоваться в коде функции.
Посмотрите, пожалуйста, комментарии в текущем файле проекта.


Задание принимается.

Желаю дальнейших успехов в учёбе и удачи!

*/