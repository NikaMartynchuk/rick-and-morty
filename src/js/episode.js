const episodesContainer = document.getElementById("episodesContainer");
const loadMoreBtn = document.getElementById("loadMore");
const seasonSelect = document.getElementById("seasonSelect");
const episodeSelect = document.getElementById("episodeSelect");
const modal = document.getElementById("episodeModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

let currentPage = 1;
let totalPages = 3;
let allEpisodes = [];
let filteredEpisodes = [];

async function loadEpisodes(page = 1) {
  const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
  const data = await response.json();
  allEpisodes = [...allEpisodes, ...data.results];
  totalPages = data.info.pages;
  renderEpisodes(allEpisodes);
  fillSeasonSelect();
}

function renderEpisodes(episodes) {
  episodesContainer.innerHTML = "";

  episodes.forEach(ep => {
    const card = document.createElement("div");
    card.classList.add("episode-card");
    card.innerHTML = `
      <h3>${ep.episode}</h3>
      <p>${ep.name}</p>
      <span>${ep.air_date}</span>
    `;
    card.addEventListener("click", () => openModal(ep));
    episodesContainer.appendChild(card);
  });
}

function fillSeasonSelect() {
  const seasons = [...new Set(allEpisodes.map(e => e.episode.slice(0, 3)))];
  seasonSelect.innerHTML = `<option value="">All seasons</option>`;
  seasons.forEach(season => {
    const option = document.createElement("option");
    option.value = season;
    option.textContent = `Season ${season.slice(1)}`;
    seasonSelect.appendChild(option);
  });
}

seasonSelect.addEventListener("change", () => {
  const selectedSeason = seasonSelect.value;
  episodeSelect.innerHTML = "";
  if (!selectedSeason) {
    renderEpisodes(allEpisodes);
    return;
  }

  filteredEpisodes = allEpisodes.filter(ep => ep.episode.startsWith(selectedSeason));
  renderEpisodes(filteredEpisodes);

  episodeSelect.innerHTML = `<option value="">All episodes</option>`;
  filteredEpisodes.forEach(ep => {
    const option = document.createElement("option");
    option.value = ep.id;
    option.textContent = ep.episode;
    episodeSelect.appendChild(option);
  });
});

episodeSelect.addEventListener("change", () => {
  const selectedId = episodeSelect.value;
  if (!selectedId) {
    renderEpisodes(filteredEpisodes);
    return;
  }
  const ep = filteredEpisodes.find(e => e.id == selectedId);
  renderEpisodes([ep]);
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage++;
  if (currentPage <= totalPages) {
    await loadEpisodes(currentPage);
  } else {
    loadMoreBtn.style.display = "none";
  }
});

async function openModal(ep) {
  modal.style.display = "flex";
  modalContent.innerHTML = `
    <h2>${ep.name}</h2>
    <p><b>Episode:</b> ${ep.episode}</p>
    <p><b>Air date:</b> ${ep.air_date}</p>
    <h3>Characters:</h3>
    <div id="modalCharacters">Loading...</div>
  `;
  const charsContainer = modalContent.querySelector("#modalCharacters");

  const chars = await Promise.all(
    ep.characters.slice(0, 6).map(url => fetch(url).then(res => res.json()))
  );

  charsContainer.innerHTML = chars
    .map(ch => `
      <div class="character">
        <img src="${ch.image}" alt="${ch.name}">
        <p>${ch.name}</p>
      </div>
    `)
    .join("");
}

modalClose.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

loadEpisodes();
