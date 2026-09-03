/* public/js/pages/login-page.js */
/* HOMEHUB login page controller */

import { login } from "../services/auth-service.js";
import { redirectIfAuthenticated } from "../core/auth-guard.js";

redirectIfAuthenticated();

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  errorMessage.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await login(email, password);

    window.location.href = "/pages/home/home.html";
  } catch (error) {
    errorMessage.textContent = "Invalid email or password.";
  }
});