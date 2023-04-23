function body(){
    let body = document.createElement("section")
    body.classList.add('body')
    body.innerHTML = `

        <div class="body-sidebar__left">
            <div class="first-options">
                <div class="btn" >
                    <i class='bx bxs-home'></i>
                    <span>home</span>
                </div>
                <div class="btn" >
                    <i class='bx bxs-bar-chart-alt-2'></i>
                    <span>Trending</span>
                </div>
                <div class="btn" >
                    <i class='bx bxs-category-alt'></i>
                    <span>Category</span>
                </div>
            </div>

            <div class="second-options">
                <div class="btn" >
                    <i class='bx bxs-info-circle'></i>
                    <span>About us</span>
                </div>
                
            </div>
        </div>

        <div class="body-content">
        
        </div>

        <div class="body-sidebar__right">
            <div class="account">
                <div class="account-signin btn">
                    <span>Sign in</span>
                    <i class='bx bxs-edit'></i>
                </div>

                <div class="account-login btn">
                    <span>Log in</span>
                    <i class='bx bxs-log-in-circle'></i>
                </div>
            </div>
            
            <div class="manage">
                <div class="manage-cart btn">
                    <span>Cart</span>
                    <i class='bx bxs-cart-alt' ></i>
                </div>

                <div class="manage-notify btn">
                    <span>Nottiy</span>
                    <i class='bx bxs-bell'></i>
                </div>

                <div class="mode-view">
                    <div class="btn-mode btn-mode--switch">

                        <i class='bx bxs-moon' ></i>
                        <i class='bx bxs-sun' ></i>
                    
                    </div>
                </div>

            </div>

        </div>
    `
    return body
}
export default body