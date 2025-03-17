document.addEventListener("DOMContentLoaded", function () {
    console.log("checkout.js loaded");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutContainer = document.getElementById("checkout-items");
    const totalPriceElement = document.getElementById("checkout-total");

    function displayCheckoutItems() {
        checkoutContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rp ${item.price.toLocaleString()}</td>
                <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
            `;
            checkoutContainer.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toLocaleString();
    }

    displayCheckoutItems();

    // Handle Submit Form
    document.getElementById("checkout-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let customerInfo = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            order: cart
        };

        localStorage.setItem("order", JSON.stringify(customerInfo));
        localStorage.removeItem("cart");

        alert("Pesanan berhasil dikonfirmasi!");
        window.location.href = "thankyou.html";
    });
});
