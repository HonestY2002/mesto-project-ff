import "./styles/index.css";
import { createCard } from "./scripts/card.js";
import {
  addOpenPopupButtonListener,
  addClosePopupButtonListener,
  openPopupOpened,
  openPopupAnimated,
  closeModal,
} from "./scripts/modal.js";
import { clearValidation, enableValidation } from "./scripts/validation";
import {
  savesCard,
  deleteCard,
  dislike,
  getInitialCards,
  addUser,
  like,
  updateAvatarImage,
  savesUser,
} from "./scripts/api";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const editProfilePopup = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
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
const profileImage = document.querySelector(".profile__image");
const avatarImage = document.querySelector(".popup_type_update-avatar");
const avatarImageform = document.forms["update-avatar"];
const newAvatarImageInput = avatarImageform.querySelector(
  ".popup__input_type_avatar-url"
);
let userId;

function openPopupCallBack(cardElement) {
  imagePicture.src = cardElement.link;
  imageText.textContent = cardElement.name;
  imageText.alt = cardElement.name;

  openPopupOpened(imageWindow);
  openPopupAnimated(imageWindow);
}

Promise.all([addUser(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileContent.textContent = userData.about;

    initialCards.forEach((card) => {
      placesList.append(
        createCard(
          cardTemplate,
          card,
          deleteCard,
          likeCard,
          openPopupCallBack,
          userId
        )
      );
    });
  })
  .catch((err) => console.log(err));

const likeCard = (e, cardId) => {
  return e.target.classList.contains("card__like-button_is-active")
    ? dislike(cardId)
    : like(cardId);
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileContent.textContent = jobInput.value;

  closeModal(editProfilePopup);
}
closePopup.forEach(addClosePopupButtonListener);

formEditProfile.addEventListener("submit", handleFormSubmit);

editButton.addEventListener("click", function (event) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileContent.textContent;

  clearValidation(formEditProfile, validationConfig);
  openPopupOpened(editProfilePopup);
});

cardAddButton.addEventListener("click", function (event) {
  openPopupOpened(placePopup);
  clearValidation(formPlace, validationConfig);
});

function createNewCard(evt) {
  evt.preventDefault();

  const button = formPlace.querySelector(".popup__button");
  button.innerHTML = "Сохранение...";
  console.log(button);
  console.log("это кнопка сохранить");

  const newCard = {
    name: placeInput.value,
    link: linkInput.value,
  };

  savesCard(newCard)
    .then((data) => {
      const cardDataFromServer = data;
      const userId = cardDataFromServer.owner._id;
      const cardToInsert = createCard(
        cardTemplate,
        cardDataFromServer,
        card,
        deleteCard,
        likeCard,
        openPopupCallBack,
        userId
      );
      placesList.prepend(cardToInsert);
      closeModal(placePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.innerHTML = "Сохранить";
      console.log(button);
    });
}

formPlace.addEventListener("submit", createNewCard);

formEditProfile.addEventListener("submit", function (event) {
  event.preventDefault();

  const button = formEditProfile.querySelector(".popup__button");
  button.innerHTML = "Сохранение...";

  const newUser = {
    name: nameInput.value,
    about: jobInput.value,
  };
  savesUser(newUser)
    .then((data) => {
      profileTitle.textContent = nameInput.value;
      profileContent.textContent = jobInput.value;

      closeModal(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.innerHTML = "Сохранить";
      console.log(button);
    });
});

profileImage.addEventListener("click", (e) => {
  openPopupOpened(avatarImage);
});

const handleProfileImageFromSubmit = (e) => {
  e.preventDefault();

  const submitButton = avatarImageform.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  updateAvatarImage(newAvatarImageInput.value)
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      avatarImageform.reset();

      clearValidation(avatarImageform, validationConfig);
      closeModal(avatarImage);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = "Сохранить"));
};

avatarImageform.addEventListener("submit", handleProfileImageFromSubmit);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);