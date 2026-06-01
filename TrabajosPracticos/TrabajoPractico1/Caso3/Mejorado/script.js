const charactersContainer = document.getElementById("charactersContainer");
const loadingSection = document.getElementById("loadingSection");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const speciesFilter = document.getElementById("speciesFilter");
const genderFilter = document.getElementById("genderFilter");
const sortFilter = document.getElementById("sortFilter");

const favoritesButton = document.getElementById("favoritesButton");

const modal = document.getElementById("characterModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const toast = document.getElementById("toast");
const scrollTopBtn = document.getElementById("scrollTopBtn");

const totalCharacters = document.getElementById("totalCharacters");
const totalSpecies = document.getElementById("totalSpecies");
const favoritesCount = document.getElementById("favoritesCount");

const template = document.getElementById("characterTemplate");

let characters = [];
let filteredCharacters = [];
let speciesMap = {};
let homeworldMap = {};
let showOnlyFavorites = false;

let favorites =
    JSON.parse(localStorage.getItem("swFavorites")) || [];

function saveFavorites() {
    localStorage.setItem(
        "swFavorites",
        JSON.stringify(favorites)
    );

    updateFavoritesCounter();
}

function updateFavoritesCounter() {
    favoritesCount.textContent = favorites.length;
}

function isFavorite(name) {
    return favorites.includes(name);
}

function toggleFavorite(name) {

    if (isFavorite(name)) {

        favorites = favorites.filter(
            fav => fav !== name
        );

        showToast("Eliminado de favoritos");

    } else {

        favorites.push(name);

        showToast("Añadido a favoritos");
    }

    saveFavorites();
    renderCharacters(filteredCharacters);
}

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function getCharacterId(url) {

    const match =
        url.match(/people\/(\d+)\/?/);

    return match ? match[1] : null;
}

function getCharacterImage(url) {

    const id = getCharacterId(url);

    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
}

async function fetchAllPages(baseUrl) {

    let results = [];
    let next = baseUrl;

    while (next) {

        const response = await fetch(next);
        const data = await response.json();

        results.push(...data.results);

        next = data.next;
    }

    return results;
}

async function loadSpecies() {

    const species =
        await fetchAllPages(
            "https://swapi.py4e.com/api/species/"
        );

    species.forEach(specie => {

        speciesMap[specie.url] =
            specie.name;

        const option =
            document.createElement("option");

        option.value = specie.name;
        option.textContent = specie.name;

        speciesFilter.appendChild(option);
    });

    totalSpecies.textContent =
        species.length;
}

async function loadPlanets() {

    const planets =
        await fetchAllPages(
            "https://swapi.py4e.com/api/planets/"
        );

    planets.forEach(planet => {

        homeworldMap[planet.url] =
            planet.name;
    });
}

async function loadCharacters() {

    characters =
        await fetchAllPages(
            "https://swapi.py4e.com/api/people/"
        );

    totalCharacters.textContent =
        characters.length;

    filteredCharacters =
        [...characters];

    loadingSection.style.display =
        "none";

    renderCharacters(filteredCharacters);
}

async function getSpeciesName(character) {

    if (!character.species.length) {
        return "Human";
    }

    return (
        speciesMap[character.species[0]] ||
        "Unknown"
    );
}

async function renderCharacters(list) {

    charactersContainer.innerHTML = "";

    if (!list.length) {

        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    for (const character of list) {

        const species =
            await getSpeciesName(character);

        const clone =
            template.content.cloneNode(true);

        const card =
            clone.querySelector(".character-card");

        const image =
            clone.querySelector(".character-image");

        const name =
            clone.querySelector(".character-name");

        const speciesText =
            clone.querySelector(".character-species");

        const genderText =
            clone.querySelector(".character-gender");

        const favoriteBtn =
            clone.querySelector(".favorite-btn");

        const detailsBtn =
            clone.querySelector(".details-btn");

        image.src =
            getCharacterImage(character.url);

        image.alt =
            character.name;

        image.onerror = () => {
            image.src =
                "https://placehold.co/600x800/111111/FFE81F?text=No+Image";
        };

        name.textContent =
            character.name;

        speciesText.textContent =
            `Especie: ${species}`;

        genderText.textContent =
            `Género: ${character.gender}`;

        favoriteBtn.textContent =
            isFavorite(character.name)
                ? "★"
                : "☆";

        favoriteBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleFavorite(
                    character.name
                );
            }
        );

        detailsBtn.addEventListener(
            "click",
            () => {

                showCharacterDetails(
                    character,
                    species
                );
            }
        );

        card.addEventListener(
            "click",
            () => {

                showCharacterDetails(
                    character,
                    species
                );
            }
        );

        charactersContainer.appendChild(
            clone
        );
    }
}

