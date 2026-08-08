const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#primary-nav");


// ==============================
// Responsive Navigation
// ==============================

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "Open navigation menu"
        : "Close navigation menu"
    );

    nav.classList.toggle(
      "open",
      !isOpen
    );
  });


  // Highlight the current page
  nav.querySelectorAll("a").forEach((link) => {
    if (link.pathname === location.pathname) {
      link.setAttribute(
        "aria-current",
        "page"
      );
    }
  });
}


// ==============================
// Footer Information
// ==============================

const year =
  document.querySelector("#current-year");

const modified =
  document.querySelector("#last-modified");


if (year) {
  year.textContent =
    new Date().getFullYear();
}


if (modified) {
  modified.textContent =
    `Last modified: ${document.lastModified}`;
}


// ==============================
// Form Submission Timestamp
// ==============================

const submitted =
  document.querySelector("#submitted-at");


if (submitted) {
  submitted.value =
    new Date().toISOString();
}