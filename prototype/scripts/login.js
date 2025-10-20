// Toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Simulate login
const form = document.getElementById("loginForm");
const loadingText = document.getElementById("loginLoading");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadingText.classList.add("active");
  loadingText.textContent = "Logging you in...";

  setTimeout(() => {
    loadingText.textContent = "Welcome back, Gunner!";
  }, 1500);

  setTimeout(() => {
    window.location.href = "index.html"; // simulate home redirect
  }, 3000);
});
