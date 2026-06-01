const charactersContainer = document.getElementById("characters");
const infoContainer = document.getElementById("info");
const searchInput = document.getElementById("search");

let characters = [];

async function loadCharacters() {
    let allCharacters = [];
    
    for(let page = 1; page <= 9; page++) {
        const response = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
        const data = await response.json();
        allCharacters.push(...data.results);
    }

    characters = allCharacters;
    renderCharacters(characters);
}

function renderCharacters(list) {
    charactersContainer.innerHTML = "";

    list.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${character.name}</h3>
        `;

        card.addEventListener("click", () => showDetails(character));

        charactersContainer.appendChild(card);
    });
}

function showDetails(character) {
    infoContainer.innerHTML = `
        <div class="info-item"><strong>Nombre:</strong> ${character.name}</div>
        <div class="info-item"><strong>Altura:</strong> ${character.height} cm</div>
        <div class="info-item"><strong>Peso:</strong> ${character.mass} kg</div>
        <div class="info-item"><strong>Color de cabello:</strong> ${character.hair_color}</div>
        <div class="info-item"><strong>Color de ojos:</strong> ${character.eye_color}</div>
        <div class="info-item"><strong>Año de nacimiento:</strong> ${character.birth_year}</div>
        <div class="info-item"><strong>Género:</strong> ${character.gender}</div>
    `;
}

searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();

    const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(text)
    );

    renderCharacters(filtered);
});

loadCharacters();