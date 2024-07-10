const baseURL = 'https://mesto.nomoreparties.co';
const groupId = 'wff-cohort-17';
const token = '3da66894-1d7a-436c-a006-4109dd78abb3';

//Функция проверки ответа сервера
const checkResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//Функция загрузки информации о пользователе с сервера
export const loadUserData = () => {
    return fetch(`${baseURL}/v1/${groupId}/users/me`, {
        headers: {
            authorization: token
        }
    })
    .then(checkResponse);
};

//Функция загрузки карточек
export const loadCards = () => {
     return fetch(`${baseURL}/v1/${groupId}/cards`, {
        headers: {
            authorization: token
        }   
    })
    .then(checkResponse);
};

//Функция обновления данных профиля
export const updateUserData = (name, about) => {
    return fetch(`${baseURL}/v1/${groupId}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          about
        })
    })
    .then(checkResponse);
};

//Функция добавления новой карточки
export const addNewCard = (name, link) => {
    return fetch(`${baseURL}/v1/${groupId}/cards`, {
        method: 'POST',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          link
        })
    })
    .then(checkResponse);
};


//Функция обновления колличества лайков под карточкой
export const toggleLike = (cardId, isLiked) => {
    // Если isLiked истинно - DELETE. Если isLiked ложно - PUT
    const method = isLiked ? 'DELETE' : 'PUT';

    return fetch(`${baseURL}/v1/${groupId}/cards/likes/${cardId}`, {
        method: method,
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(checkResponse);
};

//Функция удаления карточки
export const deleteUserCard = (cardId) => {
    return fetch(`${baseURL}/v1/${groupId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(checkResponse);
};

//Функция обновления аватара пользователя
export const updateUserAvatar = (avatar) => {
    return fetch(`${baseURL}/v1/${groupId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar
        })
    })
    .then(checkResponse);
};

