document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
        document.getElementById("cart-count").innerText = cart.length;
    }

    function addToCart(productName, price) {
        cart.push({ name: productName, price: price });
        saveCart();
        updateCartCount();
        alert(`${productName} telah ditambahkan ke keranjang!`);
    }

    function displayCart() {
        let cartTable = document.getElementById("cart-items");
        let totalPrice = 0;

        cartTable.innerHTML = "";
        cart.forEach((item, index) => {
            let row = cartTable.insertRow();
            row.innerHTML = `
                <td>${item.name}</td>
                <td>Rp ${item.price.toLocaleString()}</td>
                <td><button class="remove-btn" data-index="${index}">Hapus</button></td>
            `;
            totalPrice += item.price;
        });

        document.getElementById("total-price").innerText = `Rp ${totalPrice.toLocaleString()}`;
    }

    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
        displayCart();
        updateCartCount();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.parentElement;
            let name = product.querySelector("h3").innerText;
            let price = parseInt(product.querySelector("p").innerText.replace("Rp ", "").replace(".", ""));
            addToCart(name, price);
        });
    });

    if (document.getElementById("cart-items")) {
        displayCart();
        document.getElementById("cart-items").addEventListener("click", function (e) {
            if (e.target.classList.contains("remove-btn")) {
                removeItem(e.target.dataset.index);
            }
        });
    }

    updateCartCount();
});
