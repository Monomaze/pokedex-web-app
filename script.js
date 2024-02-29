

function init() {
    createCards();
}

async function createCards() {
    for (let i = 1; i <= 60; i++) {
        await loadPokemonTopCardInfo(i);
    }
}

async function loadPokemonTopCardInfo(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonName = capitalizeFirstLetter(responseAsJson['name']);
    let pokemonId = responseAsJson['id'];
    let pokemonImgUrl = responseAsJson['sprites']['other']['official-artwork']['front_default'];
    let pokemonFirstTypeImg = ``;
    let pokemonSecondTypeImg = ``;
    let pokemonMainType = responseAsJson['types'][0]['type']['name'];


    createPokemonCard(pokemonName, pokemonId, pokemonImgUrl, pokemonFirstTypeImg, pokemonSecondTypeImg, responseAsJson);
    setBgColorByType(pokemonMainType, pokemonId);
}

function setBgColorByType(pokemonType, id) {
    let color = TYPE_COLORS[`${pokemonType}`];
    document.getElementById(`top-card${id}`).style.backgroundColor = color;
}

function capitalizeFirstLetter(string) {
    let firstChar = string.charAt(0);
    let restOfString = string.slice(1);
    firstChar = firstChar.toUpperCase();
    return firstChar + restOfString;
}

function createPokemonCard(pokemonName, pokemonId, pokemonImgUrl, pokemonFirstTypeImg, pokemonSecondTypeImg, responseAsJson) {
    document.getElementById('pokemon-list').innerHTML += generatePokemonTopCardHTML(pokemonName, pokemonId, pokemonImgUrl);

    types = getTypes(responseAsJson, pokemonFirstTypeImg, pokemonSecondTypeImg);
    if (Array.isArray(types)) {
        pokemonFirstTypeImg = types[0];
        pokemonSecondTypeImg = types[1];
    } else {
        pokemonFirstTypeImg = types;
        pokemonSecondTypeImg = ``;
    }

    document.getElementById(`types${pokemonId}`).innerHTML += generateTypeImgsHTML(pokemonFirstTypeImg, pokemonSecondTypeImg);
}

function getTypes(responseAsJson, pokemonFirstTypeImg, pokemonSecondTypeImg) {

    let pokemonFirstType = responseAsJson['types'][0]['type']['name'];
    pokemonFirstTypeImg = setTypeImgUrl(pokemonFirstType);

    if (responseAsJson['types'].length == 2) {
        let pokemonSecondType = responseAsJson['types'][1]['type']['name'];
        pokemonSecondTypeImg = setTypeImgUrl(pokemonSecondType);
        return [pokemonFirstTypeImg, pokemonSecondTypeImg];
    } 
    return pokemonFirstTypeImg;
}

function setTypeImgUrl(pokemonType) {
    let type = `/img/types-img/${pokemonType}.png`;
    return type;  
}

function generatePokemonTopCardHTML(name, id, imgUrl) {
    return `<div id="pokemon${id}" class="card disp-flex-col pointer-event" style="width: 18rem">
        <div id="top-card${id}" class="border-t-radius-20 disp-flex-col">
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