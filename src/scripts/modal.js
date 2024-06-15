export {
  addOpenPopupButtonListener,
  addClosePopupButtonListener,
  openPopupOpened,
  openPopupAnimated,
  closeModal,
};

function openPopupOpened(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeModalOverlay);
  document.addEventListener("keydown", closeModalEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeModalOverlay);
  document.removeEventListener("keydown", closeModalEsc);
}

function openPopupAnimated(popup) {
  popup.classList.add("popup_is-animated");
}

function addOpenPopupButtonListener(button, window) {
  button.addEventListener("click", function (event) {
    openPopupOpened(window);
  });
}

function addClosePopupButtonListener(button) {
  const popupToClose = button.closest("div.popup");
  button.addEventListener("click", function (event) {
    closeModal(popupToClose);
    openPopupAnimated(popupToClose);
  });
}

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupToClose = document.querySelector(".popup_is-opened");
    closeModal(popupToClose);
  }
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
