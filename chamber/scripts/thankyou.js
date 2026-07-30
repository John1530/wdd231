/* Thank-you page: display submitted membership information */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const membershipNames = {
    np: "Nonprofit Membership",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
  };

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = value || "Not provided";
    }
  };

  setText("#firstName", params.get("firstName"));
  setText("#lastName", params.get("lastName"));
  setText("#email", params.get("email"));
  setText("#phone", params.get("phone"));
  setText("#organization", params.get("organization"));

  const membershipValue = params.get("membershipLevel");
  setText("#membership", membershipNames[membershipValue] || membershipValue);

  const timestampValue = params.get("timestamp");
  let formattedTimestamp = timestampValue;

  if (timestampValue) {
    const submittedDate = new Date(timestampValue);
    if (!Number.isNaN(submittedDate.getTime())) {
      formattedTimestamp = submittedDate.toLocaleString();
    }
  }

  setText("#timestamp", formattedTimestamp);
});
