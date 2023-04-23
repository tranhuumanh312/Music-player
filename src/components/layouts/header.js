function header(){
    let header = document.createElement("header")
    header.classList.add('header')
    header.innerHTML = `
    <div class="header-logo">
        <i class='bx bx-pyramid icon' ></i> 
    </div>
    <div class="header-search">
        <input type="text" placeholder="Search" autocomplete="off">
        <i class='bx bx-search-alt icon'></i>
        <div class="header-search__suggest"></div>
    </div>
    <div class="header-user">
        <i class='bx bx-user-circle icon' ></i>
    </div>
    
    `
    return header
}
export default header