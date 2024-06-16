// Открытие popup'a
export const openPopup = somePopup => {
    somePopup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupByEsc);
    document.addEventListener("mousedown", closePopupByOverlay)
};

// Закрытие popup'a
export const closePopup = somePopup => {
    somePopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupByEsc);
    document.removeEventListener("mousedown", closePopupByOverlay);
};

// Закрытие popup'a при нажатии на Esc
const closePopupByEsc = evt => {
    if (evt.key === "Escape") {
        const openPopup = document.querySelector(".popup_is-opened");
        if (openPopup) {
            closePopup(openPopup);
        }
    }
};

// Закрытие popup'а по overlay'ю
const closePopupByOverlay = (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
        closePopup(evt.target);
    }
}

//Изменение данных профиля
const  handleFormSubmit = evt => {
    evt.preventDefault();

    const popupEditProfile = document.querySelector(".popup_type_edit");
    const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
    const jobInput = popupEditProfile.querySelector(".popup__input_type_description");
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    document.querySelector(".profile__title").textContent = nameInputValue;
    document.querySelector(".profile__description").textContent = jobInputValue;
    
    // Очищаем поля формы
    nameInput.value = "";
    jobInput.value = "";

    // Закрываем форму
    closePopup(popupEditProfile);
};