/* Hyderabad Chamber of Commerce — home page logic */

const HYDERABAD = {
  latitude: 17.385,
  longitude: 78.4867,
  timezone: "Asia/Kolkata"
};

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Rain showers",
  82: "Heavy rain showers",
  85: "Light snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm with hail"
};

const membershipLabels = {
  2: "Silver Member",
  3: "Gold Member"
};

function weatherIconPath(code) {
  if (code === 0) return "images/weather-placeholder.svg";
  if ([1, 2].includes(code)) return "images/weather-placeholder.svg";
  if ([3, 45, 48].includes(code)) return "images/weather-placeholder.svg";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "images/weather-placeholder.svg";
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "images/weather-placeholder.svg";
  return "images/weather-placeholder.svg";
}

function formatTime(isoTime) {
  if (!isoTime) return "--";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: HYDERABAD.timezone
  }).format(new Date(isoTime));
}

function formatForecastDay(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    timeZone: HYDERABAD.timezone
  }).format(new Date(`${dateString}T12:00:00+05:30`));
}

async function loadWeather() {
  const currentTemp = document.querySelector("#current-temp");
  const description = document.querySelector("#weather-description");
  const high = document.querySelector("#weather-high");
  const low = document.querySelector("#weather-low");
  const humidity = document.querySelector("#weather-humidity");
  const sunrise = document.querySelector("#sunrise-time");
  const sunset = document.querySelector("#sunset-time");
  const weatherIcon = document.querySelector("#weather-icon");
  const forecast = document.querySelector("#forecast");

  if (!currentTemp || !description || !forecast) return;

  const parameters = new URLSearchParams({
    latitude: String(HYDERABAD.latitude),
    longitude: String(HYDERABAD.longitude),
    current: "temperature_2m,relative_humidity_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
    timezone: HYDERABAD.timezone,
    forecast_days: "4"
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${parameters}`);

    if (!response.ok) {
      throw new Error(`Weather request failed: ${response.status}`);
    }

    const data = await response.json();
    const currentCode = data.current.weather_code;

    currentTemp.textContent = Math.round(data.current.temperature_2m);
    description.textContent =
      weatherDescriptions[currentCode] ?? "Current weather conditions";

    if (high) high.textContent = Math.round(data.daily.temperature_2m_max[0]);
    if (low) low.textContent = Math.round(data.daily.temperature_2m_min[0]);
    if (humidity) humidity.textContent = Math.round(data.current.relative_humidity_2m);
    if (sunrise) sunrise.textContent = formatTime(data.daily.sunrise[0]);
    if (sunset) sunset.textContent = formatTime(data.daily.sunset[0]);

    if (weatherIcon) {
      weatherIcon.src = weatherIconPath(currentCode);
      weatherIcon.alt = description.textContent;
    }

    forecast.innerHTML = data.daily.time
      .slice(1, 4)
      .map((date, index) => {
        const dataIndex = index + 1;
        const code = data.daily.weather_code[dataIndex];
        const max = Math.round(data.daily.temperature_2m_max[dataIndex]);
        const min = Math.round(data.daily.temperature_2m_min[dataIndex]);

        return `
          <article class="forecast-card">
            <h3>${formatForecastDay(date)}</h3>
            <p>${weatherDescriptions[code] ?? "Forecast available"}</p>
            <p><strong>${max}°C</strong> / ${min}°C</p>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    description.textContent = "Weather information is currently unavailable.";
    forecast.innerHTML = `
      <article class="forecast-card">
        <h3>Forecast unavailable</h3>
        <p>Please try again later.</p>
      </article>
    `;
    console.error("Unable to load Hyderabad weather:", error);
  }
}

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

function createSpotlightCard(member) {
  return `
    <article class="spotlight-card">
      <img
        src="${member.image}"
        alt="${member.name} logo"
        width="96"
        height="96"
        loading="lazy"
        decoding="async"
      >

      <div>
        <span class="badge badge--${member.membership}">
          ${membershipLabels[member.membership]}
        </span>

        <h3>${member.name}</h3>
        <p>${member.tagline}</p>

        <p class="spotlight-card__meta">
          ${member.phone}<br>
          <a
            href="${member.website}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website
          </a>
        </p>
      </div>
    </article>
  `;
}

async function loadSpotlights() {
  const spotlightList = document.querySelector("#spotlight-list");
  if (!spotlightList) return;

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`Member request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.members)) {
      throw new Error("The member data format is invalid.");
    }

    const eligibleMembers = data.members.filter(
      (member) => member.membership === 2 || member.membership === 3
    );

    const selectedMembers = shuffle(eligibleMembers).slice(0, 3);

    spotlightList.innerHTML = selectedMembers
      .map(createSpotlightCard)
      .join("");
  } catch (error) {
    spotlightList.innerHTML = `
      <article class="spotlight-card">
        <h3>Spotlights unavailable</h3>
        <p>Featured businesses could not be loaded.</p>
      </article>
    `;
    console.error("Unable to load member spotlights:", error);
  }
}

async function initializeHomePage() {
  await Promise.allSettled([
    loadWeather(),
    loadSpotlights()
  ]);
}

initializeHomePage();
