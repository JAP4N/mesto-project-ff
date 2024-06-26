import '/src/pages/index.css';

//import
import { initialCards } from './cards.js';
import { openPopup, closePopup } from '../componets/modal.js'
import { likeCardBtn, createCard, deleteCardBtn } from '../componets/card.js'

//DOM main content
const mainContent = document.querySelector(".content")

//Слушатели появления popup'ов
const profileEditButton = mainContent.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

//Слушатели ичезновения popup'ов
const popupCloseBtnAll = document.querySelectorAll(".popup__close");

//form
const editForm = document.forms.edit_profile;
const newPlace = document.forms.new_place;

//DOM popup
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

//Темплейт карточки
const cardList = document.querySelector(".places__list");

//Контент карточки
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");

//Поля формы создания карточки IMG
const nameCardPopup = document.querySelector(".popup__input_type_card-name");
const linkImgPopup = document.querySelector(".popup__input_type_url");

//Поля формы редактирования профиля
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//поля вывода карточек на страницу
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//ручное создание карточки
const handleCreateCard = evt => {
    evt.preventDefault();

    const newCardfromPopup = createCard ({
        name: nameCardPopup.value, 
        link: linkImgPopup.value,
    }, deleteCardBtn, likeCardBtn, modalOpenImageCard)

    cardList.prepend(newCardfromPopup);

    // Очищаем форму
    newPlace.reset();

    // Закрываем форму
    closePopup(popupNewCard);
};

//Изменение данных профиля
const  handleFormEdit = evt => {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;

    // Закрываем форму
    closePopup(popupEdit);
};

//Функция открытия модального окна картинки
export const modalOpenImageCard = (name, link) => {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;

    openPopup(popupTypeImage);
};

//Вывести карточки на страницу
initialCards.forEach(cardData => {
    const newCardItem = createCard(cardData, deleteCardBtn, likeCardBtn, modalOpenImageCard);
    cardList.append(newCardItem);
});

//Вывести popup edit на страницу
profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value  = profileDescription.textContent;

    openPopup(popupEdit);
});

//Вывести popup addCard на страницу
profileAddButton.addEventListener("click", () => {
        openPopup(popupNewCard);
});

//закрыть popup
popupCloseBtnAll.forEach(item => {
    item.addEventListener("click", evt => {
        const popup = evt.target.closest(".popup")
        closePopup(popup);
    });
});

//Слушатель изменения данных профиля
editForm.addEventListener("submit", handleFormEdit);

//Слушатель добавления карточки из popup'a
newPlace.addEventListener("submit", handleCreateCard);