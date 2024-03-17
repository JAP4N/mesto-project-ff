// @todo: Темплейт карточки

// @todo: DOM узлы

import { initialCards }  from './cards.js';

const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function creatCard (cardValue, deleteCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);

    const cardTitle = cardItem.querySelector(".card__title").textContent = cardValue.name;
    const cardImage = cardItem.querySelector(".card__image").setAttribute("src", cardValue.link);

    cardList.append(cardItem);

    cardItem.querySelector(".card__delete-button").addEventListener("click", deleteCallBack);

    return cardItem;
}

// @todo: Функция удаления карточки

function deleteCallBack(evt) {
    let card = evt.target.closest(".card");
    card.remove();
}


// @todo: Вывести карточки на страницу

initialCards.forEach(creatCard);