/* Join page: timestamp and membership dialogs */

document.addEventListener("DOMContentLoaded", () => {
  const timestamp = document.querySelector("#timestamp");

  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }

  const modalButtons = document.querySelectorAll(".membership-details");
  const dialogs = document.querySelectorAll(".membership-modal");

  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.modal;
      const dialog = document.getElementById(modalId);

      if (dialog instanceof HTMLDialogElement) {
        dialog.showModal();
      }
    });
  });

  dialogs.forEach((dialog) => {
    const closeButton = dialog.querySelector(".modal-close");

    closeButton?.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const clickedInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!clickedInside) {
        dialog.close();
      }
    });
  });
});
