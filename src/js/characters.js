import { getCharacters } from "./API.js";  

const characterList = document.getElementById('character-list');
const loadMoreBtn = document.querySelector('.load-more');
const nameInput = document.querySelector('.character-input');
const selects = document.querySelectorAll('.character-filtration select');

let currentPage = 1;
let isLoading = false;
let currentFilters = {}; 


function renderCharacters(characters, reset = false) {
  if (reset) characterList.innerHTML = '';

  if (!characters || characters.length === 0) {
    characterList.innerHTML = '<li>No characters found.</li>';
    loadMoreBtn.style.display = 'none';
    return;
  }

 
  const characterHTML = characters.map(character => `
    <li>
      <img class="character__img-list" src="${character.image}" alt="${character.name}">
      <h2 class="character__name">${character.name}</h2>
      <h3 class="character__info character__origin">
        <span class="character__span">Origin:</span> ${character.origin.name}
      </h3>
      <h3 class="character__info character__location">
        <span class="character__span">Location:</span> ${character.location.name}
      </h3>
    </li>
  `).join('');

  characterList.innerHTML += characterHTML;
}


async function loadCharacters(page = 1, filters = {}, reset = false) {
  if (isLoading) return;
  isLoading = true;
  loadMoreBtn.disabled = true;

  try {
    const data = await getCharacters(page, filters);
    renderCharacters(data.results, reset);

 
    loadMoreBtn.style.display = data.info?.next ? 'block' : 'none';
  } catch (error) {
    console.error('Error loading characters:', error);
    characterList.innerHTML = '<li>No characters found.</li>';
    loadMoreBtn.style.display = 'none';
  } finally {
    isLoading = false;
    loadMoreBtn.disabled = false;
  }
}


function getFilterValues() {
  const filters = {
    name: nameInput.value.trim(),
    status: '',
    species: '',
    type: '',
    gender: ''
  };

  selects.forEach(select => {
    const labelText = select.previousElementSibling.textContent.toLowerCase().trim();
    const val = select.value.trim();

    if (labelText.includes('status')) filters.status = val;
    if (labelText.includes('species')) filters.species = val;
    if (labelText.includes('type')) filters.type = val;
    if (labelText.includes('gender')) filters.gender = val;
  });

  return filters;
}


function updateCharacters() {
  currentPage = 1;
  currentFilters = getFilterValues();
  console.log('Фільтри:', currentFilters); 
  loadCharacters(currentPage, currentFilters, true);
}


loadCharacters(currentPage);


loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadCharacters(currentPage, currentFilters);
});


nameInput.addEventListener('input', updateCharacters);
selects.forEach(select => select.addEventListener('change', updateCharacters));

// ===== МОДАЛЬНЕ ВІКНО (виправлене: вибір героя за image.src) =====

// Отримуємо елементи модалки
const modal = document.getElementById("characterModal");
const closeModalBtn = document.getElementById("charCloseModal");

const charImage = document.getElementById("charImage");
const charStatus = document.getElementById("charStatus");
const charSpecies = document.getElementById("charSpecies");
const charGender = document.getElementById("charGender");
const charOrigin = document.getElementById("charOrigin");
const charLocation = document.getElementById("charLocation");
const charType = document.getElementById("charType");
const episodesList = document.getElementById("episodesList");

/**
 * Відкриває модалку для переданого об'єкта персонажа.
 * Приймає або об'єкт персонажа (char), або id — але в цьому файлі
 * ми завжди передаємо повний об'єкт (щоб не робити додаткових fetch).
 */
