import '/src/pages/index.css';
import '../componets/api.js';

//import
import { openPopup, closePopup, setCloseModalByClickListeners } from '../componets/modal.js'
import { likeCardBtn, createCard, deleteCardBtn } from '../componets/card.js'
import { enableValidation, clearValidation } from '../componets/validation.js'
import {loadUserData, loadCards, updateUserData, addNewCard, updateUserAvatar } from '../componets/api.js'

//DOM main content
const mainContent = document.querySelector(".content")

//Слушатели появления popup'ов
const profileEditButton = mainContent.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditAvatar = document.querySelector(".profile__image");

//Слушатели ичезновения popup'ов
const popupCloseBtnAll = document.querySelectorAll(".popup__close");

//form
const editForm = document.forms.edit_profile;
const newPlace = document.forms.new_place;
const editAvatar = document.forms.edit_avatar;

//form button
const popupButtonEdit = editForm.querySelector(".popup__button-edit");
const popupButtonNewPlace = newPlace.querySelector(".popup__button-new-place");
const popupButtonUrl = editAvatar.querySelector(".popup__button-url");

//переменная id пользователя
let userId;

//DOM popup
const popupList = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");

//Поиск form для конкретного Popup'а 
const editFormElement = popupEdit.querySelector('.popup__form');
const addCardFormElement = popupNewCard.querySelector('.popup__form');
const avatarFormElement = popupEditAvatar.querySelector('.popup__form');

//Темплейт карточки
const cardsContainer = document.querySelector(".places__list");

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

//Значение поля 
const valueAvatarLink = editAvatar.querySelector(".popup__input_type_url");

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
        userId = userData._id; //Присваиваем значение id пользователя глобальной переменной
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.src = userData.avatar;

        cards.forEach(cardData => {
            const newCardItem = createCard({...cardData, owner: cardData.owner}, userId, deleteCardBtn, likeCardBtn, handleImageClick);
            cardsContainer.append(newCardItem);
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

    renderLoading(true, popupButtonNewPlace);

    addNewCard(name, link)
        .then(newCard => {
            userId = newCard._id;
            const newCardItem = createCard({...newCard, owner: { _id: userId }}, userId, deleteCardBtn, likeCardBtn, handleImageClick);
            cardsContainer.prepend(newCardItem);
            // Очищаем форму
            newPlace.reset();
            // Закрываем форму
            closePopup(popupNewCard);
        })
        .catch(err => {
            console.error(`Ошибка при добавлении новой карточки - ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupButtonNewPlace);
        });
};

//Изменение данных профиля
const  handleFormEditProfile = evt => {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    renderLoading(true, popupButtonEdit);

    updateUserData(name, job)
    .then(newUser => {
        profileTitle.textContent = newUser.name;
        profileDescription.textContent = newUser.about;
        // Закрываем форму
        closePopup(popupEdit);
    })
    .catch(err => {
        console.error(`Ошибка при обновлении данных профиля - ${err}`);
    })
    .finally(() => {
        renderLoading(false, popupButtonEdit);
    });
};

//Обновление аватара пользователя
const handleEditAvatar = evt => {
    evt.preventDefault();

    const avatarLink = valueAvatarLink.value;

    renderLoading(true, popupButtonUrl);

    updateUserAvatar(avatarLink)
        .then(newUser => {
            profileAvatar.src = newUser.avatar;
            
            // Закрываем форму
            closePopup(popupEditAvatar);
        })
        .catch(err => {
            console.error(`Ошибка при обновлении аватара профиля - ${err}`)
        })
        .finally(() => {
            renderLoading(false, popupButtonUrl);
        });
};

//Функция открытия модального окна картинки
export const handleImageClick = (name, link) => {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;

    openPopup(popupTypeImage);
};

//Вывести popup edit на страницу
profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value  = profileDescription.textContent;

    //Очистка ошибок валидации
    clearValidation(editFormElement, validationConfig);

    openPopup(popupEdit);
});

//Вывести popup addCard на страницу
profileAddButton.addEventListener("click", () => {
    //Очистка ошибок валидации
    clearValidation(addCardFormElement, validationConfig);

    openPopup(popupNewCard);
});

//Вывести popup EditAvatar на страницу
profileEditAvatar.addEventListener("click", () => {
    // Очищаем форму
    editAvatar.reset();

    //Очистка ошибок валидации
    clearValidation(avatarFormElement, validationConfig);

    openPopup(popupEditAvatar);
});

//закрыть popup
popupCloseBtnAll.forEach(item => {
    item.addEventListener("click", evt => {
        const popup = evt.target.closest(".popup")
        closePopup(popup);
    });
});

//Отображение загрузки данных
const renderLoading = (isLoading, inputElement) => {
    if (isLoading) {
        inputElement.textContent = "Сохранить...";
    } else if (!isLoading) {
        inputElement.textContent = "Сохранить";
    }
  };

//Закрытие popup по клику на overlay
setCloseModalByClickListeners(popupList);

//Слушатель изменения данных профиля
editForm.addEventListener("submit", handleFormEditProfile);

//Слушатель добавления карточки из popup'a
newPlace.addEventListener("submit", handleCreateCard);

//Слушатель обновления аватара пользователя
editAvatar.addEventListener("submit", handleEditAvatar);

//Активация валидации
enableValidation(validationConfig);