
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product, .fragrance-card");
      const name = productCard.querySelector("h2, .card-title").textContent;
      const price = parseFloat(productCard.querySelector(".price, .text-muted").textContent.replace("$", ""));
      const img = productCard.querySelector("img").src;
  
      // Get existing cart from localStorage or initialize an empty array
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Check if the item already exists in the cart
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        cart.push({ name, price, img, quantity: 1 }); // Add new item
      }
  
      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
  
      alert(`"${name}" has been added to your cart!`);
    });
  });
