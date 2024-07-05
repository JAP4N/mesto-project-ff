import '/src/pages/index.css';
import '../componets/api.js';

//import
import { openPopup, closePopup } from '../componets/modal.js'
import { likeCardBtn, createCard, deleteCardBtn } from '../componets/card.js'
import { enableValidation, clearValidation } from '../componets/validation.js'
import {loadUserData, loadCards, updateUserData, addNewCard } from '../componets/api.js'

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
const profileAvatar = document.querySelector(".profile__image");

//Конфиг для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

//Загрузка данных пользователя и карточек
Promise.all([loadUserData(), loadCards()])
    .then(([userData, cards]) => {
        const userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.src = userData.avatar;

        cards.forEach(cardData => {
            const newCardItem = createCard({...cardData, owner: cardData.owner}, userId, deleteCardBtn, likeCardBtn, modalOpenImageCard);
            cardList.append(newCardItem);
        });
    })
    .catch(err => {
        console.error(`Ошибка при загрузке данных - ${err}`);
    });

//ручное создание карточки
const handleCreateCard = evt => {
    evt.preventDefault();

    const name = nameCardPopup.value; 
    const link = linkImgPopup.value;

    addNewCard(name, link)
        .then(newCard => {
            const userId = profileTitle.textContent; // Используем id текущего пользователя
            const newCardItem = createCard({...newCard, owner: { _id: userId }}, userId, deleteCardBtn, likeCardBtn, modalOpenImageCard);
            cardList.prepend(newCardItem);
            // Закрываем форму
            closePopup(popupNewCard);
        })
        .catch(err => {
            console.error(`Ошибка при добавлении новой карточки - ${err}`);
        })
};

//Изменение данных профиля
const  handleFormEdit = evt => {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    updateUserData(name, job)
    .then(newUser => {
        profileTitle.textContent = newUser.name;
        profileDescription.textContent = newUser.about;
        // Закрываем форму
        closePopup(popupEdit);
    })
};

//Функция открытия модального окна картинки
export const modalOpenImageCard = (name, link) => {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;

    openPopup(popupTypeImage);
};

//Вывести popup edit на страницу
profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value  = profileDescription.textContent;

    const formElement = popupEdit.querySelector('.popup__form');

    //Очистка ошибок валидации
    clearValidation(formElement, validationConfig);

    openPopup(popupEdit);
});

//Вывести popup addCard на страницу
profileAddButton.addEventListener("click", () => {
    // Очищаем форму
    newPlace.reset();

    const formElement = popupNewCard.querySelector('.popup__form');

    //Очистка ошибок валидации
    clearValidation(formElement, validationConfig);

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

//Активация валидации
enableValidation(validationConfig);