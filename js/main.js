/**
 * TekVex — Site-wide behavior
 * ---------------------------------------------------------------------------
 * Shared across every page: header scroll state, mobile navigation,
 * analytics event stubs, and small progressive-enhancement touches.
 *
 * No external dependencies. No inline event handlers in HTML (avoids
 * unnecessary innerHTML/eval-adjacent patterns and keeps CSP-friendliness
 * straightforward if a Content-Security-Policy is added later).
 */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * CONFIG
   * If TekVex ever moves to a different primary domain, update SITE_URL
   * here. It is used only for future dynamic canonical/OG generation and
   * does not need to match anything today unless you wire it up.
   * ------------------------------------------------------------------- */
  const SITE_URL = "https://tekvexloja.com";

  // Placeholder — replace with the real WhatsApp business link
  // (format: https://wa.me/<countrycode+number>) when available.
  const WHATSAPP_URL = "WHATSAPP_URL_HERE";

  /* ---------------------------------------------------------------------
   * ANALYTICS STUBS
   * Centralized event tracking function. Currently logs to the console
   * only — no third-party script is loaded by default, so nothing is
   * sent anywhere until this is wired up intentionally.
   *
   * To connect Google Analytics (GA4):
   *   1. Add the gtag.js snippet in the <head> of each page.
   *   2. Replace the console.log below with: gtag('event', eventName, payload);
   *
   * To connect Meta Pixel:
   *   1. Add the Meta Pixel base snippet in the <head> of each page.
   *   2. Replace/extend the console.log below with: fbq('trackCustom', eventName, payload);
   * ------------------------------------------------------------------- */
  function trackEvent(eventName, payload) {
    payload = payload || {};
    // eslint-disable-next-line no-console
    console.info("[TekVex Analytics]", eventName, payload);

    // --- GA4 integration point (inactive until gtag.js is added) ---
    // if (typeof gtag === "function") {
    //   gtag("event", eventName, payload);
    // }

    // --- Meta Pixel integration point (inactive until fbq is added) ---
    // if (typeof fbq === "function") {
    //   fbq("trackCustom", eventName, payload);
    // }
  }

  // Expose globally so product pages (Phase 2) can call it too,
  // e.g. trackEvent('view_product', { id: 'qubes-starter' })
  window.TekVexAnalytics = { trackEvent: trackEvent };

  /* ---------------------------------------------------------------------
   * HEADER SCROLL STATE
   * Adds a background/border once the page has scrolled past the hero
   * top, so the fixed header stays legible over any content.
   * ------------------------------------------------------------------- */
  function initHeaderScrollState() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const SCROLL_THRESHOLD = 12;
    let ticking = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update(); // set initial state on load (e.g. mid-page refresh)
  }

  /* ---------------------------------------------------------------------
   * MOBILE NAVIGATION
   * Simple, accessible toggle: manages aria-expanded on the trigger and
   * visibility on the panel. Closes on link click or Escape key.
   * ------------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const panel = document.querySelector(".nav-mobile");
    if (!toggle || !panel) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
    }

    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
    }

    toggle.addEventListener("click", function () {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------------------
   * WHATSAPP CONTACT BUTTON
   * Opens in a new tab, never loses the referring page, and fires an
   * analytics event before navigating.
   * ------------------------------------------------------------------- */
  function initWhatsApp() {
    const triggers = document.querySelectorAll("[data-whatsapp-trigger]");
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      trigger.setAttribute("href", WHATSAPP_URL);
      trigger.setAttribute("target", "_blank");
      trigger.setAttribute("rel", "noopener noreferrer");

      trigger.addEventListener("click", function () {
        trackEvent("click_whatsapp", { source: window.location.pathname });
      });
    });
  }

  /* ---------------------------------------------------------------------
   * BUY / CHECKOUT BUTTONS
   * Any element with [data-checkout-url] redirects to that URL on click,
   * after firing a checkout_redirect analytics event. Buttons pointing at
   * the unconfigured "STRIPE_CHECKOUT_URL_HERE" placeholder are disabled
   * so nothing breaks (or silently fails) before Stripe is wired up.
   * ------------------------------------------------------------------- */
  function initCheckoutButtons() {
    const buttons = document.querySelectorAll("[data-checkout-url]");
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      const url = button.getAttribute("data-checkout-url");

      if (!url || url === "STRIPE_CHECKOUT_URL_HERE") {
        button.setAttribute("aria-disabled", "true");
        button.setAttribute("title", "Checkout not yet configured");
        button.addEventListener("click", function (event) {
          event.preventDefault();
        });
        return;
      }

      button.addEventListener("click", function () {
        trackEvent("checkout_redirect", { url: url });
      });
    });
  }

  /* ---------------------------------------------------------------------
   * FOOTER YEAR
   * Keeps the copyright year correct without manual edits.
   * ------------------------------------------------------------------- */
  function initFooterYear() {
    const el = document.querySelector("[data-current-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------------
   * INIT
   * ------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScrollState();
    initMobileNav();
    initWhatsApp();
    initCheckoutButtons();
    initFooterYear();
  });

  // Exposed for reuse on other pages (e.g. products.html, product template)
  window.TekVexSite = { SITE_URL: SITE_URL };
})();
