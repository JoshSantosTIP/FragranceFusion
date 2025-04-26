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
        checkoutItemsList.innerHTML = '<p>Your cart is empty. Please add items to proceed.</p>';
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
                    <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');

    // Update the subtotal and total fields
    subtotalField.textContent = subtotal.toFixed(2);
    totalField.textContent = subtotal.toFixed(2); // Assuming no additional shipping or taxes for now
}

// Ensure only one subtotal is displayed
function removeDuplicateSubtotal() {
    const duplicateSubtotalElements = document.querySelectorAll('#checkout-subtotal');
    if (duplicateSubtotalElements.length > 1) {
        for (let i = 1; i < duplicateSubtotalElements.length; i++) {
            duplicateSubtotalElements[i].remove(); // Remove duplicate subtotals
        }
    }
}

// Display checkout items on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCheckoutItems();
    removeDuplicateSubtotal(); // Remove duplicate subtotal elements
});
