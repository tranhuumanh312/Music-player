function mode(classBtn){
    const $ = document.querySelector.bind(document)
    let root = $(':root')
    let header = $('.header')
    let headerLogo = $('.header-logo')
    let sidebarLeft = $('.body-sidebar__left')
    let btnMode = $(classBtn)
    let userIcon = $('.header-user .icon')
    let sidebarRight = $('.body-sidebar__right')
    
    //display  menu

    let showSidebarLeft =  function(){
        Object.assign(sidebarLeft.style, {
            width: "72px",
            opacity: "1",
            pointerEvents : "auto"
        })
    }

    let hideSidebarLeft = function(){
        Object.assign(sidebarLeft.style, {
            width: "0",
            opacity: "0",
            pointerEvents : "none"
        })
    }

    headerLogo.addEventListener("mouseover", showSidebarLeft);
    sidebarLeft.addEventListener("mouseleave", hideSidebarLeft) 
    

    let showSidebarRight = function(){
        Object.assign(sidebarRight.style, {
            width: "72px",
            opacity: "1",
            pointerEvents : "auto"
        })
    }

    let hideSidebarRight = function(){
        Object.assign(sidebarRight.style, {
            width: "0",
            opacity: "0",
            pointerEvents : "none"
        })
    }
    userIcon.addEventListener("mouseover", showSidebarRight)
    sidebarRight.addEventListener("mouseleave", hideSidebarRight)

    // header.addEventListener("mouseleave", hideSidebarLeft)
    // header.addEventListener("mouseleave", hideSidebarRight)


    //switch
    btnMode.onclick = function(){
        if(btnMode.classList.contains('btn-mode--switch')){
            root.style.setProperty('--black-color', '#b7bfc7')
            root.style.setProperty('--white-color', '#0d1116')
            btnMode.style.transform = "translateX(28px)"
            btnMode.firstElementChild.style.opacity = "0"
            btnMode.lastElementChild.style.opacity = "1"
            btnMode.classList.remove('btn-mode--switch')
        }else{
            root.style.setProperty('--black-color', '#0d1116')
            root.style.setProperty('--white-color', '#b7bfc7')
            btnMode.style.transform = "translateX(0px)"
            btnMode.lastElementChild.style.opacity = "0"
            btnMode.firstElementChild.style.opacity = "1"
            btnMode.classList.add('btn-mode--switch')
        }
    }


}
export default mode