document.addEventListener('DOMContentLoaded', function () {
    const checkoutBtn = document.querySelector('.payment-submit-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            checkout();
        })
    }
});

async function checkout() {
    const SHIPPING_FEE = {
        "Quận 1": "25000",
        "Quận 2": "35000",
        "Quận 3": "20000",
        "Quận 4": "30000",
        "Quận 5": "25000",
        "Quận 6": "35000",
        "Quận 7": "30000",
        "Quận 8": "35000",
        "Quận 9": "45000",
        "Quận 10": "25000",
        "Quận 11": "30000",
        "Quận 12": "40000",
        "Thành phố Thủ Đức": "45000",
        "Quận Gò Vấp": "35000",
        "Quận Phú Nhuận": "25000",
        "Quận Tân Bình": "30000",
        "Quận Tân Phú": "30000",
        "Quận Bình Tân": "30000",
        "Huyện Nhà Bè": "70000",
        "Huyện Hóc Môn": "40000",
        "Huyện Bình Chánh": "40000",
        "Quận Bình Thạnh": "30000"
      }
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const address = document.querySelector("#address").value;
    const shippingMethod = document.querySelector('input[name="radio"]:checked').value;
    const cartData = JSON.parse(localStorage.getItem('cart-info'));
    if(!cartData) {
        alert('Cart empty');
        return false;
    }
    const totalAmount = cartData.reduce(function (accumulator, product) {
        return accumulator + product.totalPrice;
    }, 0);
    const getAddress = address +
            ", " + $("#ward option:selected").text() + ", " + 
            $("#district option:selected").text() + ", " +
            $("#city option:selected").text();
    const shippingFee = Number.parseInt(SHIPPING_FEE[$("#district option:selected").text()]);
    const currentDate = new Date();
    const data = {
        name: name,
        orderDate: currentDate.toISOString(),
        orderStatus: 1,
        phoneNumber: phone,
        shippingAddress: getAddress,
        shippingMethod: shippingMethod,
        paymentMethod: 'COD',
        totalAmount: totalAmount + shippingFee ? shippingFee : 0
    }

    const createOrderReq = await fetch('https://knu-api.vercel.app/order', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const createOrderRes = await createOrderReq.json();

    const dataOrderDetail = {
        orderId: createOrderRes.id,
        cartData: cartData
    };

    const createOrderDetailReq = await fetch('https://knu-api.vercel.app/order-detail', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataOrderDetail)
    });
    const createOrderDetailRes = await createOrderDetailReq.json();

    if(createOrderDetailRes === true) {
        alert('Order created');
        document.getElementById("popup").classList.add("open-popup");
        localStorage.removeItem('cart-info');
    }

}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
}