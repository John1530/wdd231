// Current Year
const year = document.getElementById("currentyear");
if (year) {
    year.textContent = new Date().getFullYear();
}

// Last Modified
const modified = document.getElementById("lastModified");
if (modified) {
    modified.textContent = document.lastModified;
}