import { getCharacters } from "./API.js";  

const characterList = document.getElementById('character-list');
const loadMoreBtn = document.querySelector('.load-more');
const nameInput = document.querySelector('.character-input');
const selects = document.querySelectorAll('.character select');

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
