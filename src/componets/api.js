const baseURL = 'https://mesto.nomoreparties.co';
const groupId = 'wff-cohort-17';
const token = '3da66894-1d7a-436c-a006-4109dd78abb3';

//Функция загрузки информации о пользователе с сервера
export const loadUserData = () => {
    return fetch(`${baseURL}/v1/${groupId}/users/me`, {
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
    .catch(err => {
        console.log(`Ошибка при загрузке данных пользователя - ${err}`)
    });
};

//Функция загрузки карточек
export const loadCards = () => {
     return fetch(`${baseURL}/v1/${groupId}/cards`, {
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
    .catch(err => {
        console.log(`Ошибка при выгрузке карточек - ${err}`)
    });
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
          name: name,
          about: about
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status)
    })
    .catch(err => {
        console.log(`Ошибка при обновлении данных профиля - ${err}`)
    });
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
          name: name,
          link: link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status)
    })
    .catch(err => {
        console.log(`Ошибка при добавлении новой карточки - ${err}`)
    });
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
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .catch(err => {
        console.log(`Ошибка при обновлении лайка - ${err}`);
    });
};