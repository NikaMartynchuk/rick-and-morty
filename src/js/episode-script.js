import { getEpisodes, getEpisodeById, getCharacterById } from "./API.js";

const episodesContainer = document.getElementById("episodes");
const loadMoreBtn = document.getElementById("loadMore");
const nameInput = document.getElementById("name");
const seasonSelect = document.getElementById("season");

const popup = document.getElementById("popup");
const popupContent = document.getElementById("popupContent");
const closePopup = document.getElementById("closePopup");

const noResults = document.getElementById("noResults");

let currentPage = 1;
let allPages = 1;
let filters = {};

function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function createEpisodeCard(ep) {
  const div = document.createElement("div");
  div.className = "episode-card";
  div.innerHTML = `
    <div class="episode-bg">
      <div class="overlay"></div>
      <div class="episode-info">
        <h3>${ep.name}</h3>
        <p>${new Date(ep.air_date).toDateString()}</p>
      </div>
    </div>
  `;
  div.addEventListener("click", () => openPopup(ep.id));
  episodesContainer.appendChild(div);
}

async function loadEpisodes() {
  loadMoreBtn.style.display = "none";

  try {
    const data = await getEpisodes(currentPage, filters);

    if (currentPage === 1) episodesContainer.innerHTML = "";

    if (!data || !data.results?.length) {
episodesContainer.classList.add("hidden");
noResults.classList.remove("hidden");
noResults.classList.add("show"); // ✅ новий клас
      return;
    }

 noResults.classList.remove("show");
noResults.classList.add("hidden");
episodesContainer.classList.remove("hidden");


    allPages = data.info.pages;
    data.results.forEach(createEpisodeCard);

    if (currentPage < allPages) loadMoreBtn.style.display = "block";

  } catch (err) {
    console.error("Error loading episodes:", err);
  }
}

/* ✅ Open Modal */
async function openPopup(id) {
  popup.classList.remove("hidden");
  popup.classList.add("visible");

  popupContent.innerHTML = "<p>Loading...</p>";

  try {
    const ep = await getEpisodeById(id);
    const chars = await Promise.all(
      ep.characters.slice(0, 4).map(async (c) => {
        return await getCharacterById(c.split("/").pop());
      })
    );

    popupContent.innerHTML = `
      <div class="popup-box-border">
        <h2>${ep.name}</h2>
        <p class="date">${new Date(ep.air_date).toDateString()}</p>

        <h3 class="sub-title">Major Characters</h3>
<div class="popup-characters-list">
          ${chars
            .map(
              (ch) => `
              <div class="character-row">
                <img src="${ch.image}" alt="${ch.name}">
                <p>${ch.name}</p>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;
  } catch (err) {
    popupContent.innerHTML = "<p>Error loading episode.</p>";
  }
}

/* ✅ Close Modal */
function closePopupWindow() {
  popup.classList.remove("visible");
  popup.classList.add("hidden");
}

closePopup.addEventListener("click", closePopupWindow);

popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopupWindow();
});

/* Load More */
loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  loadEpisodes();
});

/* Search */
nameInput.addEventListener(
  "input",
  debounce(() => {
    filters.name = nameInput.value.trim();
    if (!filters.name) delete filters.name;
    currentPage = 1;
    loadEpisodes();
  }, 350)
);

/* Season Filter */
seasonSelect.addEventListener("change", () => {
  const v = seasonSelect.value;
  if (v) filters.episode = v;
  else delete filters.episode;

  currentPage = 1;
  loadEpisodes();
});

/* ✅ Load first episodes */
loadEpisodes();
