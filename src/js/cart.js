// Initialize the cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a product to the cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if product already exists
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new product to the cart
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} has been added to your cart!`);
}

// Function to display cart items
function displayCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalField = document.getElementById('subtotal');
    const totalField = document.getElementById('total');

    if (!cartItemsList || !subtotalField || !totalField) {
        console.error('Cart elements not found in the DOM.');
        return;
    }

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
        subtotalField.textContent = '0.00';
        totalField.textContent = '0.00';
        return;
    }

    let subtotal = 0;

    cartItemsList.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        return `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.name}</h6>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div>
                    <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');

    subtotalField.textContent = subtotal.toFixed(2);
    totalField.textContent = subtotal.toFixed(2); // Assuming no additional shipping or taxes for now
}

// Function to remove all items from the cart
function removeAllItems() {
    if (confirm('Are you sure you want to remove all items from the cart?')) {
        cart = []; // Clear the cart array
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        displayCartItems(); // Refresh the cart display
    }
}

// Function to proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add items to proceed to checkout.');
        return;
    }

    // Save the cart data to localStorage
    localStorage.setItem('checkoutCart', JSON.stringify(cart));

    // Navigate to the checkout page
    window.location.href = 'checkout.html';
}

// Event listener for "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
            };

            addToCart(product);
        });
    });

    // Display cart items if on the cart page
    if (document.getElementById('cart-items-list')) {
        displayCartItems();
    }

    // Add event listener for the "Remove All" button
    const removeAllButton = document.querySelector('.btn-danger');
    if (removeAllButton) {
        removeAllButton.addEventListener('click', removeAllItems);
    }

    // Add event listener for the "Proceed to Checkout" button
    const proceedToCheckoutButton = document.querySelector('.btn-dark');
    if (proceedToCheckoutButton) {
        proceedToCheckoutButton.addEventListener('click', proceedToCheckout);
    }
});
