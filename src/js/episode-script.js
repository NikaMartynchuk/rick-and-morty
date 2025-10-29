import { getEpisodes, getEpisodeById, getCharacterById } from './api.js';

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

// --- Utility: debounce ---
function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// --- Render card ---
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

// --- Load episodes with current filters & page ---
async function loadEpisodes() {
  // Забезпечимо видимість preloader / приховування помилок
  loadMoreBtn.style.display = "none";

  try {
    const data = await getEpisodes(currentPage, filters);

    // Якщо перша сторінка — очистимо контейнер перед рендером
    if (currentPage === 1) episodesContainer.innerHTML = "";

    // Якщо нема результатів — показуємо noResults
    if (!data || !data.results || data.results.length === 0) {
      noResults.classList.remove("hidden");
      episodesContainer.classList.add("hidden");
      loadMoreBtn.style.display = "none";
      allPages = 1;
      return;
    }

    // Є результати — відобразимо їх
    noResults.classList.add("hidden");
    episodesContainer.classList.remove("hidden");

    // Інформація по кількості сторінок (з захистом)
    if (data.info && data.info.pages) {
      allPages = data.info.pages;
    } else if (data.info && data.info.count) {
      // fallback якщо pages немає
      allPages = Math.ceil(data.info.count / 20) || 1;
    } else {
      allPages = 1;
    }

    // Рендер карток
    data.results.forEach(createEpisodeCard);

    // Показати / сховати кнопку Load more
    loadMoreBtn.style.display = currentPage >= allPages ? "none" : "block";
  } catch (err) {
    console.error("Error loading episodes:", err);
    // У випадку помилки також показуємо noResults (щоб користувачу було зрозуміло)
    noResults.classList.remove("hidden");
    episodesContainer.classList.add("hidden");
    loadMoreBtn.style.display = "none";
  }
}

// --- Modal (без змін від твоєї останньої версії, вірно так) ---
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

// --- Events ---
// Load more button
loadMoreBtn.addEventListener("click", () => {
  if (currentPage < allPages) {
    currentPage++;
    loadEpisodes();
  }
});

// Debounced search: скидаємо сторінку, очищаємо і робимо запит
const debouncedSearch = debounce(() => {
  currentPage = 1;
  loadEpisodes();
}, 350);

nameInput.addEventListener("input", (e) => {
  filters.name = e.target.value.trim();
  // Якщо пустий рядок — видаляємо поле з фільтрів
  if (!filters.name) delete filters.name;
  // Очищаємо UI і запускаємо debounced запит
  // (чистка контейнера дає відчуття миттєвого реагування)
  episodesContainer.innerHTML = "";
  debouncedSearch();
});

// Season select: миттєво виконуємо (не дебаунсим)
seasonSelect.addEventListener("change", (e) => {
  const val = e.target.value;
  if (val) filters.episode = val;
  else delete filters.episode;

  currentPage = 1;
  episodesContainer.innerHTML = "";
  loadEpisodes();
});

// Modal close handlers
closeModal.addEventListener("click", closeModalWindow);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModalWindow();
});

// Початкове завантаження
loadEpisodes();
