const grid = document.querySelector("#aircraft-grid");
const count = document.querySelector("#result-count");
const error = document.querySelector("#data-error");
const search = document.querySelector("#search");
const category = document.querySelector("#category-filter");
const sort = document.querySelector("#sort");
const favoritesFilter = document.querySelector("#favorites-filter");
const clearFavorites = document.querySelector("#clear-favorites");
const dialog = document.querySelector("#aircraft-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialog = document.querySelector("#close-dialog");

let aircraft = [];

let favorites = new Set(
  JSON.parse(localStorage.getItem("aerovision-favorites") || "[]")
);

let favoritesOnly = false;


// ==============================
// Local Storage
// ==============================

function saveFavorites() {
  localStorage.setItem(
    "aerovision-favorites",
    JSON.stringify([...favorites])
  );
}


// ==============================
// Aircraft Card Template
// ==============================

function cardTemplate(item) {
  const saved = favorites.has(item.id);

  return `
    <article class="aircraft-card">
      <img
        src="${item.image}"
        alt="Illustration of ${item.name}"
        width="640"
        height="360"
        loading="lazy"
      >

      <p class="eyebrow">${item.category}</p>

      <h2>${item.name}</h2>

      <p>${item.description}</p>

      <div class="aircraft-meta">
        <span>
          <strong>Maker:</strong>
          ${item.manufacturer}
        </span>

        <span>
          <strong>Introduced:</strong>
          ${item.introduced}
        </span>

        <span>
          <strong>Speed:</strong>
          ${item.maxSpeedKmh.toLocaleString()} km/h
        </span>

        <span>
          <strong>Range:</strong>
          ${item.rangeKm.toLocaleString()} km
        </span>
      </div>

      <div class="card-actions">
        <button
          class="button secondary details-button"
          type="button"
          data-id="${item.id}"
        >
          Details
        </button>

        <button
          class="button secondary favorite-button"
          type="button"
          data-favorite="${item.id}"
          aria-pressed="${saved}"
        >
          ${saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  `;
}


// ==============================
// Render Aircraft
// ==============================

function render() {
  const term = search.value.trim().toLowerCase();

  let filtered = aircraft.filter((item) => {
    const matchesText = [
      item.name,
      item.manufacturer,
      item.role
    ].some((value) =>
      value.toLowerCase().includes(term)
    );

    const matchesCategory =
      category.value === "all" ||
      item.category === category.value;

    const matchesFavorite =
      !favoritesOnly ||
      favorites.has(item.id);

    return (
      matchesText &&
      matchesCategory &&
      matchesFavorite
    );
  });


  const sorters = {
    name: (a, b) =>
      a.name.localeCompare(b.name),

    "speed-desc": (a, b) =>
      b.maxSpeedKmh - a.maxSpeedKmh,

    "range-desc": (a, b) =>
      b.rangeKm - a.rangeKm,

    year: (a, b) =>
      a.introduced - b.introduced
  };


  filtered.sort(sorters[sort.value]);


  grid.innerHTML = filtered
    .map(cardTemplate)
    .join("");


  count.textContent =
    `Showing ${filtered.length} of ${aircraft.length} vehicles`;


  grid
    .querySelectorAll(".details-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        openDetails(button.dataset.id);
      });
    });


  grid
    .querySelectorAll(".favorite-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        toggleFavorite(
          button.dataset.favorite
        );
      });
    });
}


// ==============================
// Favorites
// ==============================

function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }

  saveFavorites();

  render();
}


// ==============================
// Modal Dialog
// ==============================

function openDetails(id) {
  const item = aircraft.find(
    (vehicle) => vehicle.id === id
  );


  dialogContent.innerHTML = `
    <img
      class="dialog-image"
      src="${item.image}"
      alt="Illustration of ${item.name}"
      width="640"
      height="320"
    >

    <p class="eyebrow">
      ${item.category}
    </p>

    <h2>
      ${item.name}
    </h2>

    <p>
      ${item.description}
    </p>

    <dl>
      <dt>Manufacturer</dt>
      <dd>${item.manufacturer}</dd>

      <dt>Primary role</dt>
      <dd>${item.role}</dd>

      <dt>Introduced</dt>
      <dd>${item.introduced}</dd>

      <dt>Propulsion</dt>
      <dd>${item.propulsion}</dd>

      <dt>Maximum speed</dt>
      <dd>
        ${item.maxSpeedKmh.toLocaleString()} km/h
      </dd>

      <dt>Representative range</dt>
      <dd>
        ${item.rangeKm.toLocaleString()} km
      </dd>
    </dl>
  `;


  dialog.showModal();
}


// ==============================
// Fetch API / JSON Data
// ==============================

async function loadAircraft() {
  try {

    // Fetch API request
    const response = await fetch(
      "data/aircraft.json"
    );


    // Check if the request succeeded
    if (!response.ok) {
      throw new Error(
        "Data request failed: " + response.status
      );
    }


    // Convert JSON response
    aircraft = await response.json();


    // Build category filter options
    const categories = [
      ...new Set(
        aircraft.map(
          (item) => item.category
        )
      )
    ].sort();


    categories.forEach((value) => {
      category.insertAdjacentHTML(
        "beforeend",
        `<option>${value}</option>`
      );
    });


    render();

  } catch (err) {

    console.error(err);

    error.hidden = false;

    error.textContent =
      "Aircraft data could not be loaded. Please try again later.";

    count.textContent =
      "Aircraft unavailable";
  }
}


// ==============================
// Event Listeners
// ==============================

[search, category, sort].forEach(
  (control) => {
    control.addEventListener(
      "input",
      render
    );
  }
);


favoritesFilter.addEventListener(
  "click",
  () => {

    favoritesOnly =
      !favoritesOnly;


    favoritesFilter.setAttribute(
      "aria-pressed",
      String(favoritesOnly)
    );


    favoritesFilter.textContent =
      favoritesOnly
        ? "Show all"
        : "Show favorites";


    render();
  }
);


clearFavorites.addEventListener(
  "click",
  () => {

    favorites.clear();

    saveFavorites();

    render();
  }
);


closeDialog.addEventListener(
  "click",
  () => {
    dialog.close();
  }
);


dialog.addEventListener(
  "click",
  (event) => {

    if (event.target === dialog) {
      dialog.close();
    }
  }
);


// ==============================
// Load Aircraft Data
// ==============================

loadAircraft();

