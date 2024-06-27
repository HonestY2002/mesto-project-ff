
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
  const likeCount = cardElement.querySelector('.card__like-count');
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
     likeButton.addEventListener("click", (e) => {
       likeCard(e, cardId)
         .then((card) => {
           e.target.classList.toggle("card__like-button_is-active");
           likeCount.textContent = card.likes.length || "";
         })
         .catch((err) => console.log(err));
     });

     if (cardData.owner._id !== userId) {
       deleteButton.remove();
     } else {
       deleteButton.addEventListener("click", (e) => {
         deleteCard(cardId)
           .then(() => {
             const card = evt.target.closest(".places__item.card");
             card.remove();
           })
           .catch((err) => console.log(err));
       });
     }

  popupImage.addEventListener("click", () => openPopupCallBack(cardData));

  return cardElement;
}