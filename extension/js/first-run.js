"use strict";

/* global enableDataOptOut */

document.addEventListener("DOMContentLoaded", async () => {
  const { fxaOauthFlow } = await browser.storage.local.get("fxaOauthFlow");
  const { relaySiteOrigin } = await browser.storage.local.get("relaySiteOrigin");


  document.addEventListener("focus", () => {
    enableDataOptOut();
  });

  enableDataOptOut();

  // TODO Add FXA params, do metrics flow from extension?
  const openFxaFlow = new URL(fxaOauthFlow, relaySiteOrigin);

  const oauthEntryPoints = document.querySelectorAll(".open-oauth");
  oauthEntryPoints.forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      sendRelayEvent("First Run", "click", e.target.dataset.eventLabel);
      return window.open(openFxaFlow);
    });
  });
});
