let currentlyLoaded = 1;
let intendedToLoad = 30;
let inspectState = false;


function init() {
    createCards();
}

async function createCards() {
    for (currentlyLoaded; currentlyLoaded <= intendedToLoad; currentlyLoaded++) {
        await createPokemonCard(currentlyLoaded);
    }
}

async function loadPokemonInfo(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let pokemonData = await fetch(url);
    let pokemonDataAsJson = await pokemonData.json();

    url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    pokemonData = await fetch(url);
    let pokemonSpeciesDataAsJson = await pokemonData.json();

    return [pokemonDataAsJson, pokemonSpeciesDataAsJson];
}

async function getPokemonBottomCardInfo(id) {
    let [pokemonDataAsJson, pokemonSpeciesDataAsJson] = await loadPokemonInfo(id);
    console.log(pokemonDataAsJson);

    let exp = ['base_experience'];
    let height = ['height'];
    let weight = ['weight'];
    let category = ``;
    let cry = pokemonDataAsJson['cries']['latest'];
    let flavorText = pokemonSpeciesDataAsJson['flavor_text_entries'][0]['flavor_text'];

    return [exp, height, weight, category, cry, flavorText];
}

/* async function getPokemonStats(id) {

} */

async function getPokemonTopCardInfo(id) {
    let pokemonData = await loadPokemonInfo(id);
    let pokemonDataAsJson = pokemonData[0];
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

async function inspectPokemon(id) {
    let [pokemonName, pokemonId, pokemonImgUrl, pokemonMainType, pokemonSecondType] = await getPokemonTopCardInfo(id);
    let [exp, height, weight, category, cry, flavorText] = await getPokemonBottomCardInfo(id);
    let [pokemonFirstTypeImg, pokemonSecondTypeImg] = getTypes(pokemonMainType, pokemonSecondType);
    let inspectState = true;

    document.getElementById('pokemon-inspect').innerHTML = await generatePokemonInfo(pokemonId, pokemonName, pokemonImgUrl, exp, height, weight, category, cry, flavorText);
    document.getElementById(`types-inspect${pokemonId}`).innerHTML += await generateTypeImgsHTML(pokemonFirstTypeImg, pokemonSecondTypeImg);
    setBgColorByType(pokemonMainType, pokemonId, inspectState);
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

    setBgColorByType(pokemonMainType, pokemonId, inspectState);
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

function setBgColorByType(pokemonType, id, inspectState) {
    let color = TYPE_COLORS[`${pokemonType}`];
    document.getElementById(`top-card${id}`).style.backgroundColor = color;

    if (inspectState == true) {
        document.getElementById(`top-card-inspect${id}`).style.backgroundColor = color;
        inspectState = false;
    }

}

function setBtnBgColor(type) {
    let color = TYPE_COLORS[`${type}`];
    document.getElementById(`${type}-btn`).style.backgroundColor = color;
}

function setBtnBgColorToDefault(type) {
    let color = TYPE_COLORS[`default`];
    document.getElementById(`${type}-btn`).style.backgroundColor = color;
}