export default class Dropdown {
  constructor(selector) {
    this.dropdowns = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.dropdowns.forEach(drop => {
      const trigger = drop.dataset.trigger || "click";
      const toggleBtn = drop.querySelector(".dropdown-toggle");
      const menu = drop.querySelector(".dropdown-menu");

      if (trigger === "click") {
        toggleBtn.addEventListener("click", e => {
          e.stopPropagation();
          this.toggle(menu);
        });
        document.addEventListener("click", () => menu.classList.remove("visible"));
      }

      if (trigger === "hover") {
        drop.addEventListener("mouseenter", () => this.show(menu));
        drop.addEventListener("mouseleave", () => this.hide(menu));
      }
    });
  }

  toggle(menu) {
    menu.classList.toggle("visible");
  }

  show(menu) {
    menu.classList.add("visible");
  }

  hide(menu) {
    menu.classList.remove("visible");
  }
}