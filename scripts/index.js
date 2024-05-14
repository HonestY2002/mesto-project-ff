const cardTemplate = document.querySelector("#card-template").content;
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");

function createCard(cardData, onDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  deleteButton.addEventListener("click", () => onDelete(cardElement));

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, onDelete);
  cardsContainer.append(cardElement);
});

function onDelete(cardElement) {
  cardElement.remove();
}
