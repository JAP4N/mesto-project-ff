import '/src/pages/index.css';

// import
import { initialCards }  from './cards.js';
import { openPopup, closePopup, closePopupByEsc, closePopupByOverlay }  from '../componets/modal.js'

// export
export { popupList, popupCloseBtnAll, profileEditButton, activePopup }

// DOM main content
const mainContent = document.querySelector(".content")

// Слушатели появления popup'ов
const profileEditButton = mainContent.querySelector(".profile__edit-button");
const profileAddBtn = mainContent.querySelector(".profile__add-button");
const profileCardImg = mainContent.querySelector(".card__image");

//Слушатели ичезновения popup'ов
const popupCloseBtnAll = document.querySelectorAll(".popup__close");

// DOM popup
const popupList = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const activePopup = document.querySelector(".popup_is-opened");

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

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

// @todo: Вывести popup на страницу
document.addEventListener("click", evt => {
    if (evt.target.classList.contains("profile__edit-button")) {
        openPopup(popupEdit);
    } else if (evt.target.classList.contains("profile__add-button")) {
        openPopup(popupNewCard);
    }
});

// @todo: закрыть popup
popupList.forEach(popup => {
    if (activePopup) {
        closePopup(popup);
    };
});

closePopupByOverlay(popupList);