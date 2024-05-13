const cardTemplate = document.querySelector("#card-template").content;
const container = document.querySelector(".content");


function renderCard(cardData) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
        const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
    
  deleteButton.addEventListener("click", () => {
      deleteCard(cardElement);
    });

    return cardElement;
}

initialCards.forEach((cardData) => {
 const result = renderCard(cardData);
 const cardsContainer = container.querySelector(".places__list");
 cardsContainer.append(result)

})

function deleteCard(cardElement) {
  cardElement.remove();
}

addCard();
