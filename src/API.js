const BASE_URL = "https://rickandmortyapi.com/api/";

// Підвантаження даних героїв (разом з пагінацією і фільтрами)
export async function getCharacters(page = 1, filters = {}) {
    const { name = '', status = '', species = '', type = '', gender = '' } = filters;
    
    let url = `${BASE_URL}character/?page=${page}`;
    
    if (name) url += `&name=${encodeURIComponent(name)}`;
    if (status) url += `&status=${encodeURIComponent(status)}`;
    if (species) url += `&species=${encodeURIComponent(species)}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;
    if (gender) url += `&gender=${encodeURIComponent(gender)}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Failed to fetch characters");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
}

// Підвантаження даних епізодів (разом з пагінацією і фільтрами)
export async function getEpisodes(page = 1, filters = {}) {
    const { name = '', episode = '' } = filters;
    
    let url = `${BASE_URL}episode/?page=${page}`;
    
    if (name) url += `&name=${encodeURIComponent(name)}`;
    if (episode) url += `&episode=${encodeURIComponent(episode)}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Failed to fetch episodes");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching episodes:", error);
        throw error;
    }
}

// Підвантаження даних 1 героя (для модалки)
export async function getCharacterById(id) {
    try {
        const response = await fetch(`${BASE_URL}character/${id}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch character");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching character:", error);
        throw error;
    }
}

// Підвантаження даних 1 епізода (для модалки)
export async function getEpisodeById(id) {
    try {
        const response = await fetch(`${BASE_URL}episode/${id}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch episode");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching episode:", error);
        throw error;
    }
}