const nav = document.getElementById('navibar');
const bar = document.getElementById('bar');
const close = document.getElementById('close');

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active'); 
    });
}

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active'); 
    });
}

// Add to Cart
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = parseFloat(button.getAttribute('data-price')) || 0;

            addToCart(productName, productPrice);

            const notification = document.getElementById('notification');
            notification.style.display = 'block';
            notification.style.opacity = '1';
            notification.innerText = `${productName} added to cart!`;

            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.style.display = 'none', 500);
            }, 2000);
        });
    });

    displayCartItems();
});

// Add to Cart Function
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, quantity: 1, price: productPrice });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Display Cart Items Function
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const total = item.quantity * item.price;
        totalPrice += total;

        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>R${item.price}</td>
            <td>R${total}</td>
        `;

        cartItemsContainer.appendChild(itemRow);
    });

    document.getElementById('total-price').innerText = `${totalPrice}`;
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems();
}

document.getElementById('place-order-button').addEventListener('click', () => {
    clearCart();
    showOrderConfirmation();
});

function showOrderConfirmation() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.style.opacity = '1';
    notification.innerText = 'Your order has been placed successfully!';

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.style.display = 'none', 500);
    }, 2000);
}

document.getElementById('clear-cart-button').addEventListener('click', clearCart);

