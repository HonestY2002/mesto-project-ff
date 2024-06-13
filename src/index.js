import "./styles/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, onDelete, activeLikeButton } from "./scripts/card.js";
import {
  popupWindow,
  closeModal,
  popupOpened,
  popupAnimated,
  removePopupOpened,
} from "./scripts/modal.js";

const placesList = document.querySelector(".places__list");
const profileEdit = document.querySelector(".popup_type_edit");
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileContent = document.querySelector(".profile__description");
const placePopup = document.querySelector(".popup_type_new-card");
const formPlace = document.forms["new-place"];
const placeInput = formPlace.querySelector(".popup__input_type_card-name");
const linkInput = formPlace.querySelector(".popup__input_type_url");
const imageWindow = document.querySelector(".popup_type_image");
const imageContent = imageWindow.querySelector(".popup__content_content_image");
const imagePicture = imageContent.querySelector(".popup__image");
const imageText = imageContent.querySelector(".popup__caption");
const editButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const closePopup = document.querySelectorAll(".popup__close");

function addCard(cardArray) {
  cardArray.forEach((data) => {
    const card = createCard(data, onDelete, activeLikeButton, openImage);

    placesList.append(card);
  });
}

addCard(initialCards);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileContent.textContent = jobInput.value;

  removePopupOpened(profileEdit);
}
closePopup.forEach(closeModal);

formElement.addEventListener("submit", handleFormSubmit);

editButton.addEventListener("click", function (event) {
  nameInput.placeholder = profileTitle.textContent;
  jobInput.placeholder = profileContent.textContent;

  popupOpened(profileEdit);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileContent.textContent;
});

cardAddButton.addEventListener("click", function (event) {
  popupOpened(placePopup);
});

function createNewCard(evt) {
  evt.preventDefault();
  const newCard = new Object();
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  const addCard = createCard(newCard, onDelete, activeLikeButton, openImage);
  placesList.prepend(addCard);
  evt.target.reset();
  removePopupOpened(placePopup);
}

formPlace.addEventListener("submit", createNewCard);

function openImage(cardElement) {
  imagePicture.src = cardElement.link;
  imageText.textContent = cardElement.name;
  imageText.alt = cardElement.name;

  popupOpened(imageWindow);
  popupAnimated(imageWindow);
}

