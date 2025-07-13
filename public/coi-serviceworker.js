// Simple service worker for Cross-Origin Isolation
self.addEventListener("install", function (event) {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", function (event) {
  console.log("Service Worker activating.");
});

// Add Cross-Origin Isolation headers if needed
self.addEventListener("fetch", function (event) {
  // Let the browser handle the request normally
  return;
});