function sortCharacters() {

    const type =
        sortFilter.value;

    filteredCharacters.sort(
        (a, b) => {

            if (type === "name") {

                return a.name.localeCompare(
                    b.name
                );
            }

            if (type === "height") {

                return (
                    Number(a.height) -
                    Number(b.height)
                );
            }

            if (type === "mass") {

                return (
                    Number(a.mass) -
                    Number(b.mass)
                );
            }

            return 0;
        }
    );
}

async function filterCharacters() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedSpecies =
        speciesFilter.value;

    const selectedGender =
        genderFilter.value;

    filteredCharacters = [];

    for (const character of characters) {

        const species =
            await getSpeciesName(character);

        const matchesSearch =
            character.name
                .toLowerCase()
                .includes(search);

        const matchesSpecies =
            !selectedSpecies ||
            species === selectedSpecies;

        const matchesGender =
            !selectedGender ||
            character.gender ===
                selectedGender;

        const matchesFavorite =
            !showOnlyFavorites ||
            isFavorite(
                character.name
            );

        if (
            matchesSearch &&
            matchesSpecies &&
            matchesGender &&
            matchesFavorite
        ) {

            filteredCharacters.push(
                character
            );
        }
    }

    sortCharacters();

    renderCharacters(
        filteredCharacters
    );
}

async function loadFilms(filmUrls) {

    const films = [];

    for (const url of filmUrls) {

        try {

            const response =
                await fetch(url);

            const film =
                await response.json();

            films.push(film);

        } catch {

            console.error(
                "Error cargando película"
            );
        }
    }

    return films;
}

async function showCharacterDetails(character, species) {

    const films = await loadFilms(character.films);

    const homeworld =
        homeworldMap[character.homeworld] ||
        "Desconocido";

    const filmsHTML = films
        .map(
            film => `
            <div class="film-item">
                <strong>${film.title}</strong><br>
                Episodio ${film.episode_id}<br>
                Director: ${film.director}
            </div>
        `
        )
        .join("");

    modalBody.innerHTML = `
        <div class="modal-body-grid">

            <img
                src="${getCharacterImage(character.url)}"
                alt="${character.name}"
                onerror="this.src='https://placehold.co/600x800/111111/FFE81F?text=No+Image'"
            >

            <div class="modal-info">

                <h2>${character.name}</h2>

                <p><strong>Especie:</strong> ${species}</p>

                <p><strong>Género:</strong> ${character.gender}</p>

                <p><strong>Altura:</strong> ${character.height} cm</p>

                <p><strong>Peso:</strong> ${character.mass} kg</p>

                <p><strong>Color de cabello:</strong> ${character.hair_color}</p>

                <p><strong>Color de piel:</strong> ${character.skin_color}</p>

                <p><strong>Color de ojos:</strong> ${character.eye_color}</p>

                <p><strong>Año de nacimiento:</strong> ${character.birth_year}</p>

                <p><strong>Planeta natal:</strong> ${homeworld}</p>

                <div class="films-list">
                    <h3>Películas</h3>
                    ${filmsHTML}
                </div>

            </div>

        </div>
    `;

    modal.style.display = "flex";
}

favoritesButton.addEventListener(
    "click",
    () => {

        showOnlyFavorites =
            !showOnlyFavorites;

        favoritesButton.textContent =
            showOnlyFavorites
                ? "★ Todos"
                : "★ Favoritos";

        filterCharacters();
    }
);

searchInput.addEventListener(
    "input",
    filterCharacters
);

speciesFilter.addEventListener(
    "change",
    filterCharacters
);

genderFilter.addEventListener(
    "change",
    filterCharacters
);

sortFilter.addEventListener(
    "change",
    filterCharacters
);

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        filterCharacters();
    }
);

closeModal.addEventListener(
    "click",
    () => {

        modal.style.display = "none";
    }
);

window.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            modal.style.display = "none";
        }
    }
);

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            scrollTopBtn.classList.add(
                "show"
            );

        } else {

            scrollTopBtn.classList.remove(
                "show"
            );
        }
    }
);

scrollTopBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);

async function loadGenders() {

    const genders = [
        "male",
        "female",
        "hermaphrodite",
        "none",
        "n/a"
    ];

    genders.forEach(gender => {

        const option =
            document.createElement(
                "option"
            );

        option.value = gender;
        option.textContent = gender;

        genderFilter.appendChild(
            option
        );
    });
}

async function init() {

    try {

        updateFavoritesCounter();

        await Promise.all([
            loadSpecies(),
            loadPlanets(),
            loadGenders()
        ]);

        await loadCharacters();

    } catch (error) {

        console.error(error);

        loadingSection.innerHTML = `
            <div class="empty-state">
                <h2>Error al cargar datos</h2>
                <p>No se pudo conectar con SWAPI.</p>
            </div>
        `;
    }
}

init();