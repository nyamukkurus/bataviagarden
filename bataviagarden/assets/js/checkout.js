document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("KoskYT0N9w2jkxYOp");

    const checkoutForm = document.getElementById("checkout-form");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Mencegah reload halaman

            // Tombol checkout berubah jadi "Mengirim..."
            const checkoutBtn = document.querySelector(".checkout-btn");
            checkoutBtn.textContent = "Mengirim...";
            checkoutBtn.disabled = true;

            // Ambil data dari form
            let formData = new FormData(this);
            let params = {
                name: formData.get("name"),
                email: formData.get("email"),
                address: formData.get("address"),
                order: getCartItems() // Ambil daftar produk yang dipesan
            };

            // Kirim Email dengan EmailJS
            emailjs.send("service_ws2v1fl", "template_hbygmql", params)
                .then(function(response) {
                    console.log("Pesanan berhasil dikirim", response);
                    alert("Pesanan Anda telah diterima! Kami akan segera menghubungi Anda.");

                    // Hapus data keranjang setelah checkout berhasil
                    localStorage.removeItem("cart");

                    // Redirect ke halaman sukses
                    window.location.href = "thankyou.html";
                })
                .catch(function(error) {
                    console.error("Gagal mengirim pesanan", error);
                    alert("Terjadi kesalahan saat mengirim pesanan, silakan coba lagi.");
                })
                .finally(() => {
                    checkoutBtn.textContent = "Kirim Pesanan";
                    checkoutBtn.disabled = false;
                });
        });
    }
});

// Fungsi untuk mengambil produk yang ada di keranjang belanja
function getCartItems() {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    return cartData.map(item => `${item.name} - ${item.price} (x${item.quantity})`).join("\n");
}
