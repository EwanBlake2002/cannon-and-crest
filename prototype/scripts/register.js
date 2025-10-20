// Toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Simulate registration
const form = document.getElementById("registerForm");
const loadingText = document.getElementById("registerLoading");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadingText.classList.add("active");
  loadingText.textContent = "Creating new account...";

  setTimeout(() => {
    loadingText.textContent = "Welcome, Gunner!";
  }, 1500);

  setTimeout(() => {
    window.location.href = "index.html"; // simulate home redirect
  }, 3000);
});
