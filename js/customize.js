// js/customize.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const selected = params.get("pizza");

  if (selected) {
    const radio = document.querySelector(`input[name="pizza"]#${CSS.escape(selected)}`);
    if (radio) {
      radio.checked = true;
      // Optional: fire change event if other logic depends on it
      radio.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  // --- EXISTING CODE: handle form submission ---
  document.getElementById("pizzaForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {};

    // Single-value inputs
    ["pizza", "size", "crust", "first_name", "last_name", "email", "phone", "message"].forEach(
      (key) => {
        data[key] = formData.get(key) || "";
      }
    );

    // Toppings (multiple checkboxes with same name="toppings")
    const toppings = formData.getAll("toppings");
    data.toppings = toppings;

    localStorage.setItem("pizzaOrder", JSON.stringify(data));
    window.location.href = "order.html";
  });
});
