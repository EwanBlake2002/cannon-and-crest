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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("supportForm");
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");
  const successMessage = document.getElementById("successMessage");

  const issueType = document.getElementById("issueType");
  const customIssueWrap = document.getElementById("customIssueWrap");

  const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
    issueType: document.getElementById("issueType"),
  };

  /* ---- Elegant section reveal on view ---- */
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

  /* ---- Toggle custom issue (Other) ---- */
  issueType.addEventListener("change", () => {
    const isOther = issueType.value === "Other";
    customIssueWrap.classList.toggle("open", isOther);
  });

  /* ---- Validation Helpers ---- */
  const showError = (id, message) => {
    const field = document.getElementById(id)?.closest(".field");
    const err = document.getElementById(`err-${id}`);
    if (!field || !err) return;
    field.classList.add("error", "shake");
    err.textContent = message || "Required field";
    setTimeout(() => field.classList.remove("shake"), 240);
  };

  const clearErrors = () => {
    document
      .querySelectorAll(".field.error")
      .forEach((f) => f.classList.remove("error"));
    document
      .querySelectorAll(".error-msg")
      .forEach((e) => (e.textContent = ""));
  };

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  /* ---- Submit ---- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    let ok = true;
    if (!fields.issueType.value) {
      showError("issueType", "Please select a category");
      ok = false;
    }
    if (!fields.firstName.value.trim()) {
      showError("firstName", "Please enter your first name");
      ok = false;
    }
    if (!fields.lastName.value.trim()) {
      showError("lastName", "Please enter your last name");
      ok = false;
    }
    if (!fields.email.value.trim() || !validEmail(fields.email.value.trim())) {
      showError("email", "Please enter a valid email");
      ok = false;
    }
    if (
      !fields.message.value.trim() ||
      fields.message.value.trim().length < 8
    ) {
      showError("message", "Please enter a message (8+ chars)");
      ok = false;
    }

    if (!ok) return;

    // Show loading on button
    submitBtn.classList.add("btn-loading");

    // Simulate sending
    setTimeout(() => {
      // Hide form, show success
      form.style.display = "none";
      successMessage.style.display = "block";
      requestAnimationFrame(() => {
        successMessage.classList.add("show");
      });

      // Redirect after a short pause
      setTimeout(() => {
        window.location.href = "/prototype/html/index.html";
      }, 2200);
    }, 1200);
  });

  /* ---- Reset ---- */
  resetBtn.addEventListener("click", () => {
    clearErrors();
    customIssueWrap.classList.remove("open");
  });
});
