import { popupEdit, popupList } from "../scripts/index.js"

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

// Закрытие popup'a по нажатию 'ESC'
const closePopupByEsc = evt => {
    popupList.forEach(item => {
        if (evt.key === "Escape") {
            item.classList.remove("popup_is-opened");
        }
    });
};

// Закрытие popup'а по overlay'ю
export const closePopupByOverlay = (evt) => {
    popupList.forEach(item => {
            if (evt.target === item) {
                item.classList.remove("popup_is-opened");
            }
    });
}

//Изменить данные профиля
export const  handleFormSubmit = evt => {
    evt.preventDefault();

    const nameInput = popupEdit.querySelector(".popup__input_type_name");
    const jobInput = popupEdit.querySelector(".popup__input_type_description");
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    document.querySelector(".profile__title").textContent = nameInputValue;
    document.querySelector(".profile__description").textContent = jobInputValue;
    
    // Очищаем поля формы
    nameInput.value = "";
    jobInput.value = "";


    // Закрываем форму
    closePopup(popupEdit);
};