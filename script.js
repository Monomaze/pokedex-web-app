

function init() {
    createCards();
}

async function createCards() {
    for (let i = 1; i <= 20; i++) {
        await loadPokemonTopCardInfo(i);
    }
}

async function loadPokemonTopCardInfo(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonName = responseAsJson['name'];
    let pokemonId = responseAsJson['id'];
    let pokemonImgUrl = responseAsJson['sprites']['other']['official-artwork']['front_default'];
    let pokemonFirstTypeImg = ``;
    let pokemonSecondTypeImg = ``;

    if (responseAsJson['types'].length == 2) {
        let pokemonFirstType = responseAsJson['types'][0]['type']['name'];
        let pokemonSecondType = responseAsJson['types'][1]['type']['name'];
        pokemonFirstTypeImg = setTypeImgUrl(pokemonFirstType);
        pokemonSecondTypeImg = setTypeImgUrl(pokemonSecondType);
    } else {
        let pokemonFirstType = responseAsJson['types'][0]['type']['name'];
        pokemonSecondTypeImg = null;
        pokemonFirstTypeImg = setTypeImgUrl(pokemonFirstType);
    };

    document.getElementById('pokemon-list').innerHTML += generatePokemonTopCardHTML(pokemonName, pokemonId, pokemonImgUrl);
    document.getElementById(`types${pokemonId}`).innerHTML += generateTypeImgsHTML(pokemonFirstTypeImg, pokemonSecondTypeImg);
}

function setTypeImgUrl(pokemonType) {
    let type = `/img/types-img/${pokemonType}.png`;
    return type;  
}

function generatePokemonTopCardHTML(name, id, imgUrl) {
    return `<div id="pokemon${id}" class="card disp-flex-col pointer-event" style="width: 18rem">
        <div class="electric-color-bg border-t-radius-20 disp-flex-col">
            <div class="disp-flex-row-sb mx-4 mt-2">
                <h2>${name}</h2>
                <div class="black-bg id-bar p-2">
                    <span class="id-text">#${String(id).padStart(4,'0')}</span>
                </div>
            </div>
            <div class="dex-image disp-flex-col-center">
                <img src="/img/2.svg" class="pokeball-bg align-self-center" alt="">
                <img src="${imgUrl}" class="card-img-top align-self-center pokemon-img pokemon-image" alt="..." style="width: 225px;">
            </div>
        </div>
        <div class="bg-black py-1 border-b-radius-20">
            <div id="types${id}" class="disp-flex-row-center">
            </div>
        </div>
    </div>`
}

function generateTypeImgsHTML(typeOne, typeTwo) {
    return `<img class="align-self-center"src="${typeOne}" alt="">
    <img class="align-self-center"src="${typeTwo}" alt="">`;
}