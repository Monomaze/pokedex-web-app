let currentlyLoaded = 1;
let intendedToLoad = 151;

function init() {
    createCards();
}

async function createCards() {
    for (currentlyLoaded; currentlyLoaded <= intendedToLoad; currentlyLoaded++) {
        await loadPokemonTopCardInfo(currentlyLoaded);
    }
}

async function loadPokemonTopCardInfo(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let pokemonData = await fetch(url);
    let pokemonDataAsJson = await pokemonData.json();
    let pokemonName = capitalizeFirstLetter(pokemonDataAsJson['name']);
    let pokemonId = pokemonDataAsJson['id'];
    let pokemonImgUrl = pokemonDataAsJson['sprites']['other']['official-artwork']['front_default'];
    let pokemonMainType = pokemonDataAsJson['types'][0]['type']['name'];
    
    createPokemonCard(pokemonName, pokemonId, pokemonImgUrl, pokemonDataAsJson);
    setBgColorByType(pokemonMainType, pokemonId);
}

function capitalizeFirstLetter(string) {
    let firstChar = string.charAt(0).toUpperCase() + string.slice(1);
    return firstChar;
}

function createPokemonCard(pokemonName, pokemonId, pokemonImgUrl, pokemonDataAsJson) {
    document.getElementById('pokemon-list').innerHTML += generatePokemonTopCardHTML(pokemonName, pokemonId, pokemonImgUrl);
    types = getTypes(pokemonDataAsJson);

    pokemonFirstTypeImg = types[0];
    pokemonSecondTypeImg = types[1];

    document.getElementById(`types${pokemonId}`).innerHTML += generateTypeImgsHTML(pokemonFirstTypeImg, pokemonSecondTypeImg);
}

function getTypes(pokemonDataAsJson) {   
    // get Pokémon first type and set type img
    let pokemonFirstType = pokemonDataAsJson['types'][0]['type']['name'];
    let pokemonFirstTypeImg = setTypeImgUrl(pokemonFirstType);
    // default no secondy type
    let pokemonSecondTypeImg = ``;

    // check if Pokémon has second type and set the correspending img
    if (pokemonDataAsJson['types'].length == 2) {
        let pokemonSecondType = pokemonDataAsJson['types'][1]['type']['name'];
        pokemonSecondTypeImg = setTypeImgUrl(pokemonSecondType);
    } 

    return [pokemonFirstTypeImg, pokemonSecondTypeImg];
}

function setTypeImgUrl(pokemonType) {
    let type = `/img/types-img/${pokemonType}.png`;
    return type;  
}

function setBgColorByType(pokemonType, id) {
    let color = TYPE_COLORS[`${pokemonType}`];
    document.getElementById(`top-card${id}`).style.backgroundColor = color;
}

function setBtnBgColor(type) {
    let color = TYPE_COLORS[`${type}`];
    document.getElementById(`${type}-btn`).style.backgroundColor = color;
}

function setBtnBgColorToDefault(type) {
    let color = TYPE_COLORS[`default`];
    document.getElementById(`${type}-btn`).style.backgroundColor = color;
}