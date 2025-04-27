// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

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
        cartItemsList.innerHTML = '<p>Your cart is empty. Please add items to proceed.</p>';
        subtotalField.textContent = '0.00';
        totalField.textContent = '0.00';
        return;
    }

    let subtotal = 0;

    cartItemsList.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        return `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.name}</h6>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${index})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
                <div>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                    <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    // Update the subtotal and total fields
    subtotalField.textContent = subtotal.toFixed(2);
    totalField.textContent = subtotal.toFixed(2);

    // Attach event listeners to the Remove buttons
    attachRemoveEventListeners();
}

// Function to attach event listeners to Remove buttons
function attachRemoveEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = event.target.getAttribute('data-id');
            removeItem(itemId);
        });
    });
}

// Function to increase the quantity of an item
function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to decrease the quantity of an item
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// Function to remove an item from the cart
function removeItem(itemId) {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1); // Remove the item from the cart array
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        displayCartItems(); // Re-render the cart items
    }
}

// Function to remove all items from the cart
function removeAllItems() {
    cart.length = 0; // Clear the cart array
    localStorage.removeItem('cart'); // Remove the cart data from localStorage
    displayCartItems(); // Re-render the cart items
}

// Function to add an item to the cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        cart.push(item); // Add new item to the cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    alert(`${item.name} has been added to your cart.`);
}

// Function to proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before proceeding to checkout.');
        return;
    }
    localStorage.setItem('checkoutCart', JSON.stringify(cart)); // Save the cart to localStorage under the key 'checkoutCart'
    window.location.href = 'checkout.html'; // Redirect to the checkout page
}

// Display cart items on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = {
                id: button.getAttribute('data-id'), // Ensure this is unique for each product
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
                quantity: 1 // Default quantity is 1 when adding a new item
            };
            addToCart(item);
        });
    });
});
