/* Hyderabad Chamber of Commerce — shared across all pages */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("#nav-toggle");
  const primaryNav = document.querySelector("#primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const lastModified = document.querySelector("#last-modified");
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
});
