const baseURL = 'https://mesto.nomoreparties.co';
const groupId = 'wff-cohort-17';
const token = '3da66894-1d7a-436c-a006-4109dd78abb3';

//Функция загрузки информации о пользователе с сервера
const loadUserData = () => {
    fetch(`${baseURL}/v1/${groupId}/users/me`, {
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status)
    })
    .then(data => {
        document.querySelector(".profile__title").textContent = data.name
        document.querySelector(".profile__description").textContent = data.about
        document.querySelector(".profile__image").src = data.avatar;
    })
    .catch(err => {
        console.log(`Ошибка при загрузке данных пользователя - ${err}`)
    })
}

//Функция загрузки карточек
const loadCard = () => {
     fetch(`${baseURL}/v1/${groupId}/cards`, {
        headers: {
            authorization: token
        }   
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status)
    })
    .then(data => {
        data.array.forEach(element => {
            const newCardItem = createCard (element, deleteCard, likeCardBtn, modalOpenImageCard);
            cardList.append(newCardItem);
        });
    })
    .catch(err => {
        console.log(`Ошибка при выгрузке карточек - ${err}`)
    })
}
