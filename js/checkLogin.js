document.addEventListener('DOMContentLoaded', function () {
    const isLogin = JSON.parse(localStorage.getItem('isLogin'));
    const loginBtn = document.querySelector('.login-button');
    const logoutBtn = document.querySelector('.logout-button');
    if (isLogin && isLogin.expiration <= Date.now()) {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('jwtToken');
        if(loginBtn) {
            loginBtn.style.display = 'block';
        }
        if(logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    } else if(isLogin && isLogin.value) {
        if(loginBtn) {
            loginBtn.style.display = 'none';
        }
        if(logoutBtn) {
            logoutBtn.style.display = 'block';
        }
        checkLoggedIn();
    }
});
async function checkLoggedIn() {
    const getToken = localStorage.getItem('jwtToken');
    if(getToken) {
        const getUser = await fetch('https://knu-api.vercel.app/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken}`,
                'Content-Type': 'application/json'
            }
        });
        if(!getUser.ok) {
            throw new Error(`HTTP error! Status: ${getUser.status}`);
        }
        const getUserRes = await getUser.json();

        const showUsername = document.querySelector("#knu-user-name");
        if(showUsername) {
            showUsername.textContent = `Welcome ${getUserRes.firstName} ${getUserRes.lastName}`;
            showUsername.style.display = 'block';
        }

        getCartData(getToken)

    }
}

async function getCartData(token) {
    const getCartReq = await fetch('https://knu-api.vercel.app/cart', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if(!getCartReq.ok) {
        console.log("The user has no cart data");
        localStorage.removeItem('cart-info');
    } else {
        const getCartRes = await getCartReq.json();
    }
} 
