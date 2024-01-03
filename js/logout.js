document.addEventListener('DOMContentLoaded', function (){
    const logoutBtn = document.querySelector(".logout-button");
    if(logoutBtn) {
        logoutBtn.addEventListener("click", () =>{
            logout();
        });
    }
});

function logout() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('cart-info');
    window.location.reload();
}