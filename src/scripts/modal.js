export {
  popupWindow,
  closeModal,
  popupOpened,
  popupAnimated,
  removePopupOpened,
};

function popupOpened(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeModalOverlay);
  document.addEventListener("keydown", closeModalEsc);
}

function removePopupOpened(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeModalOverlay);
  document.removeEventListener("keydown", closeModalEsc);
}

function popupAnimated(popup) {
  popup.classList.add("popup_is-animated");
}

function popupWindow(button, window) {
  button.addEventListener("click", function (event) {
    popupOpened(window);
  });
}

function closeModal(button) {
  const popupToClose = button.closest("div.popup");
  button.addEventListener("click", function (event) {
    removePopupOpened(popupToClose);
    popupAnimated(popupToClose);
  });
}

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupToClose = document.querySelector(".popup_is-opened");
    removePopupOpened(popupToClose);
  }
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    removePopupOpened(openedPopup);
  }
}
