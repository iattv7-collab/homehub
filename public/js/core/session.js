/* public/js/core/session.js */
/* HOMEHUB session helpers */

export function displayNameFromUser(user) {
  if (!user) return "Signed in";
  if (user.displayName && user.displayName.trim()) return user.displayName.trim();
  return user.email || "Signed in";
}