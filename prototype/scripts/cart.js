document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) backToTopBtn.classList.add("show");
      else backToTopBtn.classList.remove("show");
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Reveal up observer */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal-up").forEach((el) => io.observe(el));


  const cartItemsEl = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");
  const subtotalEl = document.getElementById("summarySubtotal");
  const totalEl = document.getElementById("summaryTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Empty by default
  let cart = []; // each item: { id, name, variant, price, qty, image }

  // Helpers
  const formatGBP = (n) => `£${n.toFixed(2)}`;

  function calcTotals() {
    const subtotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);
    subtotalEl.textContent = formatGBP(subtotal);
    totalEl.textContent = formatGBP(subtotal); 
    checkoutBtn.disabled = cart.length === 0 || subtotal <= 0;
  }

  function render() {
    cartItemsEl.querySelectorAll(".cart-row").forEach((n) => n.remove());

    if (!cart.length) {
      emptyEl.style.display = "block";
      calcTotals();
      updateHeaderCartCount(0);
      return;
    }

    emptyEl.style.display = "none";

    cart.forEach((item) => {
      const row = document.createElement("article");
      row.className = "cart-row";

      row.innerHTML = `
        <div class="cart-thumb">
          <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="cart-info">
          <h4>${item.name}</h4>
          <div class="cart-meta">${
            item.variant || "Standard"
          } &middot; ${formatGBP(item.price)}</div>
          <div class="cart-right">
            <div class="qty" data-id="${item.id}">
              <button class="qty-minus" aria-label="Decrease quantity">–</button>
              <input type="text" class="qty-input" value="${
                item.qty
              }" inputmode="numeric" />
              <button class="qty-plus" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-price" data-id="${item.id}">${formatGBP(
        item.price * item.qty
      )}</div>
          </div>
        </div>

        <div class="cart-price desktop-only">${formatGBP(item.price)}</div>

        <button class="cart-remove" data-id="${
          item.id
        }" aria-label="Remove item">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;

      cartItemsEl.appendChild(row);
    });

    calcTotals();
    updateHeaderCartCount(cart.reduce((n, it) => n + it.qty, 0));
  }

  function updateHeaderCartCount(count) {
    const link = document.querySelector('.header-actions a[href$="cart.html"]');
    if (link) link.textContent = `Cart (${count})`;
  }

  // Quantity/Remove handlers (event delegation)
  cartItemsEl.addEventListener("click", (e) => {
    const minus = e.target.closest(".qty-minus");
    const plus = e.target.closest(".qty-plus");
    const remove = e.target.closest(".cart-remove");

    if (minus || plus) {
      const qtyWrap = e.target.closest(".qty");
      const id = qtyWrap?.dataset.id;
      if (!id) return;
      const item = cart.find((i) => String(i.id) === String(id));
      if (!item) return;

      if (minus) item.qty = Math.max(1, item.qty - 1);
      if (plus) item.qty += 1;

      render();
    }

    if (remove) {
      const id = remove.dataset.id;
      cart = cart.filter((i) => String(i.id) !== String(id));
      // slide-out animation
      const row = remove.closest(".cart-row");
      if (row) {
        row.style.transition = "transform 260ms ease, opacity 260ms ease";
        row.style.transform = "translateX(8px)";
        row.style.opacity = "0";
        setTimeout(render, 260);
      } else {
        render();
      }
    }
  });

  // Manual input change
  cartItemsEl.addEventListener("input", (e) => {
    const input = e.target.closest(".qty-input");
    if (!input) return;
    const wrap = input.closest(".qty");
    const id = wrap?.dataset.id;
    const item = cart.find((i) => String(i.id) === String(id));
    if (!item) return;

    let val = parseInt(input.value.replace(/[^\d]/g, ""), 10);
    if (isNaN(val) || val <= 0) val = 1;
    item.qty = val;
    render();
  });

  // Checkout (demo)
  checkoutBtn.addEventListener("click", () => {
    if (checkoutBtn.disabled) return;
    checkoutBtn.textContent = "Processing…";
    checkoutBtn.disabled = true;
    setTimeout(() => {
      alert("Demo checkout — connect this to your backend / payment flow.");
      checkoutBtn.textContent = "Proceed to Checkout";
      checkoutBtn.disabled = cart.length === 0;
    }, 1200);
  });

  
  window.addToCart = function addToCart({
    id,
    name,
    price,
    image,
    variant = "Standard",
    qty = 1,
  }) {
    const existing = cart.find((i) => i.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id, name, price, image, variant, qty });
    render();
  };

  
  render();
});


