let currentlyLoaded = 1;    // set amount of currently loaded Pokemon
let intendedToLoad = 30;    // set amount of Pokemon intended to load
let pokemonId = 1;          // set the ID for Pokemon, starting with 1
let currentPokemonId;         // Variable for storing the currently loaded Pokemon
let inspectState = false;   // Variable to define if pop up is open or not
let pokemonDataStorage = {}; // emtpy JSON for storing all base information from Pokemon

function init() {
    createCards();
}

async function createCards() {
    pokemonId = currentlyLoaded;
    for (currentlyLoaded; currentlyLoaded <= intendedToLoad; currentlyLoaded++) {
        await loadPokemonInfo();
        pokemonId++;
    }
    currentlyLoaded = intendedToLoad + 1;
}

async function loadPokemonInfo() {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
        let response = await fetch(url);
        let pokemonData = await response.json();
        pokemonDataStorage[pokemonData.id] = pokemonData;

        createPokemonCard(pokemonId);
    } catch(error) {
        console.error(`Error while loading Pokemon: ${error}`);
    }
}

function getPokemonBottomCardInfo() {
    let exp = pokemonDataStorage[pokemonId].base_experience;
    let height = pokemonDataStorage[pokemonId].height / 10 + ` m`;
    let weight = pokemonDataStorage[pokemonId].weight / 10 + ` kg`;
    let category = ``;

    return [exp, height, weight, category];
}

/* async function getPokemonStats(id) {

} */

function getPokemonTopCardInfo() {
    let pokemonName = capitalizeFirstLetter(pokemonDataStorage[pokemonId].name);
    let pokemonImgUrl = pokemonDataStorage[pokemonId].sprites.other['official-artwork'].front_default;
    let pokemonMainType = pokemonDataStorage[pokemonId].types[0].type.name;
    let pokemonSecondType = ``;

    if (pokemonDataStorage[pokemonId].types.length == 2) {
        pokemonSecondType = pokemonDataStorage[pokemonId].types[1].type.name;
    }

    return [pokemonName, pokemonImgUrl, pokemonMainType, pokemonSecondType];
}

function inspectPokemon(id) {
    pokemonId = id; // set id to clicked Pokemon
    let [pokemonName, pokemonImgUrl, pokemonMainType, pokemonSecondType] = getPokemonTopCardInfo();
    let [exp, height, weight, category] = getPokemonBottomCardInfo();
    let [pokemonFirstTypeImg, pokemonSecondTypeImg] = getTypes(pokemonMainType, pokemonSecondType);
    let inspectState = true;

    document.getElementById('pokemon-inspect').innerHTML = generatePokemonInfoHTML(pokemonId, pokemonName, pokemonImgUrl, exp, height, weight, category);
    document.getElementById(`types-inspect${pokemonId}`).innerHTML += generateTypeImgsHTML(pokemonFirstTypeImg, pokemonSecondTypeImg);
    setBgColorByType(pokemonMainType, inspectState);
    document.getElementById('body').classList.add('overflow-hidden');
    document.getElementById('pop-up-bg').classList.remove('d-none');
}

function capitalizeFirstLetter(string) {
    let firstChar = string.charAt(0).toUpperCase() + string.slice(1);
    return firstChar;
}

async function createPokemonCard(pokemonId) {
    let [pokemonName, pokemonImgUrl, pokemonMainType, pokemonSecondType] = await getPokemonTopCardInfo();
    document.getElementById('pokemon-list').innerHTML += generatePokemonTopCardHTML(pokemonName, pokemonId, pokemonImgUrl);

    let [pokemonFirstTypeImg, pokemonSecondTypeImg] = getTypes(pokemonMainType, pokemonSecondType);
    document.getElementById(`types${pokemonId}`).innerHTML += generateTypeImgsHTML(pokemonFirstTypeImg, pokemonSecondTypeImg);

    setBgColorByType(pokemonMainType, inspectState);
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

function playAudio(id) {
    let cryUrl = pokemonDataStorage[id].cries.latest;
    let cry = new Audio(cryUrl);
    cry.play();
}

function setTypeImgUrl(pokemonType) {
    let type = `/img/types-img/${pokemonType}.png`;
    return type;  
}

function setBgColorByType(pokemonType, inspectState) {
    let color = TYPE_COLORS[`${pokemonType}`];
    document.getElementById(`top-card${pokemonId}`).style.backgroundColor = color;

    if (inspectState == true) {
        document.getElementById(`top-card-inspect${pokemonId}`).style.backgroundColor = color;
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

function closePopUp() {
    document.getElementById('body').classList.remove('overflow-hidden');
    document.getElementById('pop-up-bg').classList.add('d-none');
    document.getElementById('pokemon-inspect').innerHTML = ``;
    document.getElementById(`types-inspect${pokemonId}`).innerHTML =``;
}

function search() {
    let term = document.getElementById('searchbar').value.toLowerCase();
    let termLength = term.length;
    let pokemonList = document.getElementById('pokemon-list');
    let pokemonCards = pokemonList.getElementsByClassName('card');

    showBasedOnSearchInput(term, termLength, pokemonList, pokemonCards);
}

function showBasedOnSearchInput(term, termLength, pokemonList, pokemonCards) {
    if (termLength >= 3) {
        for (i = 0; i < currentlyLoaded - 1; i++) {
            let pokemonCard = pokemonCards[i];
            let name = pokemonCard.querySelector('h2').textContent.toLowerCase();
            if (name.includes(term)) {
                pokemonCard.style.display = ""; 
            } else {
                pokemonCard.style.display = "none";
            }
        }
    } else {
        for (i = 0; i < currentlyLoaded - 1; i++) {
            let pokemonCard = pokemonCards[i];
            pokemonCard.style.display = "";
        }
    }
}

function showInfo() {
    document.getElementById("info-page").classList.remove("d-none");
    document.getElementById("stats-page").classList.add("d-none");
}

function showStats() {
    document.getElementById("stats-page").classList.remove("d-none");
    document.getElementById("info-page").classList.add("d-none");
}