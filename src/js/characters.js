import { getCharacters } from "./API";  
const characterList = document.getElementById('character-list');
const loadMoreBtn = document.querySelector('.load-more');

if (!characterList || !loadMoreBtn) {
  console.error('Не знайдено необхідні елементи для роботи скрипта');
}

let currentPage = 1;   
let isLoading = false; 

function loadCharacters(page) {
  isLoading = true;
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(response => response.json())
    .then(data => {
      const characters = data.results;
      characterList.innerHTML += characters.map(character => `
        <li>
          <img class="character__img-list" src="${character.image}" alt="${character.name}">
          <h2 class="character__name">${character.name}</h2>
          <h3 class="character__info character__origin">
            <span class="character__span">Origin:</span> ${character.origin.name}
          </h3>
          <h3 id="location" class="character__info character__location">
            <span class="character__span">Location:</span> ${character.location.name}
          </h3>
        </li>
      `).join('');

      if (!data.info.next) {
        loadMoreBtn.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Помилка завантаження персонажів:', error);
      characterList.innerHTML += '<li>Не вдалося завантажити дані.</li>';
    })
    .finally(() => {
      isLoading = false;
    });
}

loadCharacters(currentPage);

loadMoreBtn.addEventListener('click', () => {
  if (isLoading) return; 
  currentPage++;
  loadCharacters(currentPage);
});

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.querySelector('.character-input');
  const selects = document.querySelectorAll('.character select');
  const list = document.querySelector('.character-list');
  const searchButton = document.querySelector('.load-more'); // тимчасово як кнопка пошуку

  const initialListHTML = list.innerHTML;

  function normalizeValue(key, val) {
    if (!val) return '';
    val = val.trim().toLowerCase();
    if (key === 'gender' && val === 'all') return '';
    return val;
  }

  function filtersAreEmpty() {
    if (nameInput.value.trim() !== '') return false;
    for (const select of selects) {
      if (normalizeValue(select.previousElementSibling.textContent.toLowerCase(), select.value) !== '') return false;
    }
    return true;
  }

  function buildApiUrl() {
    const baseUrl = 'https://rickandmortyapi.com/api/character/';
    const params = new URLSearchParams();

    const name = nameInput.value.trim();
    if (name) params.append('name', name);

    selects.forEach(select => {
      const key = select.previousElementSibling.textContent.toLowerCase();
      const val = normalizeValue(key, select.value);
      if (val) params.append(key, val);
    });

    return baseUrl + (params.toString() ? `?${params.toString()}` : '');
  }

  async function updateList() {
    if (filtersAreEmpty()) {
      list.innerHTML = initialListHTML;
      return;
    }

    list.innerHTML = '<li>Loading...</li>';

    try {
      const response = await fetch(buildApiUrl());
      if (!response.ok) throw new Error('No characters found');
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        list.innerHTML = '<li>No characters found.</li>';
        return;
      }

      list.innerHTML = '';
      data.results.forEach(char => {
        const li = document.createElement('li');
        li.className = 'character__item';
        li.innerHTML = `
          <img src="${char.image}" alt="${char.name}" width="50" height="50" 
               style="vertical-align: middle; border-radius: 50%; margin-right: 10px;">
          <strong>${char.name}</strong> — ${char.status}, ${char.species}, ${char.gender}
        `;
        list.appendChild(li);
      });
    } catch (err) {
      list.innerHTML = `<li>${err.message}</li>`;
    }
  }

  nameInput.addEventListener('input', updateList);
  selects.forEach(select => select.addEventListener('change', updateList));
  searchButton.addEventListener('click', e => {
    e.preventDefault();
    updateList();
  });
});