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
    sessionStorage.removeItem('jwtToken');
    window.location.reload();
}