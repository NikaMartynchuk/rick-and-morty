import { getCharacters } from './API.js'; // обов’язково ./ з косою рискою

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', async function () {
  const query = searchInput.value.trim();

  if (query.length === 0) {
    searchResults.innerHTML = '';
    return;
  }

  try {
    // ✅ правильний виклик — передаємо filters другим параметром
    const data = await getCharacters(1, { name: query });

    if (data.results && data.results.length > 0) {
      searchResults.innerHTML = data.results
        .map(
          (char) => `
        <li class="list-group-item d-flex align-items-center" style="background-color:#0B2447; color:white;">
          <img src="${char.image}" alt="${char.name}" width="40" height="40" class="rounded-circle me-2">
          <div>
            <strong>${char.name}</strong><br>
            <small>Origin: ${char.origin.name}</small><br>
            <small>Location: ${char.location.name}</small>
          </div>
        </li>`
        )
        .join('');
    } else {
      searchResults.innerHTML = `
        <li class="list-group-item text-center text-danger" style="background-color:#0B2447;">
          No results found
        </li>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    searchResults.innerHTML = `
      <li class="list-group-item text-center text-danger" style="background-color:#0B2447;">
        Error loading
      </li>`;
  }
})