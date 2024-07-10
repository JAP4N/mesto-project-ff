//Показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

//Скрыть ошибку ввода
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";

};

//Проверка валидности поля popap'а
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }   else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

//Проверка на наличие невалидных полей
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
};

//отслеживание состояния кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

//Установка слушателей для полей
const setEventListeners = (formElement, {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach(inputElement => {
        inputElement.addEventListener("input", () => {

            isValid(formElement, inputElement, inputErrorClass, errorClass)
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

//Функция активации валидации
export const enableValidation = ({
    formSelector,
    ...rest
  }) => {


    const formList = Array.from(document.querySelectorAll(formSelector))

    formList.forEach(formElement => {
        setEventListeners(formElement, {
            formSelector,
            ...rest
          });
    });
};

//Функция очистки ошибок валидации
export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    });

    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
};