const form = document.querySelector("#lift-form");
const result = document.querySelector("#lift-result");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get values from the form
  const density = Number(
    document.querySelector("#density").value
  );

  const velocity = Number(
    document.querySelector("#velocity").value
  );

  const area = Number(
    document.querySelector("#area").value
  );

  const coefficient = Number(
    document.querySelector("#coefficient").value
  );

  // Lift Equation:
  // L = 1/2 × ρ × V² × S × CL
  const lift =
    0.5 *
    density *
    velocity ** 2 *
    area *
    coefficient;

  const formattedLift =
    Math.round(lift).toLocaleString();

  // Display the calculated result
  result.innerHTML = `
    <span class="result-label">
      Estimated Lift Force
    </span>

    <strong class="result-value">
      ${formattedLift} N
    </strong>

    <span class="result-message">
      Generated at ${velocity} m/s
    </span>
  `;

  result.classList.add("show-result");
});

