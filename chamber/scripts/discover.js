/* Hyderabad Chamber of Commerce — discover page logic */

const visitMessage = document.querySelector("#visit-message");
const lastVisitKey = "hyderabadChamberLastVisit";

function getVisitMessage(daysSinceLastVisit) {
  if (daysSinceLastVisit === null) {
    return "Welcome! Let us know if you have any questions while exploring Hyderabad.";
  }

  if (daysSinceLastVisit < 1) {
    return "Back so soon! Awesome!";
  }

  if (daysSinceLastVisit === 1) {
    return "You last visited 1 day ago.";
  }

  return `You last visited ${daysSinceLastVisit} days ago.`;
}

function calculateDaysBetween(previousDate, currentDate) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const difference = currentDate - previousDate;

  return Math.floor(difference / millisecondsPerDay);
}

function displayVisitMessage() {
  if (!visitMessage) {
    return;
  }

  const currentVisit = Date.now();
  const previousVisit = localStorage.getItem(lastVisitKey);

  let daysSinceLastVisit = null;

  if (previousVisit) {
    daysSinceLastVisit = calculateDaysBetween(
      Number(previousVisit),
      currentVisit
    );
  }

  visitMessage.textContent = getVisitMessage(daysSinceLastVisit);

  localStorage.setItem(lastVisitKey, String(currentVisit));
}

displayVisitMessage();