document.addEventListener('DOMContentLoaded', function () {
    const signupBtn = document.querySelector('#signup');
    if(signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signup();
        });
    }
});
async function signup() {
    const email = document.querySelector('#floatingEmail').value;
    const password = document.querySelector('#floatingPassword').value;
    const firstName = document.querySelector('#floatingFirstname').value;
    const lastName = document.querySelector('#floatingLastname').value;
    const phone = document.querySelector('#floatingPhone').value;
    const address = document.querySelector('#floatingFirstname').value;
    if (email == "" || password == "" || firstName == "" || lastName == "" || phone == "") {
        alert("Không được bỏ trống");
        return;
    }

    const reqData = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address
    }

    const register = await fetch('http://localhost:3000/auth/signup', {
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
    localStorage.setItem("jwtToken", token);

    const dataExpiration = {
        value: true,
        expiration: Date.now() + 24 * 60 * 60 * 1000     //convert 1 day to millisecond
    };
    localStorage.setItem('isLogin', JSON.stringify(dataExpiration));

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000)
}