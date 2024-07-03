const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add("form__input_type_error")
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove("form__input_type_error")
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";

};

const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }   else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disavled = true;
        buttonElement.classList.add("popup__button_inactive");
    } else {
        buttonElement.disavled = false;
        buttonElement.classList.remove("popup__button_inactive");
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement)

            toggleButtonState(inputList, buttonElement);
        });
    });
};

//Функция активации валидации
export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"))

    formList.forEach(formElement => {
        setEventListeners(formElement)

        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
        const buttonElement = formElement.querySelector('.popup__button');
        toggleButtonState(inputList, buttonElement);
    });
};

//Функция очистки ошибок валидации
export const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
  });
};