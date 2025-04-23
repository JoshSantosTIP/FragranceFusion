function changeQty(change) {
  const qtyInput = document.getElementById("qty");
  let qty = parseInt(qtyInput.value);
  qty = Math.max(1, qty + change);
  qtyInput.value = qty;
  updatePrice();
}

function updatePrice() {
  const activeSize = document.querySelector("#sizeOptions .active");
  const price = parseFloat(activeSize.dataset.price);
  const qty = parseInt(document.getElementById("qty").value);
  const total = price * qty;
  document.getElementById("priceDisplay").textContent = `$${total}`;
}

function selectSize(button) {
  document.querySelectorAll("#sizeOptions button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  updatePrice();
}


document.querySelectorAll("#sizeOptions button").forEach(btn => {
  btn.addEventListener("click", function () {
    selectSize(this);
  });
});


function buyNow() {
  const size = document.querySelector("#sizeOptions .active").innerText;
  const price = parseFloat(document.querySelector("#sizeOptions .active").dataset.price);
  const qty = parseInt(document.getElementById("qty").value);
  const total = price * qty;

  document.getElementById("summarySize").innerText = size;
  document.getElementById("summaryQty").innerText = qty;
  document.getElementById("summaryTotal").innerText = `$${total}`;

  const modal = new bootstrap.Modal(document.getElementById('buyNowModal'));
  modal.show();
}
