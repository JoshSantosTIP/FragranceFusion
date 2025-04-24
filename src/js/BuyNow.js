document.addEventListener("DOMContentLoaded", () => {
  // Update quantity based on user input
  function changeQty(change) {
    const qtyInput = document.getElementById("quantity");
    if (!qtyInput) {
      console.error("Quantity input not found!");
      return;
    }

    let qty = parseInt(qtyInput.value);
    qty = Math.max(1, qty + change); // Ensure quantity is at least 1
    qtyInput.value = qty;
    updatePrice();
  }

  // Update the total price based on selected size and quantity
  function updatePrice() {
    const activeSize = document.querySelector("#sizeOptions .active");
    if (!activeSize) {
      console.error("No size selected!");
      return;
    }

    const qtyInput = document.getElementById("quantity");
    if (!qtyInput) {
      console.error("Quantity input not found!");
      return;
    }

    const price = parseFloat(activeSize.dataset.price);
    const qty = parseInt(qtyInput.value);
    const total = price * qty;
    document.getElementById("totalPrice").textContent = `Total: $${total.toFixed(2)}`;
  }

  // Handle size selection
  function selectSize(button) {
    document.querySelectorAll("#sizeOptions button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    updatePrice();
  }

  // Add event listeners to size buttons
  document.querySelectorAll("#sizeOptions button").forEach(btn => {
    btn.addEventListener("click", function () {
      selectSize(this);
    });
  });

  // Initialize default size selection
  const defaultSize = document.querySelector("#sizeOptions button");
  if (defaultSize) {
    defaultSize.click(); // Select the first size by default
  }

  // Attach quantity change handlers
  document.querySelector(".btn-outline-dark[onclick='changeQty(-1)']").addEventListener("click", () => changeQty(-1));
  document.querySelector(".btn-outline-dark[onclick='changeQty(1)']").addEventListener("click", () => changeQty(1));
});
