import header from "./src/components/layouts/header.js";
import body from "./src/components/layouts/body.js";
// import search from "./src/components/modules/search.js";
import mode from "./src/components/modules/mode.js";
import music from "./src/components/modules/music.js";

const $ = document.querySelector.bind(document)

let root = $('#root')

//header
root.insertBefore(header(), root.firstChild);

    //search (turn on when less module music)
    // search('.header-search')


// body
root.appendChild(body())


    //mode
    mode('.btn-mode')

    

    //music
    let api = 'https://testapi.io/api/tranthiai312/songsInfo'

    let bodyContent = $('.body-content')
    bodyContent.appendChild(music(api))
   

