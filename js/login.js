document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.querySelector('#login');
    if(loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            login();
        });
    }
});
async function login() {
    const email = document.querySelector('#floatingEmail').value;
    const password = document.querySelector('#floatingPassword').value;
    if (email == "" || password == "") {
        alert("Không được bỏ trống");
        return;
    }

    const reqData = {
        email: email,
        password: password
    }

    const register = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData)
    });
    if (!register.ok) {
        throw new Error(`HTTP error! Status: ${register.status}`);
    }
    const registerRes = await register.json();

    const token = registerRes.access_token;
    sessionStorage.setItem("jwtToken", token);

    const dataExpiration = {
        value: true,
        expiration: Date.now() + 24 * 60 * 60 * 1000     //convert 1 day to millisecond
    };
    localStorage.setItem('isLogin', JSON.stringify(dataExpiration));

    setTimeout(() => {
        window.location.href = 'index.html';
    })
}