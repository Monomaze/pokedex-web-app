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
    return `<div id="pokemon-inspect${id}" class="disp-flex-col dialog" style="width: 18rem">
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
        <div class="bg-black py-1 border-b-radius-20">
            <div id="types-inspect${id}" class="disp-flex-row-center">
            </div>
        </div>
        <div class="card-body bg-white border-b-radius-20 mt-min-40 z-2" style="width: 18rem">
            <nav class="mt-5">
                <a href="#">INFO</a>
                <a href="#">STATS</a>
            </nav>

            <div id="info-page">
                <table class="tg mt-3 mb-3">
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
            <div id="stats-page">
            </div>
            <img onclick="closePopUp()" role="button" src="/img/icons/close.svg" alt="close button">
        </div>
    </div>`;
}