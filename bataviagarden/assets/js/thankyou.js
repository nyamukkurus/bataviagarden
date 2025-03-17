document.addEventListener("DOMContentLoaded", function () {
    console.log("thankyou.js loaded");

    const orderSummary = document.getElementById("order-summary");
    let order = JSON.parse(localStorage.getItem("order")) || [];

    if (order.length === 0) {
        orderSummary.innerHTML = "<p>Tidak ada pesanan ditemukan.</p>";
    } else {
        let total = 0;
        let orderHTML = "<ul>";

        order.forEach(item => {
            orderHTML += `<li>${item.name} - ${item.quantity} x Rp ${item.price.toLocaleString()}</li>`;
            total += item.price * item.quantity;
        });

        orderHTML += `</ul><p><strong>Total Harga:</strong> Rp ${total.toLocaleString()}</p>`;
        orderSummary.innerHTML = orderHTML;

        localStorage.removeItem("order");
    }
});
