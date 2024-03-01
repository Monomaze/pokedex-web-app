function generatePokemonTopCardHTML(name, id, imgUrl) {
    return `<div id="pokemon${id}" class="card disp-flex-col pointer-event overscroll-contain" style="width: 18rem">
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