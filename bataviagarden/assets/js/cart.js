document.addEventListener("DOMContentLoaded", function () {
    console.log("cart.js loaded");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>Rp ${item.price.toLocaleString()}</td>
                <td>
                    <button class="btn-decrease" data-index="${index}">-</button>
                    ${item.quantity}
                    <button class="btn-increase" data-index="${index}">+</button>
                </td>
                <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
                <td><button class="btn-remove" data-index="${index}">Hapus</button></td>
            `;
            cartContainer.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toLocaleString();
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartContainer.addEventListener("click", function (e) {
        let index = e.target.dataset.index;
        if (e.target.classList.contains("btn-increase")) {
            cart[index].quantity++;
        } else if (e.target.classList.contains("btn-decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        } else if (e.target.classList.contains("btn-remove")) {
            cart.splice(index, 1);
        }
        updateCart();
    });

    updateCart();
});
