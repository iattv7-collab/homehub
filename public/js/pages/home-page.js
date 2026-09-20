/* public/js/pages/home-page.js */
/* HOMEHUB home page */

import { watchAuth, logout } from "../services/auth-service.js";

const DAVIE = { lat: 26.0765, lon: -80.2521 };

function firstName(user) {
  const display = user?.displayName?.trim();
  if (display) return display.split(" ")[0];

  const local = (user?.email || "there").split("@")[0];
  return local.charAt(0).toUpperCase() + local.slice(1);
}

function greetingWord(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatNow(date = new Date()) {
  return date.toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

function weatherIcon(code) {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

function setNetworkStatus() {
  const state = document.getElementById("network-state");
  const detail = document.getElementById("network-detail");
  if (!state || !detail) return;

  if (navigator.onLine) {
    state.textContent = "Online";
    detail.textContent = "This device is connected";
  } else {
    state.textContent = "Offline";
    detail.textContent = "Waiting for Wi-Fi";
  }
}

async function loadWeather() {
  const tempEl = document.getElementById("weather-temp");
  const iconEl = document.getElementById("weather-icon");
  const labelEl = document.getElementById("weather-label");
  if (!tempEl || !iconEl || !labelEl) return;

  try {
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${DAVIE.lat}&longitude=${DAVIE.lon}` +
      "&current=temperature_2m,weather_code" +
      "&temperature_unit=fahrenheit" +
      "&timezone=America%2FNew_York";

    const response = await fetch(url);
    if (!response.ok) throw new Error("weather");

    const data = await response.json();
    const temp = Math.round(data.current.temperature_2m);
    tempEl.textContent = `${temp}°`;
    iconEl.textContent = weatherIcon(data.current.weather_code);
    labelEl.textContent = "Davie, Florida";
  } catch {
    tempEl.textContent = "—";
    iconEl.textContent = "—";
    labelEl.textContent = "Davie, Florida";
  }
}

async function handleSignOut(event) {
  event.preventDefault();
  await logout();
  window.location.href = "/pages/auth/login.html";
}

export function initializeHomePage() {
  watchAuth((user) => {
    if (!user) return;

    const name = firstName(user);
    const title = document.getElementById("greeting-title");
    const sub = document.getElementById("greeting-sub");
    const userName = document.getElementById("user-name");
    const userStatus = document.getElementById("user-status");

    if (title) title.textContent = `${greetingWord()}, ${name}`;
    if (sub) sub.textContent = formatNow();
    if (userName) userName.textContent = user.displayName || user.email || "Signed in";
    if (userStatus) userStatus.textContent = "Signed in";
  });

  setNetworkStatus();
  window.addEventListener("online", setNetworkStatus);
  window.addEventListener("offline", setNetworkStatus);

  document.getElementById("sign-out")?.addEventListener("click", handleSignOut);
  document.getElementById("sign-out-mobile")?.addEventListener("click", handleSignOut);

  loadWeather();
}
