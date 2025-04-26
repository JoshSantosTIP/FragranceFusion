// Retrieve cart data from localStorage
const checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];

// Function to display checkout items
function displayCheckoutItems() {
    const checkoutItemsList = document.getElementById('checkout-items-list');
    const subtotalField = document.getElementById('checkout-subtotal');
    const totalField = document.getElementById('checkout-total');

    if (!checkoutItemsList || !subtotalField || !totalField) {
        console.error('Checkout elements not found in the DOM.');
        return;
    }

    if (checkoutCart.length === 0) {
        checkoutItemsList.innerHTML = '<p>Your cart is empty. Please return to the cart page to add items.</p>';
        subtotalField.textContent = '0.00';
        totalField.textContent = '0.00';
        return;
    }

    let subtotal = 0;

    checkoutItemsList.innerHTML = checkoutCart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        return `
            <div class="checkout-item d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.name}</h6>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');

    // Update the subtotal and total fields
    subtotalField.textContent = subtotal.toFixed(2);
    totalField.textContent = subtotal.toFixed(2); // Default total is the subtotal
}

// Function to handle shipping method selection
function selectShipping(element, shippingCost) {
    // Remove the "selected" class from all shipping options
    const shippingOptions = document.querySelectorAll('.option');
    shippingOptions.forEach(option => option.classList.remove('selected'));

    // Add the "selected" class to the clicked option
    element.classList.add('selected');

    // Update the total with the selected shipping cost
    const subtotal = parseFloat(document.getElementById('checkout-subtotal').textContent);
    const totalField = document.getElementById('checkout-total');
    const total = subtotal + shippingCost;
    totalField.textContent = total.toFixed(2);
}

// Function to complete the purchase
function completePurchase() {
    alert('Thank you for your purchase! Your order has been placed.');
    localStorage.removeItem('checkoutCart'); // Clear the checkout cart
    window.location.href = 'confirmation.html'; // Redirect to a confirmation page
}

// Display checkout items on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCheckoutItems();
});


