window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const backToTopBtn = document.getElementById("backToTop");

  // Header scroll effect
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");

  // Back to top visibility
  if (window.scrollY > 200) backToTopBtn?.classList.add("show");
  else backToTopBtn?.classList.remove("show");
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* -------- Reveal on Scroll -------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal-up").forEach((el) => io.observe(el));

/* -------- Animated Counters -------- */
const counters = document.querySelectorAll(".impact .num");
const co = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute("data-target"), 10) || 0;
      const duration = 1200; // ms
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const val = Math.floor(eased * target);
        el.textContent = val.toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      co.unobserve(el);
    });
  },
  { threshold: 0.35 }
);

counters.forEach((n) => co.observe(n));

