function search(classSearch){
    const $ = document.querySelector.bind(document)
    let headerSearch = $(classSearch)
    let inputSearch = $(classSearch+' input')

    let suggestSearch = $('.header-search__suggest')
    
    
    
    
    
    let api = 'https://testapi.io/api/tranhuuman312/songsInfo'
    
    
    fetch(api)
    .then(response => response.json())
    .then(data => {
        inputSearch.oninput = function(e){
            let valueInput = e.target.value.trim().toLowerCase()
            let valueInputLength = valueInput.length

            if(valueInputLength>0){
                let songsSuggest = data.filter(function(song){      
                    let songName = song.name.slice(0, valueInputLength).toLowerCase()
                    return valueInput == songName   
                })
                if(songsSuggest.length>0){
                    songsSuggest.forEach(function(song,index){
                        suggestSearch.innerHTML = `
                            <a>${song.name}</a>
                            `
                        suggestSearch.querySelector('a').setAttribute('i-song', index)
                        Object.assign(suggestSearch.style, {
                            opacity: "1",
                            PointerEvents: "auto"
                        })
                    })
                }else{
                    suggestSearch.innerHTML = ''
                    Object.assign(suggestSearch.style, {
                        opacity: "0",
                        PointerEvents: "none"
                    })
                }
            }else{
                suggestSearch.innerHTML = ''
                Object.assign(suggestSearch.style, {
                    opacity: "0",
                    PointerEvents: "none"
                })
            }
        }
    })
}

export default search