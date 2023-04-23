function UImusic(api,name = 'Yummy', image = './public/images/jbb.png',
){
    let $ = document.querySelector.bind(document)
    let $$ = document.querySelectorAll.bind(document)
    let music =  document.createElement('div')

    //Form music
    music.classList.add('music')
    music.innerHTML = `
                <div class="music-control">
                    <div class="control-header">
                        <i class='bx bxs-hide'></i>
                        <h3>${name}</h3>
                        <i class='bx bx-x' ></i>

                    </div>

                    <div class="control-body">
                        <img alt="" src=${image}>
                        <div class="timing-audio"></div>
                        <div class=scroll-left>
                            <div class="scroll"></div>
                            </div>
                            <div class=scroll-right>
                            <div class="scroll"></div>
                        </div>
                    </div>

                    <div class="control-footer">
                        <div class="current-song"> 
                        
                        </div>
                        <div class="events">
                            <i class='bx bx-refresh repost disable hover'></i>
                            <i class='bx bxs-skip-previous-circle prev hover' ></i>
                            <div class="plause pause hover">
                                <i class='bx bx-pause-circle'></i>
                                <i class='bx bx-play-circle hidden'></i>
                            </div>
                            <i class='bx bxs-skip-next-circle next hover' ></i>
                            <i class='bx bxs-virus random disable hover'></i>
                        </div>

                    </div>
                </div>


                <div class="music-playlist">
                    <div class="list">
                        
                    </div>
                </div>
    `
    //UI music
    fetch(api)
    .then(response => response.json())
    .then(data => {     

        //playlist
        data.forEach((song,index) => {
            let list = $('.music-playlist .list') 
            let html = document.createElement('div')
            html.classList.add('song')
            html.setAttribute("path", song.path)
            html.setAttribute("index", index)
            html.innerHTML = `
                <img alt="" src=${song.image} >
                <h3>${song.name}</h3>
                <i class='bx bx-dots-vertical-rounded'></i>
            `
            list.appendChild(html)
        })


        //scroll resize ui
        let playlist = $('.music-playlist')
        let controlBoby =$('.control-body')
        let controlBody = $('.control-body')
        let controlBodyWidth = controlBody.clientWidth
        playlist.onscroll = function(e){
            let scroll = e.target.scrollTop
            let resizeControlBody = controlBodyWidth - scroll
            
            controlBody.style.width = resizeControlBody > 0 ? resizeControlBody+'px' : 0
            controlBody.style.height = resizeControlBody > 0 ? resizeControlBody+'px' : 0
            controlBody.style.opacity = resizeControlBody / controlBodyWidth
        }

        //controler
        let plause = $('.plause').children
        let cd = $(".control-body")
        let cdImg = $(".control-body img")
        let currentSong = $('.current-song')
        
        let curTime = $('.timing-audio')
        

        let replayBtn = $('.events .repost')
        let randomBtn = $('.events .random')
        let songsPlay = $$('.song')

        //function play
        function playSong(indexSong = 0,events){
            if(indexSong < data.length){            

                if(currentSong.firstElementChild == null){
                    currentSong.innerHTML = `
                        <audio value=${indexSong} preload="metadata">
                        <source src=${data[indexSong].path}> 
                        </audio>
                    `
                    plause[0].classList.add('hidden')
                    plause[1].classList.remove('hidden')
                    let audio = $('.current-song audio')
                    audio.play()
                    audio.ontimeupdate = function(){
                        let minute = (audio.currentTime / audio.duration) * 100
                        minute = minute.toFixed(1)
                        curTime.innerHTML = `${minute}%`
                        cdImg.style.transform = `rotateZ(${audio.currentTime}deg)`
                    }
                    
                    $('.control-header h3').innerHTML = `${data[indexSong].name}`
                    $('.control-body img').src = `${data[indexSong].image}`
                    
                    
                    audio.onended = function(){
                        playSong(++indexSong)
                    }
                }else{
                    let audio = $('.current-song audio')
    
                    if(audio.currentTime == audio.duration){
                        
                        let replayOff = replayBtn.classList.contains('disable')
                        let randomOff = randomBtn.classList.contains('disable')
                        
                        if(replayOff && randomOff){
                            currentSong.innerHTML = `
                                <audio value=${indexSong} preload="metadata">
                                <source src=${data[indexSong].path}> 
                                </audio>
                            `
                            plause[0].classList.add('hidden')
                            plause[1].classList.remove('hidden')
                            audio = $('.current-song audio')
                            audio.play()
                            $('.control-header h3').innerHTML = `${data[indexSong].name}`
                            $('.control-body img').src = `${data[indexSong].image}`
                            
                            audio.ontimeupdate = function(){
                                let minute = (audio.currentTime / audio.duration) * 100
                                minute = minute.toFixed(1)
                                curTime.innerHTML = `${minute}%`
                                cdImg.style.transform = `rotateZ(${audio.currentTime}deg)`
                            }
                            audio.onended = function(){
                                playSong(++indexSong)
                            }
                            
                        }else{
                            if(!replayOff){
                                let indexSong = $('.current-song audio').getAttribute('value')
                                currentSong.innerHTML = `
                                <audio value=${indexSong} preload="metadata">
                                <source src=${data[indexSong].path}> 
                                </audio>
                                `
                                plause[0].classList.add('hidden')
                                plause[1].classList.remove('hidden')
                                audio = $('.current-song audio')
                                audio.play()
                                $('.control-header h3').innerHTML = `${data[indexSong].name}`
                                $('.control-body img').src = `${data[indexSong].image}`                                
                                cdImg.style.transform = 0
                                audio.ontimeupdate = function(){
                                    let minute = (audio.currentTime / audio.duration) * 100
                                    minute = minute.toFixed(1)
                                    curTime.innerHTML = `${minute}%`
                                    cdImg.style.transform = `rotateZ(${audio.currentTime}deg)`
                                }
                                audio.onended = function(){
                                    let replayOff = replayBtn.classList.contains('disable')
                                    if(!replayOff){
                                        playSong(indexSong)
                                    }else{
                                        playSong(++indexSong)
                                    }
                                }
                            }
                            if(!randomOff){
                                
                                let numRandom = Math.random() * 11
                                let notdataLength = (data.length -1) / 10
                                let indexSong = Math.floor(notdataLength * numRandom)
                                
                                currentSong.innerHTML = `
                                <audio value=${indexSong} preload="metadata">
                                <source src=${data[indexSong].path}> 
                                </audio>
                                `
                                plause[0].classList.add('hidden')
                                plause[1].classList.remove('hidden')
                                audio = $('.current-song audio')
                                audio.play()
                                $('.control-header h3').innerHTML = `${data[indexSong].name}`
                                $('.control-body img').src = `${data[indexSong].image}`                                
                                cdImg.style.transform = 0
                                audio.ontimeupdate = function(){
                                    let minute = (audio.currentTime / audio.duration) * 100
                                    minute = minute.toFixed(1)
                                    curTime.innerHTML = `${minute}%`
                                    cdImg.style.transform = `rotateZ(${audio.currentTime}deg)`
                                }
                                
                                playSong(0)
                                audio.onended = function(){
                                    let randomOff = randomBtn.classList.contains('disable')
                                    
                                    if(!randomOff){
                                        playSong(indexSong)
                                    }else{
                                        playSong(++indexSong)
                                    }
                                }
                            }
                        }
                    }else{
                        if(events){
                            currentSong.innerHTML = `
                            <audio value=${indexSong} preload="metadata">
                            <source src=${data[indexSong].path}> 
                            </audio>
                            `
                            plause[0].classList.add('hidden')
                            plause[1].classList.remove('hidden')
                            audio = $('.current-song audio')
                            audio.play()
                            $('.control-header h3').innerHTML = `${data[indexSong].name}`
                            $('.control-body img').src = `${data[indexSong].image}`
                            cdImg.style.transform = 0
                            audio.ontimeupdate = function(){
                                cdImg.style.transform = `rotateZ(${audio.currentTime}deg)`
                            }
                            audio.onended = function(){
                                playSong(++indexSong)
                            }
                        }else{
                            audio.play()
                            plause[0].classList.add('hidden')
                            plause[1].classList.remove('hidden')
                            
                        }
                    }
                }
            }else{
                playSong(0)
            }

        }
        // function pause song
        function pauseSong(){
            let audio = $('.current-song audio')
            audio.pause()
            // cd.style.animationPlayState = `paused`
            plause[0].classList.remove('hidden')
            plause[1].classList.add('hidden')
        }

        //play song when click
        let itemSongs = $$('.music-playlist .list .song')
        itemSongs.forEach(song => {
            song.onclick = function(events){
                let indexSong = song.getAttribute('index')
                playSong(Number(indexSong),events)
                
            }
            
        })

        //play pause
        let plauseBtn = $('.plause')
        plause[0].onclick = function(){

            playSong()
        }
        plause[1].onclick = pauseSong

        //search - play when click
        let inputSearch = $('.header-search input')
        let suggestSearch = $('.header-search__suggest')
        inputSearch.oninput = function(e){
            let valueInput = e.target.value.trim().toLowerCase()
            let valueInputLength = valueInput.length

            if(valueInputLength>0){
                let songsSuggest = data.filter(function(song){      
                    let songName = song.name.slice(0, valueInputLength).toLowerCase()
                    return valueInput == songName   
                })
                if(songsSuggest.length>0){
                    songsSuggest.forEach(function(song){
                        suggestSearch.innerHTML = `
                            <a>${song.name}</a>
                            `
                        let searchedSong = suggestSearch.querySelector('a')

                        searchedSong.setAttribute('i-song', song.id)
                        Object.assign(suggestSearch.style, {
                            opacity: "1",
                            width: "100%"
                        })
                    })
                }else{
                    suggestSearch.innerHTML = ''
                    Object.assign(suggestSearch.style, {
                        opacity: "0",
                        width: 0
                    })
                }
            }else{
                suggestSearch.innerHTML = ''
                Object.assign(suggestSearch.style, {
                    opacity: "0",
                    width: 0
                })
            }
        }
        //play when click song search
        suggestSearch.onclick = function(events){
            if(suggestSearch.childElementCount > 0){
                if(events.target.nodeName == "A"){
                    suggestSearch.innerHTML = ''
                    Object.assign(suggestSearch.style, {
                        opacity: "0",
                        width: 0
                    })
                    let indexSong = events.target.getAttribute('i-song')
                    playSong(Number(indexSong), events)
                }
            }
        }

        //press prev song 
        let prevBtn = $('.events .prev')
        prevBtn.onclick = function(events){
            if(currentSong.childElementCount == 0){
                playSong((data.length - 1))
            }else{
                let audio = currentSong.querySelector('audio')
                let indexSong = Number(audio.getAttribute('value'))
                if(indexSong == 0){
                    let indexSongPrev = Math.abs(indexSong - (data.length - 1))
                    playSong(indexSongPrev, events)
                }
                else{
                    playSong(--indexSong, events)
                }
            }
        }
        //press next song  
        let nextBtn = $('.events .next')
        nextBtn.onclick = function(events){
            if(currentSong.childElementCount == 0){
                playSong(1)
            }else{
                let audio = currentSong.querySelector('audio')
                let indexSong = Number(audio.getAttribute('value'))
                if(indexSong == (data.length - 1)){
                    let indexSongNext = Math.abs(indexSong - (data.length - 1))
                    playSong(indexSongNext, events)
                }
                else{
                    playSong(++indexSong, events)
                }
            }
        }

        
        //replay
        replayBtn.onclick = function(events){
            if(currentSong.childElementCount != 0){
                if(replayBtn.classList.contains('disable')){   
                    if(randomBtn.classList.contains('disable')){
                        replayBtn.classList.remove('disable')
                    }else{
                        randomBtn.classList.add('disable')
                        replayBtn.classList.remove('disable')           
                    }
                }else{
                    replayBtn.classList.add('disable')

                }
            }
        }

        //random
        randomBtn.onclick = function(events){
            if(currentSong.childElementCount != 0){
                if(randomBtn.classList.contains('disable')){   
                    if(replayBtn.classList.contains('disable')){
                        randomBtn.classList.remove('disable')
                    }else{
                        replayBtn.classList.add('disable')           
                        randomBtn.classList.remove('disable')
                    }
                }else{
                    randomBtn.classList.add('disable')

                }
            }
        }

        //scroll to timing audio
        let scrollLeft = $('.scroll-left')
        let scrollRight = $('.scroll-right')
        scrollRight.scrollTo(0, scrollRight.clientHeight / 2)
        scrollLeft.scrollTo(0, scrollLeft.clientHeight / 2)

        scrollLeft.onscroll = function(e){
            let audio = $('.current-song audio')
            if(audio != null){
                let onePercentHeight = scrollLeft.clientHeight / 100
                let scrollPercentHeight = e.target.scrollTop / onePercentHeight
                let timeSongScroll = (scrollPercentHeight * audio.duration) / 100
                audio.currentTime = timeSongScroll
                plause[1].classList.remove('hidden')
                plause[0].classList.add('hidden')
                audio.play()
            }
        }
        
        scrollRight.onscroll = function(e){
            let audio = $('.current-song audio')
            if(audio != null){
                let scrollPosition = e.target.scrollTop
                let revertScroll = Math.abs(scrollPosition - scrollRight.clientHeight)
                let onePercentHeight = scrollRight.clientHeight / 100
                let scrollPercentHeight = revertScroll / onePercentHeight
                let timeSongScroll = (audio.duration * scrollPercentHeight) / 100
                audio.currentTime = timeSongScroll
                plause[1].classList.remove('hidden')
                plause[0].classList.add('hidden')
                audio.play()
            }
        }

    })
    return music
}
export default UImusic