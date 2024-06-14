import { popupNewCard, cardList, modalOpenImageCard } from "../scripts/index.js"
import { closePopup } from "../componets/modal.js"

//Функция создания карточки
export function createCard ({name, link}, deleteCard, likeCardBtn, modalOpenImageCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    cardItem.querySelector(".card__title").textContent = name;
    cardItem.querySelector(".card__image").src = link;            

    cardItem.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    cardItem.querySelector(".card__like-button").addEventListener("click", likeCardBtn);

    cardItem.querySelector(".card__image").addEventListener("click", () => modalOpenImageCard(name, link))

    return cardItem;
}

//ручное создание карточки
export const handleCreateCard = evt => {
    evt.preventDefault();

    const nameCardPopup = popupNewCard.querySelector(".popup__input_type_card-name").value;
    const linkImgPopup = popupNewCard.querySelector(".popup__input_type_url").value;

    const newCardfromPopup = createCard ({
        name: nameCardPopup, 
        link: linkImgPopup
    }, deleteCardBtn, likeCardBtn, modalOpenImageCard)

    cardList.prepend(newCardfromPopup);

    // Очищаем форму
    popupNewCard.querySelector(".popup__input_type_card-name").value = "";
    popupNewCard.querySelector(".popup__input_type_url").value = "";

    // Закрываем форму
    closePopup(popupNewCard);
};

//удаление карточки
export const deleteCardBtn = evt => {
    evt.target.closest(".card").remove();
};


// функция добавления like'а
export const likeCardBtn = evt => {
    if (evt.target.classList.contains("card__like-button")) {
        evt.target.classList.toggle("card__like-button_is-active");
    }
};
