export function createCard(
  cardTemplate,
  cardData,
  deleteCard,
  likeCard,
  openPopupCallBack,
  userId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const popupImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardId = cardData._id;

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length || "";

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  const likeCallback = (e, likeCount, cardId) => {
    likeCard(e, cardId)
      .then((card) => {
        e.target.classList.toggle("card__like-button_is-active");
        likeCount.textContent = card.likes.length || "";
      })
      .catch((err) => console.log(err));
  };

  likeButton.addEventListener("click", (e) => {
    likeCallback(e, likeCount, cardId);
  });

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    const deleteCallback = (e, cardId) => {
      deleteCard(cardId, e)
        .then(() => {
          const cards = evt.target.closest(".places__item.card");
          cards.remove();
        })
        .catch((err) => console.log(err));
    };
    deleteButton.addEventListener("click", (e) => {
      deleteCallback(e, cardId);
    });
  }

  popupImage.addEventListener("click", () => openPopupCallBack(cardData));

  return cardElement;
}
