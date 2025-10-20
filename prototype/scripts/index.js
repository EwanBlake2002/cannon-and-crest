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
