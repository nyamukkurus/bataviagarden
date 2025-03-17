document.addEventListener("DOMContentLoaded", function () {
    console.log("products.js loaded");

    // Daftar produk
    const products = [
        { id: 1, name: "Monstera", price: 150000, category: "indoor" },
        { id: 2, name: "Palm Kuning", price: 250000, category: "outdoor" },
        { id: 3, name: "Kaktus Mini", price: 50000, category: "indoor" },
        { id: 4, name: "Sansevieria", price: 100000, category: "indoor" },
        { id: 5, name: "Bambu Hoki", price: 120000, category: "indoor" }
    ];

    const productContainer = document.getElementById("product-list");
    const searchInput = document.getElementById("search");

    function displayProducts(filter = "") {
        productContainer.innerHTML = ""; // Bersihin container sebelum nambah produk baru
        let filteredProducts = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

        filteredProducts.forEach(p => {
            let div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <h3>${p.name}</h3>
                <p>Rp ${p.price.toLocaleString()}</p>
                <button onclick="addToCart(${p.id})">Sewa</button>
            `;
            productContainer.appendChild(div);
        });
    }

    searchInput.addEventListener("input", function () {
        displayProducts(searchInput.value);
    });

    displayProducts();
});

// Tambahkan produk ke keranjang
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = { id, name: "", price: 0, quantity: 1 };

    // Cari produk berdasarkan ID
    const foundProduct = [
        { id: 1, name: "Monstera", price: 150000 },
        { id: 2, name: "Palm Kuning", price: 250000 },
        { id: 3, name: "Kaktus Mini", price: 50000 },
        { id: 4, name: "Sansevieria", price: 100000 },
        { id: 5, name: "Bambu Hoki", price: 120000 }
    ].find(p => p.id === id);

    if (foundProduct) {
        product.name = foundProduct.name;
        product.price = foundProduct.price;
    }

    // Cek apakah produk sudah ada di keranjang
    let existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produk ditambahkan ke keranjang!");
}
