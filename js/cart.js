document.addEventListener('DOMContentLoaded', function () {
    fillCart();
});

function fillCart() {
    const getCartInfo = localStorage.getItem('cart-info');
    if(!getCartInfo || getCartInfo == '') {
        console.log('Cart empty');
    } else {
        let content = `<table>
        <tr>
            <th>Sản phẩm</th>
            <th></th>
            <th>SL</th>
            <th>Đơn giá</th>
        </tr>
        `;
        let cartData = JSON.parse(getCartInfo);
        console.log('cartData', cartData);
        const totalAmount = cartData.reduce(function (accumulator, product) {
            return accumulator + product.totalPrice;
        }, 0);

        cartData.forEach((product) => {
            content += `
            <tr alt="spc-01">
				<td>
					<div class="cart-info">
						<img src="${product.imageUrl}" alt="sp007">						
					</div>
				</td>
				<td>	
					<div class="cart-name">
						<h7 class="cart-title">${product.productName}</h7>						
						<small>${convertCurrency(product.price)}</small>
						<br>
						<a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a>
					</div>
				</td>
				<td><input type="number" value="${product.quantity}"></td>
				<td>${convertCurrency(product.totalPrice)}</td>
			</tr>
        `
        });
        content += `</table>`
        
        const listItemCart = document.querySelector('#knu-list-cart-item');
        const subTotal = document.querySelector('.knu-sub-total');
        const total = document.querySelector('.knu-total');
        subTotal.innerHTML = convertCurrency(totalAmount);
        total.innerHTML = convertCurrency(totalAmount);
        listItemCart.innerHTML = content ? content : '';
    }

}

function convertCurrency(price) {
    const result = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return result;
}