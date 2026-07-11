/* Hyderabad Chamber of Commerce — directory page logic */

const memberList = document.querySelector("#member-list");
const gridBtn = document.querySelector("#view-grid");
const listBtn = document.querySelector("#view-list");
const countEl = document.querySelector("#member-count");

const membershipLabel = {
  1: "Member",
  2: "Silver",
  3: "Gold",
};

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  return data.members;
}

function cardTemplate(member) {
  const level = member.membership;
  return `
    <li class="member-card">
      <div class="member-card__image-wrap">
        <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="140" height="140">
      </div>
      <div class="member-card__body">
        <span class="badge badge--${level}">${membershipLabel[level]}</span>
        <h3 class="member-card__name">${member.name}</h3>
        <p class="member-card__tagline">${member.tagline}</p>
        <p class="member-card__meta">
          ${member.address}<br>
          ${member.phone}
        </p>
        <a class="member-card__link" href="${member.website}" target="_blank" rel="noopener">Visit website →</a>
      </div>
    </li>
  `;
}

function renderMembers(members) {
  memberList.innerHTML = members.map(cardTemplate).join("");
  countEl.textContent = `${members.length} member businesses`;
}

function setView(view) {
  const isGrid = view === "grid";
  memberList.classList.toggle("view-list", !isGrid);
  memberList.classList.toggle("view-grid", isGrid);
  gridBtn.setAttribute("aria-pressed", String(isGrid));
  listBtn.setAttribute("aria-pressed", String(!isGrid));
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

async function init() {
  try {
    const members = await getMembers();
    renderMembers(members);
  } catch (error) {
    memberList.innerHTML = `<li>Sorry, member data could not be loaded right now.</li>`;
    console.error("Failed to load members:", error);
  }
}

init();
