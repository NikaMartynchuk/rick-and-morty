import { getEpisodes, getEpisodeById, getCharacterById } from './API.js';

const episodesContainer = document.getElementById("episodes");
const loadMoreBtn = document.getElementById("loadMore");
const nameInput = document.getElementById("name");
const seasonSelect = document.getElementById("season");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const noResults = document.getElementById("noResults");

let currentPage = 1;
let allPages = 1;
let filters = {};

function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function createEpisodeCard(episode) {
  const div = document.createElement("div");
  div.className = "episode-card";
  div.innerHTML = `
    <div class="episode-bg">
      <div class="overlay"></div>
      <div class="episode-info">
        <h3>${episode.name}</h3>
        <p>${new Date(episode.air_date).toDateString()}</p>
      </div>
    </div>
  `;
  div.addEventListener("click", () => openModal(episode.id));
  episodesContainer.appendChild(div);
}

async function loadEpisodes() {
  loadMoreBtn.style.display = "none";

  try {
    const data = await getEpisodes(currentPage, filters);

    if (currentPage === 1) episodesContainer.innerHTML = "";

    if (!data || !data.results || data.results.length === 0) {
      noResults.classList.remove("hidden");
      episodesContainer.classList.add("hidden");
      loadMoreBtn.style.display = "none";
      allPages = 1;
      return;
    }

    noResults.classList.add("hidden");
    episodesContainer.classList.remove("hidden");

    if (data.info && data.info.pages) {
      allPages = data.info.pages;
    } else if (data.info && data.info.count) {
      allPages = Math.ceil(data.info.count / 20) || 1;
    } else {
      allPages = 1;
    }

    data.results.forEach(createEpisodeCard);

    loadMoreBtn.style.display = currentPage >= allPages ? "none" : "block";
  } catch (err) {
    console.error("Error loading episodes:", err);
    noResults.classList.remove("hidden");
    episodesContainer.classList.add("hidden");
    loadMoreBtn.style.display = "none";
  }
}

async function openModal(id) {
  modal.classList.add("show");
  modalBody.innerHTML = `<p class="loading">Loading...</p>`;

  try {
    const episode = await getEpisodeById(id);

    const majorCharacters = episode.characters.slice(0, 4);
    const characters = await Promise.all(
      majorCharacters.map(async (url) => {
        const charId = url.split("/").pop();
        return await getCharacterById(charId);
      })
    );

    modalBody.innerHTML = `
      <div class="modal-inner-border">
        <h2>${episode.name}</h2>
        <p class="date">${new Date(episode.air_date).toDateString()}</p>
        <h3 class="sub-title">Major Characters</h3>
        <div class="characters">
          ${characters.map(ch => `
            <div class="character-row">
              <img src="${ch.image}" alt="${ch.name}">
              <p>${ch.name}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Error opening modal:", err);
    modalBody.innerHTML = `<p>Error loading episode details.</p>`;
  }
}

function closeModalWindow() {
  modal.classList.remove("show");
}

loadMoreBtn.addEventListener("click", () => {
  if (currentPage < allPages) {
    currentPage++;
    loadEpisodes();
  }
});

const debouncedSearch = debounce(() => {
  currentPage = 1;
  loadEpisodes();
}, 350);

nameInput.addEventListener("input", (e) => {
  filters.name = e.target.value.trim();
  if (!filters.name) delete filters.name;
  episodesContainer.innerHTML = "";
  debouncedSearch();
});

seasonSelect.addEventListener("change", (e) => {
  const val = e.target.value;
  if (val) filters.episode = val;
  else delete filters.episode;

  currentPage = 1;
  episodesContainer.innerHTML = "";
  loadEpisodes();
});

closeModal.addEventListener("click", closeModalWindow);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModalWindow();
});

loadEpisodes();
