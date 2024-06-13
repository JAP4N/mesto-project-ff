import '/src/pages/index.css';

//import
import { initialCards }  from './cards.js';
import { openPopup, closePopup, handleFormSubmit }  from '../componets/modal.js'
import { handleCreateCard, likeCardBtn, deleteCardBtn }  from '../componets/card.js'

//export
export { popupList, popupCloseBtnAll, profileEditButton, popupEdit, popupNewCard, cardList, cardTemplate }

//DOM main content
const mainContent = document.querySelector(".content")

//Слушатели появления popup'ов
const profileEditButton = mainContent.querySelector(".profile__edit-button");
const profileAddBtn = mainContent.querySelector(".profile__add-button");
const profileCardImg = mainContent.querySelector(".card__image");

//Слушатели ичезновения popup'ов
const popupCloseBtnAll = document.querySelectorAll(".popup__close");

//DOM popup
const popupList = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageContent = document.querySelector(".popup__content_content_image");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

const cardList = document.querySelector(".places__list");

//Функция создания карточки
function createCard (cardValue, deleteCard, likeCardBtn) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    cardItem.addEventListener("click", likeCardBtn);
    const cardTitle = cardItem.querySelector(".card__title").textContent = cardValue.name;
    const cardImage = cardItem.querySelector(".card__image").setAttribute("src", cardValue.link);

    cardItem.querySelector(".card__delete-button").addEventListener("click", deleteCard);

    return cardItem;
}

//Функция удаления карточки
export function deleteCallBack(evt) {
    let card = evt.target.closest(".card").remove();
}

//Вывести карточки на страницу
initialCards.forEach(cardData => {
    const newCardItem = createCard(cardData, deleteCallBack, likeCardBtn);
    cardList.append(newCardItem);
});

//Вывести popup на страницу
document.addEventListener("click", evt => {
    if (evt.target.classList.contains("profile__edit-button")) {
        openPopup(popupEdit);
    } else if (evt.target.classList.contains("profile__add-button")) {
        openPopup(popupNewCard);
    } 
});

//закрыть popup
popupList.forEach(popup => {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
        closePopup(popup);
    };
});

//Слушатель изменения данных профиля
popupEdit.addEventListener("submit", handleFormSubmit);

//Слушатель добавления карточки из popup'a
popupNewCard.addEventListener("submit", handleCreateCard);

