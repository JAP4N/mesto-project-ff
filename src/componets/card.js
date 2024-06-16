//Функция создания карточки
export function createCard ({name, link}, deleteCard, likeCardBtn, modalOpenImageCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardTitle = cardItem.querySelector(".card__title").textContent = name;
    const cardImageSrc = cardItem.querySelector(".card__image").src = link;            
    const cardImageAlt = cardItem.querySelector(".card__image").alt = name;  

    cardItem.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    cardItem.querySelector(".card__like-button").addEventListener("click", likeCardBtn);

    cardItem.querySelector(".card__image").addEventListener("click", () => modalOpenImageCard(name, link))

    return cardItem;
}

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
