// Current Year
document.getElementById("current-year").textContent = new Date().getFullYear();

// Last Modified
document.getElementById("last-modified").textContent = document.lastModified;

// Mobile Navigation
const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");

if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";

        navToggle.setAttribute("aria-expanded", !isOpen);
        primaryNav.classList.toggle("is-open");
    });
}