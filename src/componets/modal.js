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

//Отображение загрузки данных
export const renderLoading = (isLoading, formElement) => {
    const activeBtnSubmit= formElement.querySelector(".popup__button")

    if (isLoading) {
        activeBtnSubmit.textContent = "Сохранить...";
    } else if (!isLoading) {
        activeBtnSubmit.textContent = "Сохранить";
    }
  };