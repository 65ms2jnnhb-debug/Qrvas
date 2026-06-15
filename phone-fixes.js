// Phone-only helpers for QVAS static hosting.
// Makes the Electron version behave better as a standalone iPhone web app.
window.electronApp = true; // stops remote /api polling mode from starting on static hosts
window.QVAS_PHONE_ONLY = true;

// Make localhost display window paths work on hosted/static sites.
(function(){
  const originalOpen = window.open;
  window.open = function(url, name, specs) {
    if (typeof url === 'string' && url.includes('localhost:3000/display.html')) url = './display.html';
    return originalOpen.call(window, url, name, specs);
  };
})();

// Static hosts do not have /api/state-update. Ignore those errors.
window.updateAppState = window.updateAppState || function(){ return Promise.resolve(); };
