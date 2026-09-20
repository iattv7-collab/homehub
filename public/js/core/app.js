/* public/js/core/app.js */
/* HOMEHUB application bootstrap */

import { requireAuth } from "./auth-guard.js";
import { initializeAppLauncher } from "../modules/apps/app-launcher.js";
import { initializeHomePage } from "../pages/home-page.js";

requireAuth();
initializeHomePage();
initializeAppLauncher();