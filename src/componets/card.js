import { popupNewCard, cardTemplate, cardList, deleteCallBack, createCard} from "../scripts/index.js"

export const handleCreateCard = evt => {
    evt.preventDefault();

    const nameCardPopup = popupNewCard.querySelector(".popup__input_type_card-name").value;
    const linkImgPopup = popupNewCard.querySelector(".popup__input_type_url").value;

    const newCardfromPopup = createCard ({nameCardPopup, linkImgPopup}, deleteCardBtn)
    // const nameCard = popupNewCard.querySelector(".popup__input_type_card-name");
    // const urlImg = popupNewCard.querySelector(".popup__input_type_url");
    // const nameCardValue = nameCard.value;
    // const urlImgValue = urlImg.value;
    // cardItem.querySelector(".card__title").textContent = nameCardValue;
    // cardItem.querySelector(".card__image").setAttribute("src", urlImgValue);
    // cardItem.querySelector(".card__delete-button").addEventListener("click", deleteCardBtn);
    // cardItem.querySelector(".card__like-button").addEventListener("click", likeCardBtn);

    // Очищаем поля формы
    // nameCard.value = "";
    // urlImg.value = "";
    
    // Закрываем форму
    popupNewCard.classList.remove("popup_is-opened");
    
    cardList.prepend(newCardfromPopup);
};

//удаление карточки
export const deleteCardBtn = evt => {
    evt.target.closest(".card").remove();
};


// функция добавления like'а
export const likeCardBtn = evt => {
    if (evt.target.classList.contains("card__like-button")) {
        console.log(evt.target);
        evt.target.classList.toggle("card__like-button_is-active");
    }
};
