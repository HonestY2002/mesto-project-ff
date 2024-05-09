let cardTemplate = document.querySelector("#card-template").content;
let container = document.querySelector(".content");
let cardsContainer = container.querySelector(".places__list");

function addCard(deleteCard) {
  initialCards.forEach(function (element) {
    let cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);
    let deleteButton = cardElement.querySelector(".card__delete-button");
    cardElement.querySelector(".card__image").src = element.link;
    cardElement.querySelector(".card__title").textContent = element.name;
    cardsContainer.append(cardElement);

    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement);
    });
  });
}

function deleteCard(cardElement) {
  cardElement.remove();
}

addCard(deleteCard);