async function openCharacterModal(char) {
  try {
    // Якщо передали id випадково — отримуємо через локальний API
    if (typeof char === 'number' || typeof char === 'string') {
      const data = await getCharacters(1, { id: char });
      char = data.results ? data.results[0] : null;
      if (!char) {
        console.error('Character not found by id');
        return;
      }
    }

    // Заповнення полів
    charImage.src = char.image;
    charImage.alt = char.name || 'Character';
    charStatus.textContent = char.status || 'Unknown';
    charSpecies.textContent = char.species || 'Unknown';
    charGender.textContent = char.gender || 'Unknown';
    charOrigin.textContent = char.origin?.name || 'Unknown';
    charLocation.textContent = char.location?.name || 'Unknown';
    charType.textContent = char.type || 'Unknown';

    // Епізоди — залишаємо прямі fetch, оскільки це зовнішні URL-и епізодів
    episodesList.innerHTML = `<li>Loading episodes...</li>`;
    try {
      const episodePromises = (char.episode || []).slice(0, 5).map(epUrl => fetch(epUrl).then(r => r.json()));
      const episodes = await Promise.all(episodePromises);
      episodesList.innerHTML = episodes.length
        ? episodes.map(ep => `<li><strong>${ep.name}</strong><br>Episode: ${ep.episode} | Air date: ${ep.air_date}</li>`).join('')
        : `<li>No episodes</li>`;
    } catch (epErr) {
      episodesList.innerHTML = `<li>Episodes unavailable</li>`;
      console.error('Error loading episodes:', epErr);
    }

    modal.classList.remove('hidden');
  } catch (error) {
    console.error('Error in openCharacterModal:', error);
  }
}

// Закриття модалки
closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// 🎯 Надійне відкриття модалки при кліку на картку персонажа
characterList.addEventListener("click", (e) => {
  const card = e.target.closest("li");
  if (!card) return;

  // Витягуємо ім'я та src картинки з картки
  const nameElem = card.querySelector(".character__name");
  const imgElem = card.querySelector("img");
  const name = nameElem?.textContent?.trim();
  const cardImgSrc = imgElem?.src;

  if (!name) return;

  // ---- ТУТ МИ ПІДКЛЮЧАЄМО ЛОКАЛЬНИЙ API (getCharacters) ----
  // Викликаємо пошук за ім'ям, потім намагаємось знайти точний об'єкт,
  // у якого image === src з картки. Це вирішує проблему, коли API повертає кілька результатів.
  getCharacters(1, { name })
    .then(data => {
      if (!data || !data.results || data.results.length === 0) {
        console.warn('No results from getCharacters for name:', name);
        return;
      }

      // Пошук максимально точного співпадіння за image (найбільш надійний)
      let matched = null;
      if (cardImgSrc) {
        matched = data.results.find(r => {
          // Порівнюємо повні URL-строки; інколи API дає різні розміри зображень,
          // тому також допускаємо порівняння по закінченні шляху (як fallback).
          if (!r.image) return false;
          if (r.image === cardImgSrc) return true;
          // fallback: порівняння імені файлу
          try {
            const a = new URL(r.image).pathname.split('/').pop();
            const b = new URL(cardImgSrc).pathname.split('/').pop();
            return a === b;
          } catch (err) {
            return false;
          }
        });
      }

      // Якщо не знайшли по image — намагаємось уточнити по origin/location (додатковий фільтр)
      if (!matched && data.results.length > 1) {
        const cardOrigin = card.querySelector('.character__origin')?.textContent?.replace('Origin:', '').trim();
        const cardLocation = card.querySelector('.character__location')?.textContent?.replace('Location:', '').trim();

        matched = data.results.find(r => {
          const rOrigin = r.origin?.name || '';
          const rLocation = r.location?.name || '';
          const originMatch = cardOrigin ? rOrigin.toLowerCase().includes(cardOrigin.toLowerCase()) : true;
          const locationMatch = cardLocation ? rLocation.toLowerCase().includes(cardLocation.toLowerCase()) : true;
          return originMatch && locationMatch;
        });
      }

      // Якщо все ще не знайшли — беремо перший результат як fallback
      const charToShow = matched || data.results[0];

      // Тепер відкриваємо модалку з повним об'єктом персонажа (openCharacterModal приймає об'єкт)
      openCharacterModal(charToShow);
    })
    .catch(err => {
      console.error('Error fetching character via getCharacters:', err);
    });
});