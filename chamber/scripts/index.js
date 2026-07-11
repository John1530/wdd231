/* Hyderabad Chamber of Commerce — landing page logic */

/* ---------- weather (Open-Meteo, no API key required) ---------- */
const HYDERABAD_LAT = 17.385;
const HYDERABAD_LON = 78.4867;

const weatherCodeMap = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  80: "Rain showers",
  95: "Thunderstorm",
};

async function loadWeather() {
  const tempEl = document.querySelector("#weather-temp");
  const descEl = document.querySelector("#weather-desc");
  const highLowEl = document.querySelector("#weather-highlow");
  if (!tempEl) return;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${HYDERABAD_LAT}&longitude=${HYDERABAD_LON}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const current = data.current_weather;
    const description = weatherCodeMap[current.weathercode] || "Current conditions";
    const high = Math.round(data.daily.temperature_2m_max[0]);
    const low = Math.round(data.daily.temperature_2m_min[0]);

    tempEl.textContent = `${Math.round(current.temperature)}°C`;
    descEl.textContent = description;
    highLowEl.textContent = `H: ${high}°C  L: ${low}°C`;
  } catch (error) {
    tempEl.textContent = "—";
    descEl.textContent = "Weather unavailable right now";
    console.error("Failed to load weather:", error);
  }
}

/* ---------- member spotlights ---------- */
async function loadSpotlights() {
  const spotlightList = document.querySelector("#spotlight-list");
  if (!spotlightList) return;

  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const eligible = data.members.filter((m) => m.membership === 2 || m.membership === 3);
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const chosen = shuffled.slice(0, 3);

    const levelLabel = { 2: "Silver Member", 3: "Gold Member" };

    spotlightList.innerHTML = chosen
      .map(
        (m) => `
        <li class="spotlight-card">
          <img src="${m.image}" alt="${m.name} logo" width="72" height="72" loading="lazy">
          <div>
            <span class="badge badge--${m.membership}">${levelLabel[m.membership]}</span>
            <h3>${m.name}</h3>
            <p>${m.tagline}</p>
            <p class="spotlight-card__meta">${m.phone} · <a href="${m.website}" target="_blank" rel="noopener">Website</a></p>
          </div>
        </li>`
      )
      .join("");
  } catch (error) {
    spotlightList.innerHTML = "<li>Spotlights unavailable right now.</li>";
    console.error("Failed to load spotlights:", error);
  }
}

loadWeather();
loadSpotlights();
