const listaPokemon = document.getElementById("listaPokemon");
const favoritosDiv = document.getElementById("favoritos");
const detalle = document.getElementById("detallePokemon");

const busqueda = document.getElementById("busqueda");
const region = document.getElementById("region");
const tipo = document.getElementById("tipo");
const btnFavoritos = document.getElementById("mostrarFavoritos");

let favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];

let pokemonsActuales = [];

const regiones = {
    1:[1,151],
    2:[152,251],
    3:[252,386],
    4:[387,493],
    5:[494,649],
    6:[650,721],
    7:[722,809],
    8:[810,905]
};

cargarInicial();

async function cargarInicial(){

    listaPokemon.innerHTML = "Cargando...";

    const datos = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
    );

    const json = await datos.json();

    pokemonsActuales = json.results;

    mostrarLista(pokemonsActuales);
    mostrarFavoritos();
}

async function mostrarLista(lista){

    listaPokemon.innerHTML = "";

    for(const pokemon of lista){

        const data = await fetch(pokemon.url);
        const info = await data.json();

        const card = document.createElement("div");

        card.className = "card animacion";

        const favorito =
            favoritos.includes(info.id);

        card.innerHTML = `
            <h3>${info.name.toUpperCase()}</h3>

            <img
                src="${info.sprites.front_default}"
            >

            <p>#${info.id}</p>

            <button
            onclick="verDetalle(${info.id})">
                Ver Información
            </button>

            <button
            onclick="toggleFavorito(${info.id})">
                ${
                    favorito
                    ? "★ Quitar"
                    : "☆ Favorito"
                }
            </button>
        `;

        listaPokemon.appendChild(card);
    }
}

async function verDetalle(id){

    const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    const p = await data.json();

    detalle.innerHTML = `
        <h2>${p.name.toUpperCase()}</h2>

        <div class="detalle-imagenes">

            <div>
                <h4>Normal</h4>
                <img
                src="${p.sprites.front_default}">
            </div>

            <div>
                <h4>Shiny</h4>
                <img
                src="${p.sprites.front_shiny}">
            </div>

        </div>

        <p><b>Número:</b> ${p.id}</p>

        <p>
            <b>Tipos:</b>
            ${
                p.types
                .map(t=>t.type.name)
                .join(", ")
            }
        </p>

        <p><b>Altura:</b> ${p.height}</p>

        <p><b>Peso:</b> ${p.weight}</p>

        <p>
            <b>Habilidades:</b>
            ${
                p.abilities
                .map(a=>a.ability.name)
                .join(", ")
            }
        </p>

        <div class="stats">
            ${
                p.stats.map(stat=>`
                <div class="stat">
                    ${stat.stat.name}
                    (${stat.base_stat})

                    <div class="barra">
                        <div
                        style="
                        width:${stat.base_stat}%">
                        </div>
                    </div>
                </div>
                `).join("")
            }
        </div>
    `;
}

function toggleFavorito(id){

    if(favoritos.includes(id)){
        favoritos =
        favoritos.filter(
            pokemon => pokemon !== id
        );
    }
    else{
        favoritos.push(id);
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    mostrarFavoritos();

    mostrarLista(pokemonsActuales);
}

async function mostrarFavoritos(){

    favoritosDiv.innerHTML = "";

    for(const id of favoritos){

        const data = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const pokemon = await data.json();

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${pokemon.name}</h3>

            <img
            src="${pokemon.sprites.front_default}">

            <button
            onclick="verDetalle(${pokemon.id})">
                Ver Información
            </button>
        `;

        favoritosDiv.appendChild(card);
    }
}

busqueda.addEventListener(
    "input",
    async e => {

        const texto =
        e.target.value.toLowerCase();

        if(texto === ""){
            cargarInicial();
            return;
        }

        try{

            const data = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${texto}`
            );

            const pokemon =
            await data.json();

            mostrarLista([
                {
                    name:pokemon.name,
                    url:`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
                }
            ]);

        }
        catch{}
    }
);

tipo.addEventListener(
    "change",
    async ()=>{

        const valor = tipo.value;

        if(valor === ""){
            cargarInicial();
            return;
        }

        const data = await fetch(
            `https://pokeapi.co/api/v2/type/${valor}`
        );

        const json = await data.json();

        const lista =
        json.pokemon
        .slice(0,100)
        .map(p=>p.pokemon);

        pokemonsActuales = lista;

        mostrarLista(lista);
    }
);

region.addEventListener(
    "change",
    async ()=>{

        const valor = region.value;

        if(valor === ""){
            cargarInicial();
            return;
        }

        const [inicio,fin] =
        regiones[valor];

        const lista = [];

        for(
            let i=inicio;
            i<=fin;
            i++
        ){

            lista.push({
                name:"",
                url:`https://pokeapi.co/api/v2/pokemon/${i}`
            });

        }

        pokemonsActuales = lista;

        mostrarLista(lista);
    }
);

btnFavoritos.addEventListener(
    "click",
    ()=>{

        listaPokemon.innerHTML = "";

        favoritos.forEach(id=>{

            listaPokemon.innerHTML += `
            <div class="card">
                <h3>Favorito #${id}</h3>
                <button
                onclick="verDetalle(${id})">
                    Ver Información
                </button>
            </div>
            `;

        });

    }
);