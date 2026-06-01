const pokemonCard = document.getElementById("pokemonCard");
const favoritosDiv = document.getElementById("favoritos");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

mostrarFavoritos();

async function buscarPokemon() {
    const valor = document.getElementById("pokemonInput").value.toLowerCase();

    try {
        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${valor}`
        );

        if (!respuesta.ok) {
            throw new Error();
        }

        const pokemon = await respuesta.json();

        pokemonCard.innerHTML = `
            <div class="card">
                <h2>${pokemon.name.toUpperCase()}</h2>
                <img src="${pokemon.sprites.front_default}">
                <p>N° ${pokemon.id}</p>
                <button onclick="agregarFavorito('${pokemon.name}')">
                    Agregar a favoritos
                </button>
            </div>
        `;
    } catch {
        pokemonCard.innerHTML = "<p>Pokémon no encontrado.</p>";
    }
}

function agregarFavorito(nombre) {
    if (!favoritos.includes(nombre)) {
        favoritos.push(nombre);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        mostrarFavoritos();
    }
}

function eliminarFavorito(nombre) {
    favoritos = favoritos.filter(p => p !== nombre);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
}

function mostrarFavoritos() {
    favoritosDiv.innerHTML = "";

    favoritos.forEach(nombre => {
        favoritosDiv.innerHTML += `
            <div class="favorito">
                ${nombre.toUpperCase()}
                <button onclick="eliminarFavorito('${nombre}')">
                    ❌
                </button>
            </div>
        `;
    });
}