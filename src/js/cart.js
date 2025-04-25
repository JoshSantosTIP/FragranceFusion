let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center">
        <img src="${item.img}" alt="${item.name}" class="me-3" />
        <div>
          <strong>${item.name}</strong><br/>
          $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateQuantity(${index}, -1)">-</button>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateQuantity(${index}, 1)">+</button>
        <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">Remove</button>
      </div>
    </div>
  `).join("");

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("total").textContent = subtotal.toFixed(2);

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(index, delta) {
  cart[index].quantity = Math.max(0, cart[index].quantity + delta);
  if (cart[index].quantity === 0) removeItem(index);
  else updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Initialize cart
updateCart();

// Handle "Proceed to Checkout" button click
document.querySelector(".btn.btn-dark.w-100").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items to proceed to checkout.");
    return;
  }

  // Redirect to the Checkout page
  window.location.href = "Checkout.html";
});



















/* for debugging purposes, placeholder data in the cart array
   to simulate a real cart.  
let cart = [
  {
    name: "Placeholder Perfume",
    price: 129.99,
    img: "https://via.placeholder.com/50x50?text=Perfume",
    quantity: 1
  }
];

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center">
        <img src="${item.img}" alt="${item.name}" class="me-3" />
        <div>
          <strong>${item.name}</strong><br/>
          $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateQuantity(${index}, -1)">-</button>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateQuantity(${index}, 1)">+</button>
        <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">Remove</button>
      </div>
    </div>
  `).join("");

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("total").textContent = subtotal.toFixed(2);
}

function updateQuantity(index, delta) {
  cart[index].quantity = Math.max(0, cart[index].quantity + delta);
  if (cart[index].quantity === 0) removeItem(index);
  else updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Initialize cart
updateCart(); */
