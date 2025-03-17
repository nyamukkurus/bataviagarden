document.addEventListener("DOMContentLoaded", function () {
    console.log("index.js loaded");

    // Contoh animasi sederhana saat halaman pertama kali dibuka
    const heroText = document.querySelector(".hero-text");
    if (heroText) {
        heroText.classList.add("fade-in");
    }
});
