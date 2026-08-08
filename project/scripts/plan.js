// ==============================
// Get Submitted Form Data
// ==============================

const params = new URLSearchParams(
  location.search
)

const details =
  document.querySelector("#form-details");

const recommendation =
  document.querySelector("#recommendation");


// ==============================
// Form Fields
// ==============================

const fields = [
  ["name", "Name"],
  ["email", "Email"],
  ["interest", "Interest"],
  ["experience", "Experience"],
  ["goal", "Goal"],
  ["submitted", "Submitted"]
];


// ==============================
// Display Submitted Information
// ==============================

if (details) {
  details.innerHTML = fields
    .map(([key, label]) => {
      const value =
        params.get(key) || "Not provided";

      return `
        <dt>${label}</dt>
        <dd>${value}</dd>
      `;
    })
    .join("");
}


// ==============================
// Get Selected Interest
// ==============================

const interest =
  params.get("interest") ||
  "aerospace fundamentals";


// ==============================
// Learning Recommendations
// ==============================

const suggestions = {
  Aerodynamics:
    "Begin with the four forces and lift calculator, then study airfoils and CFD.",

  Propulsion:
    "Start with thrust, engine categories, energy conversion, and nozzle fundamentals.",

  "Aircraft Design":
    "Study requirements, configuration choices, weight balance, and multidisciplinary trade-offs.",

  "Space Systems":
    "Begin with orbital motion, launch vehicles, spacecraft subsystems, and mission design.",

  "Flight Control and AI":
    "Build foundations in flight dynamics, feedback control, sensors, Python, and machine learning."
};


// ==============================
// Display Recommendation
// ==============================

const defaultSuggestion =
  "Begin with the Flight Concepts page and explore aircraft that match your interest.";

const selectedSuggestion =
  suggestions[interest] ||
  defaultSuggestion;


if (recommendation) {
  recommendation.innerHTML = `
    <h3>Recommended Starting Point</h3>

    <p>
      ${selectedSuggestion}
    </p>
  `;
}