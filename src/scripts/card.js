export { createCard, onDelete, activeLikeButton };

function createCard(cardData, onDelete, likeCallBack, openPopupCallBack) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const popupImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  deleteButton.addEventListener("click", () => onDelete(cardElement));

  likeButton.addEventListener("click", () => likeCallBack(likeButton));

  popupImage.addEventListener("click", () => openPopupCallBack(cardData));

  return cardElement;
}

function onDelete(cardElement) {
  cardElement.remove();
}

function activeLikeButton(button) {
  button.classList.add("card__like-button_is-active");
}
