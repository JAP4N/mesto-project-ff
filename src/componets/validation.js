const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");

formInput.addEventListener("input", evt => {
    console.log(evt.target.validity);
});

//Функция активации валидации
export const enableValidation = () => {

};

//Функция очистки ошибок валидации
export const clearValidation = () => {

};