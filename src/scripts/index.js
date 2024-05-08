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

    cardItem.querySelector(".card__delete-button").addEventListener("click", deleteCard);

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
    cardList.append(newCardItem);
});