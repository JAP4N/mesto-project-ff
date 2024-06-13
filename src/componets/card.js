import { popupNewCard, cardTemplate, cardList , deleteCallBack} from "../scripts/index.js"

export const handleCreateCard = evt => {
    evt.preventDefault();

    const newHandleCard = cardTemplate.querySelector(".card").cloneNode(true);

    const nameCard = popupNewCard.querySelector(".popup__input_type_card-name");
    const urlImg = popupNewCard.querySelector(".popup__input_type_url");
    const nameCardValue = nameCard.value;
    const urlImgValue = urlImg.value;
    newHandleCard.querySelector(".card__delete-button").addEventListener("click", deleteCardBtn);
    newHandleCard.querySelector(".card__like-button").addEventListener("click", likeCardBtn);

    newHandleCard.querySelector(".card__title").textContent = nameCardValue;
    newHandleCard.querySelector(".card__image").setAttribute("src", urlImgValue);
    // Очищаем поля формы
    nameCard.value = "";
    urlImg.value = "";
    
    // Закрываем форму
    popupNewCard.classList.remove("popup_is-opened");
    
    cardList.prepend(newHandleCard);
};

//удаление карточки
export const deleteCardBtn = evt => {
    evt.target.closest(".card").remove();
};


//функция добавления like'а
export const likeCardBtn = evt => {
    if (evt.target.classList.contains("card__like-button")) {
        console.log(evt.target);
        evt.target.classList.toggle("card__like-button_is-active");
    }
};
