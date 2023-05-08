// object-config for form validation
export const elementsForValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_type_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};
//this forms require validation
const profileForm = document.querySelector('.form_type_profile');
const cardForm = document.querySelector('.form_type_cards');
const avatarForm = document.querySelector('.form_type_avatar');
export const formsToValidateArray = [profileForm, cardForm, avatarForm];
// all variables
export const buttonEdit = document.querySelector('.button_type_edit');
export const buttonAdd = document.querySelector('.button_type_add');
export const nameInput = document.querySelector('#profile-name');
export const jobInput = document.querySelector('#profile-job');
export const placesSelector = '.places';
export const avatarButton = document.querySelector('.profile__avatar-button');