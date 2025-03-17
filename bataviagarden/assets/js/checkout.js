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
// Inisialisasi EmailJS
(function() {
    emailjs.init('your_user_id');  // Ganti dengan User ID dari EmailJS
})();

// Mengirim email ketika formulir dikirim
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Menghentikan form untuk submit seperti biasa

    // Kirim formulir ke EmailJS
    emailjs.sendForm('service_ws2v1fl', 'template_hbygmql', this)  // Ganti dengan Service ID dan Template ID kamu
        .then(function(response) {
            console.log('Pesanan berhasil dikirim', response);
            alert('Pesanan telah diterima! Kami akan segera menghubungi Anda.');
            window.location.href = 'thankyou.html';  // Redirect ke halaman terima kasih
        }, function(error) {
            console.log('Gagal mengirim pesanan', error);
            alert('Terjadi kesalahan, coba lagi.');
        });
});

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
