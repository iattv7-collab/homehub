/* public/js/core/auth-guard.js */
/* HOMEHUB authentication guard */

import { watchAuth } from "../services/auth-service.js";

export function requireAuth() {
  watchAuth((user) => {
    if (!user) {
      window.location.href = "/pages/auth/login.html";
    }
  });
}

export function redirectIfAuthenticated() {
  watchAuth((user) => {
    if (user) {
      window.location.href = "/pages/home/home.html";
    }
  });
}