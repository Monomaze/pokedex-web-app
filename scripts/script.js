let currentlyLoaded = 1;
let intendedToLoad = 30;

function init() {
    createCards();
}

async function createCards() {
    for (currentlyLoaded; currentlyLoaded <= intendedToLoad; currentlyLoaded++) {
        await createPokemonCard(currentlyLoaded);
    }
}

async function loadPokemonTopCardInfo(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let pokemonData = await fetch(url);
    let pokemonDataAsJson = await pokemonData.json();

    return pokemonDataAsJson;
}

async function getPokemonTopCardInfo(id) {
    let pokemonDataAsJson = await loadPokemonTopCardInfo(id);
    let pokemonName = capitalizeFirstLetter(pokemonDataAsJson['name']);
    let pokemonId = pokemonDataAsJson['id'];
    let pokemonImgUrl = pokemonDataAsJson['sprites']['other']['official-artwork']['front_default'];
    let pokemonMainType = pokemonDataAsJson['types'][0]['type']['name'];
    let pokemonSecondType = ``;

    if (pokemonDataAsJson['types'].length == 2) {
        pokemonSecondType = pokemonDataAsJson['types'][1]['type']['name'];
    }

    return [pokemonName, pokemonId, pokemonImgUrl, pokemonMainType, pokemonSecondType];
}

function inspectPokemon(id) {
    /* loadPokemonTopCardInfo(id);

    generatePokemonInfo(id, name, imgUrl, typeOne, typeTwo, height, weight, category, cry); */
}

function capitalizeFirstLetter(string) {
    let firstChar = string.charAt(0).toUpperCase() + string.slice(1);
    return firstChar;
}

async function createPokemonCard(id) {
    let [pokemonName, pokemonId, pokemonImgUrl, pokemonMainType, pokemonSecondType] = await getPokemonTopCardInfo(id);
    document.getElementById('pokemon-list').innerHTML += generatePokemonTopCardHTML(pokemonName, pokemonId, pokemonImgUrl);

    let [pokemonFirstTypeImg, pokemonSecondTypeImg] = getTypes(pokemonMainType, pokemonSecondType);
    document.getElementById(`types${pokemonId}`).innerHTML += generateTypeImgsHTML(pokemonFirstTypeImg, pokemonSecondTypeImg);

    setBgColorByType(pokemonMainType, pokemonId);
}

function getTypes(pokemonFirstType, pokemonSecondType) {   
    // get Pokémon first type and set type img
    let pokemonFirstTypeImg = setTypeImgUrl(pokemonFirstType);
    // default no secondy type
    let pokemonSecondTypeImg = ``;

    // check if Pokémon has second type and set the correspending img
    if (pokemonSecondType != '') {
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