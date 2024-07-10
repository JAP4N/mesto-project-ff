import { toggleLike, deleteUserCard } from './api.js'

//Функция создания карточки
export function createCard ({name, link, likes, _id, owner}, userId, deleteCard, likeCardBtn, handleImageClick) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardTitle = cardItem.querySelector(".card__title");
    const cardImage = cardItem.querySelector(".card__image");
    const likeCounter = cardItem.querySelector(".card__like-count");
    const likeButton = cardItem.querySelector(".card__like-button");
    const deleteButton = cardItem.querySelector(".card__delete-button");

    cardTitle.textContent = name; //Добавляет название карточки при ее создании
    cardImage.src = link;            
    cardImage.alt = name;  
    likeCounter.textContent = likes.length;

    //Проверяем, лайкнута ли карточка текущим пользователем
    const isLiked = likes.some(like => like._id === userId)

    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");
    };

    // Проверка на владельца карточки
    if (owner._id === userId) {
        deleteButton.addEventListener("click", () => deleteCard(_id, cardItem));
    }   else {
        deleteButton.remove();
    }

    likeButton.addEventListener("click", () => likeCardBtn(_id, likeCounter, likeButton));
    cardImage.addEventListener("click", () => handleImageClick(name, link));

    return cardItem;
}

//удаление карточки
export const deleteCardBtn = (cardId, cardElement) => {
    deleteUserCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(err => {
            console.error(`Ошибка при удалении карточки - ${err}`)
        })
};

// функция добавления/удаления like'а
export const likeCardBtn = (cardId, likeCounter, likeButton) => {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");

    toggleLike(cardId, isLiked)
        .then(updateCardData =>  {
            likeCounter.textContent = updateCardData.likes.length;
            likeButton.classList.toggle("card__like-button_is-active");
        })
        .catch(err => {
            console.error(`Ошибка при обновлении лайка - ${err}`);
        });
};
