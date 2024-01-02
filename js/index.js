async function fetchDataFirstLoad() {
    try {
        // Make the API call using the fetch function
        const response = await fetch('http://localhost:3000/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Ensure the response is successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();

        // Handle the data received from the API
        console.log('API Response:', data);

        getProductDataThenDisplay(data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
    }
}

async function getProductDataThenDisplay(categories) {
    try {
        let content = ``;
        categories.forEach(async (category) => {
            const getProducts = await fetch(`http://localhost:3000/product/category/${category.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!getProducts.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const products = await getProducts.json();

            content += `<div class="container mt-3">
			    <h1 class="knu-category-title">${category.categoryName}</h1>
                <div class="row">
            `;

            products.forEach((product) => {
                content += `<div class="col-6 col-sm-6 col-md-4 col-lg-3 mt-2" alt="sku001">
                <div id="${product.id}" class="knu-product-card card">
                    <div class="card-body">
                        <div class="card-img-actions">
                            <img src="${product.imageUrl}" class="card-img img-fluid" alt="${product.productName}">
                        </div>
                    </div>
                    <div class="card-body mt-0">
                        <h5 class="title-spp mb-0">
                            <a href="#">${product.productName}</a>
                        </h5>
                        <h7 class="mb-0 subprice">${product.originalPrice ? product.originalPrice : 0}</h7>
                        <h4 class="mb-0 mainprice">${product.price}</h4>
                        <div style="font-size: 12px; color: #121212;">${product.productDescription}</div>
                        <div class="flex-container mt-2">
                            <div>
                                <i class="fa fa-star star mr-0"> 4/5</i>
                                <div class="mb-1 text-soluong"><strong>155K</strong> đã bán</div>
                            </div>
                            <button type="button" class="btn">
                                <i class="fa fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
            });
            content += `</div></div>`
            document.getElementById("knu-list-products-by-category").innerHTML = content;
        });

    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the fetchData function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchDataFirstLoad();
});