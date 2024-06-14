import '/src/pages/index.css';

//import
import { initialCards } from './cards.js';
import { openPopup, closePopup, handleFormSubmit } from '../componets/modal.js'
import { handleCreateCard, likeCardBtn, createCard } from '../componets/card.js'

//export
export { popupList, popupCloseBtnAll, profileEditButton, popupEdit, popupNewCard, cardList }

//DOM main content
const mainContent = document.querySelector(".content")

//Слушатели появления popup'ов
const profileEditButton = mainContent.querySelector(".profile__edit-button");


//Слушатели ичезновения popup'ов
const popupCloseBtnAll = document.querySelectorAll(".popup__close");

//DOM popup
const popupList = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

//Темплейт карточки
const cardList = document.querySelector(".places__list");

//Контент карточки
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");

//Функция открытия модального окна картинки
export const modalOpenImageCard = (name, link) => {
    openPopup(popupTypeImage);

    popupCaption.textContent = name;
    popupImage.src = link;
};

//Функция удаления карточки
export function deleteCallBack(evt) {
    let card = evt.target.closest(".card").remove();
}

//Вывести карточки на страницу
initialCards.forEach(cardData => {
    const newCardItem = createCard(cardData, deleteCallBack, likeCardBtn, modalOpenImageCard);
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
popupCloseBtnAll.forEach(item => {
    item.addEventListener("click", evt => {
        const popup = evt.target.closest(".popup")
        closePopup(popup);
    });
});

//Слушатель изменения данных профиля
popupEdit.addEventListener("submit", handleFormSubmit);

//Слушатель добавления карточки из popup'a
popupNewCard.addEventListener("submit", handleCreateCard);

