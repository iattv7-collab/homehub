/* public/js/services/firebase-service.js */
/* HOMEHUB Firebase initialization */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvhORZ6HqMFLj5ncw7DGwvi0r18Kk2Q8M",
  authDomain: "homedex-hub.firebaseapp.com",
  projectId: "homedex-hub",
  storageBucket: "homedex-hub.firebasestorage.app",
  messagingSenderId: "559353327036",
  appId: "1:559353327036:web:eba76b2fc54334de4e8fb9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);