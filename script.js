document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseFloat(button.getAttribute('data-product-price'));

            addToCart({ id: productId, name: productName, price: productPrice });
        });
    });

    function addToCart(product) {
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            cartItems[existingProductIndex].quantity += 1;
        } else {
            product.quantity = 1;
            cartItems.push(product);
        }
        renderCart();
    }

    function renderCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
    }
});
