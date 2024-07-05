import { toggleLike } from './api.js'

//Функция создания карточки
export function createCard ({name, link, likes, _id, owner}, userId, deleteCard, likeCardBtn, modalOpenImageCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardTitle = cardItem.querySelector(".card__title").textContent = name;
    const cardImage = cardItem.querySelector(".card__image");
    const likeCounter = cardItem.querySelector(".card__like-count");
    const likeButton = cardItem.querySelector(".card__like-button");
    const deleteButton = cardItem.querySelector(".card__delete-button");

    cardImage.src = link;            
    cardImage.alt = name;  
    likeCounter.textContent = likes.length;

    // Проверяем, лайкнута ли карточка текущим пользователем
    likes.forEach(like => {
        if (like._id === userId) {
            likeButton.classList.add("card__like-button_is-active");
        }
    });

    // Проверка на владельца карточки
    if (owner._id === userId) {
        deleteButton.addEventListener("click", deleteCard);
    }   else {
        deleteButton.remove();
    }

    cardItem.querySelector(".card__like-button").addEventListener("click", () => likeCardBtn(_id, likeCounter, likeButton));
    cardImage.addEventListener("click", () => modalOpenImageCard(name, link));

    return cardItem;
}

//удаление карточки
export const deleteCardBtn = evt => {
    evt.target.closest(".card").remove();
};

// функция добавления/удаления like'а
export const likeCardBtn = (cardId, likeCounter, likeButton) => {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");

    toggleLike(cardId, isLiked)
        .then(updateCard =>  {
            likeCounter.textContent = updateCard.likes.length;
            likeButton.classList.toggle("card__like-button_is-active");
        })
        .catch(err => {
            console.error(`Ошибка при обновлении лайка - ${err}`);
        });
};
