function generatePokemonTopCardHTML(name, id, imgUrl) {
    return `<div id="pokemon-no${id}" class="card disp-flex-col pointer-event" style="width: 18rem" onclick="inspectPokemon(${id})">
        <div id="top-card${id}" class="border-t-radius-20 disp-flex-col">
            <div class="disp-flex-row-sb mx-4 mt-2">
                <h2>${name}</h2>
                <div class="black-bg id-bar p-2 border-b-radius-20">
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
    </div>`;
}

function generateTypeImgsHTML(typeOne, typeTwo) {
    return `<img class="align-self-center"src="${typeOne}" alt="">
    <img class="align-self-center"src="${typeTwo}" alt="">`;
}

function generatePokemonInfoHTML(id, name, imgUrl, exp, height, weight) {
    return `<div id="pokemon-inspect${id}" class="disp-flex-col dialog" style="width: 25rem">
        <div id="top-card-inspect${id}" class="border-t-radius-20 disp-flex-col">
            <div class="disp-flex-row-sb mx-4 mt-2">
                <h2>${name}</h2>
                <div class="black-bg id-bar p-2 border-b-radius-20">
                    <span class="id-text">#${String(id).padStart(4,'0')}</span>
                </div>
            </div>
            <div class="dex-image disp-flex-col-center">
                <img src="/img/2.svg" class="pokeball-bg align-self-center" alt="">
                <img src="${imgUrl}" class="card-img-top align-self-center pokemon-img pokemon-image" alt="..." style="width: 225px;">
            </div>
        </div>
        <div class="bg-black py-1 border-b-radius-20 z-3">
            <div id="types-inspect${id}" class="disp-flex-row-center">
            </div>
        </div>
        <div class="card-body bg-white border-b-radius-20 mt-min-40 z-2 d-flex flex-column align-items-center" style="width: 25rem; height: 20rem">

            <div class="btn-group mt-5" role="group" aria-label="Basic radio toggle button group" style="width: 70%;">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onclick="showInfo()" checked>
                <label class="btn btn-outline-danger" for="btnradio1">INFO</label>
            
                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onclick="showStats()">
                <label class="btn btn-outline-danger" for="btnradio2">STATS</label>
            </div>

            <div id="info-page">
                <table class="tg mt-3 mb-3 d-flex justify-content-center align-items-center">
                    <tbody>
                    <tr>
                        <td class="tg-0lax">Base Exp:</td>
                        <td class="tg-0lax">${exp}</td>
                    </tr>
                    <tr>
                        <td class="tg-0lax">Height:</td>
                        <td class="tg-0lax">${height}</td>
                    </tr>
                    <tr>
                        <td class="tg-0lax">Weight:</td>
                        <td class="tg-0lax">${weight}</td>
                    </tr>
                    <tr>
                        <td class="tg-0lax">Cry:</td>
                        <td class="tg-0lax" onclick="playAudio(${id})"><img role="button" src="/img/icons/play.svg" alt="play button"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="stats-page" class="d-none">
                <canvas id="chart-${id}"></canvas>
            </div>
            <button onclick="closePopUp()" type="button" class="btn-close mb-3" aria-label="Close"></button>
        </div>
    </div>`;
}