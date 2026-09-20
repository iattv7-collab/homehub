/* public/js/modules/apps/app-launcher.js */
/* HOMEHUB application launcher */

const APP_FALLBACKS = {
  google: "https://play.google.com/store/apps/details?id=com.google.android.apps.chromecast.app",
  nest: "https://play.google.com/store/apps/details?id=com.nest.android",
  smartthings: "https://play.google.com/store/apps/details?id=com.samsung.android.oneconnect",
  myq: "https://play.google.com/store/apps/details?id=com.chamberlain.android.liftmaster.myq",
  philips: "https://play.google.com/store/apps/details?id=com.conex.philips",
};

function launchApp(appKey) {
  if (appKey === "nest") {
    window.location.href = APP_FALLBACKS.nest;
    return;
  }

  if (window.HomeHubAndroid?.launchApp) {
    window.HomeHubAndroid.launchApp(appKey);
    return;
  }

  const fallback = APP_FALLBACKS[appKey];
  if (fallback) window.location.href = fallback;
}

export function initializeAppLauncher() {
  document
    .querySelector('[data-launch="google-camera"]')
    ?.addEventListener("click", () => launchApp("google"));

  document
    .querySelector('[data-launch="google-thermostat"]')
    ?.addEventListener("click", () => launchApp("nest"));

  document
    .querySelector('[data-launch="smartthings-appliances"]')
    ?.addEventListener("click", () => launchApp("smartthings"));

  document
    .querySelector('[data-launch="myq-garage"]')
    ?.addEventListener("click", () => launchApp("myq"));

  document
    .querySelector('[data-launch="philips-door"]')
    ?.addEventListener("click", () => launchApp("philips"));
}
