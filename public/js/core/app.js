/* public/js/core/app.js */
/* HOMEHUB application bootstrap */

import { requireAuth } from "./auth-guard.js";
import { initializeAppLauncher } from "../modules/apps/app-launcher.js";

requireAuth();

initializeAppLauncher();

console.log("HOMEHUB loaded.");