// js/pizza-selection.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) Wire the link hrefs so they include the pizza type
  document.querySelectorAll(".pizza-card").forEach(card => {
    const type = card.dataset.pizza; // classic | specialty | vegetarian
    const link = card.querySelector(".card-a");
    if (link && type) {
      link.href = `customize.html?pizza=${encodeURIComponent(type)}`;
    }

    // 2) Make the whole card clickable, but don't hijack carousel controls
    card.style.cursor = "pointer";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const isControlClick = (target) =>
      target.closest(".carousel-control-prev, .carousel-control-next, .carousel-indicators");

    card.addEventListener("click", (e) => {
      if (isControlClick(e.target)) return; // let the carousel arrows/indicators work
      if (link) {
        // persist selection as a bonus (optional)
        sessionStorage.setItem("selectedPizza", type);
        link.click(); // navigate using the prepared href with ?pizza=
      }
    });

    // 3) Keyboard accessibility (Enter/Space)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (link) link.click();
      }
    });
  });
});