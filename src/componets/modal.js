import { selectedAllPopup, profileEditButton, popupEdit, popupList, popupCloseBtnAll, activePopup } from "../scripts/index.js"

// Открытие popup'a
export const openPopup = somePopup => {
    somePopup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupByEsc);
};

// Закрытие popup'a
export const closePopup = somePopup => {
    popupCloseBtnAll.forEach(element => {
        element.addEventListener("click", () => {
            somePopup.classList.remove("popup_is-opened");
            document.removeEventListener("keydown", closePopupByEsc);
        });
    });
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
export const closePopupByOverlay = popupAll => {
    popupAll.forEach(item => {
        item.addEventListener("click", evt => {
            if (evt.target === item) {
                item.classList.remove("popup_is-opened");
            }
        });
    });
}