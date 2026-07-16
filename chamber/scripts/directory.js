/* Hyderabad Chamber of Commerce — directory page logic */

const memberList = document.querySelector("#member-list");
const gridButton = document.querySelector("#view-grid");
const listButton = document.querySelector("#view-list");
const memberCount = document.querySelector("#member-count");

const membershipLabels = {
  1: "Member",
  2: "Silver",
  3: "Gold"
};

/**
 * Loads member information from the JSON file.
 * @returns {Promise<Array>} Chamber member records.
 */
async function getMembers() {
  const response = await fetch("data/members.json");

  if (!response.ok) {
    throw new Error(
      `Unable to load members.json: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.members)) {
    throw new Error("The member data is not in the expected format.");
  }

  return data.members;
}

/**
 * Returns the visible membership label.
 * @param {number} level Membership level.
 * @returns {string}
 */
function getMembershipLabel(level) {
  return membershipLabels[level] ?? "Member";
}

/**
 * Creates the HTML for one member card.
 * @param {Object} member Chamber member information.
 * @returns {string}
 */
function createMemberCard(member) {
  const level = Number(member.membership) || 1;
  const membershipName = getMembershipLabel(level);

  return `
    <li class="member-card">
      <div class="member-card__image-wrap">
        <img
          src="${member.image}"
          alt="${member.name} logo"
          width="140"
          height="140"
          loading="lazy"
          decoding="async"
        >
      </div>

      <div class="member-card__body">
        <span class="badge badge--${level}">
          ${membershipName}
        </span>

        <h2 class="member-card__name">
          ${member.name}
        </h2>

        <p class="member-card__tagline">
          ${member.tagline}
        </p>

        <p class="member-card__meta">
          ${member.address}<br>
          ${member.phone}
        </p>

        <a
          class="member-card__link"
          href="${member.website}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit website
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </li>
  `;
}

/**
 * Displays all chamber members.
 * @param {Array} members Chamber member records.
 */
function renderMembers(members) {
  if (!memberList || !memberCount) {
    return;
  }

  const memberCards = members
    .map(createMemberCard)
    .join("");

  memberList.innerHTML = memberCards;

  memberCount.textContent =
    `${members.length} member ${members.length === 1 ? "business" : "businesses"}`;
}

/**
 * Switches between grid and list views.
 * @param {"grid"|"list"} view Requested directory view.
 */
function setView(view) {
  if (!memberList || !gridButton || !listButton) {
    return;
  }

  const isGridView = view === "grid";

  memberList.classList.toggle("view-grid", isGridView);
  memberList.classList.toggle("view-list", !isGridView);

  gridButton.setAttribute("aria-pressed", String(isGridView));
  listButton.setAttribute("aria-pressed", String(!isGridView));
}

/**
 * Displays a loading error.
 */
function showError() {
  if (memberList) {
    memberList.innerHTML = `
      <li class="loading">
        Sorry, the member directory could not be loaded.
      </li>
    `;
  }

  if (memberCount) {
    memberCount.textContent = "Member directory unavailable";
  }
}

/**
 * Initializes the directory page.
 */
async function initializeDirectory() {
  if (!memberList) {
    return;
  }

  gridButton?.addEventListener("click", () => {
    setView("grid");
  });

  listButton?.addEventListener("click", () => {
    setView("list");
  });

  try {
    const members = await getMembers();
    renderMembers(members);
  } catch (error) {
    showError();
    console.error("Failed to load chamber members:", error);
  }
}

initializeDirectory();