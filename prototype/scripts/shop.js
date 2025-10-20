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

// Smooth scroll for category links
document.querySelectorAll(".category-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// Section reveal animations
const sections = document.querySelectorAll(".shop-section");
const fadeOptions = {
  threshold: 0.2,
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, fadeOptions);

sections.forEach((section) => {
  revealOnScroll.observe(section);
});

// Fade-up animation for product cards
const fadeUpItems = document.querySelectorAll(".fade-up");
const cardObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

fadeUpItems.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.7s ease";
  cardObserver.observe(card);
});
