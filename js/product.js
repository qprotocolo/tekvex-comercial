/**
 * TekVex Labs — Individual Product Page Renderer
 * ---------------------------------------------------------------------------
 * Reads `?slug=` from the URL, looks it up in TEKVEX_PRODUCTS (js/products.js),
 * and renders the full product detail template into #product-root.
 *
 * Security note: the slug is only ever used as a lookup key against a fixed,
 * trusted local array (TEKVEX_PRODUCTS) — it is never written into the DOM
 * or reflected back as HTML, so there is no injection surface from the query
 * string itself. All HTML inserted via innerHTML below comes from our own
 * trusted product data in js/products.js, not from user input.
 */

(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeCheckoutUrl(value) {
    if (!window.TekVexSite || typeof window.TekVexSite.getSafeCheckoutUrl !== "function") return "";
    return window.TekVexSite.getSafeCheckoutUrl(value);
  }

  function getSlugFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
  }

  function setMeta(product) {
    const title = product.name + " — TekVex Labs";
    const description = product.shortDescription;
    const url = "https://www.tekvexloja.com/product.html?slug=" + encodeURIComponent(product.slug);

    document.getElementById("page-title").textContent = title;
    document.getElementById("meta-description").setAttribute("content", description);
    document.getElementById("canonical-link").setAttribute("href", url);
    document.getElementById("og-title-tag").setAttribute("content", title);
    document.getElementById("og-desc-tag").setAttribute("content", description);
    document.getElementById("og-url-tag").setAttribute("content", url);
    document.getElementById("twitter-title-tag").setAttribute("content", title);
    document.getElementById("twitter-desc-tag").setAttribute("content", description);
    document.getElementById("breadcrumb-current").textContent = product.name;
  }

  function bracketFrame(innerHtml, extraClass) {
    return (
      '<div class="bracket-frame' + (extraClass ? " " + extraClass : "") + '">' +
      '<span class="corner tl" aria-hidden="true"></span>' +
      '<span class="corner tr" aria-hidden="true"></span>' +
      '<span class="corner bl" aria-hidden="true"></span>' +
      '<span class="corner br" aria-hidden="true"></span>' +
      innerHtml +
      "</div>"
    );
  }

  function renderProduct(product) {
    const root = document.getElementById("product-root");

    // --- Hero -------------------------------------------------------------
    const checkoutUrl = safeCheckoutUrl(product.checkoutUrl);
    const checkoutDisabled = !checkoutUrl;
    const heroHtml =
      '<div class="product-hero-grid">' +
      "<div>" +
      '<span class="mono-label mono-label--accent">' + escapeHtml(product.category) + "</span>" +
      "<h1 style=\"margin-top: var(--space-4)\">" + escapeHtml(product.name) + "</h1>" +
      '<p class="lede" style="margin-top: var(--space-6)">' + escapeHtml(product.description) + "</p>" +
      "</div>" +
      bracketFrame(
        '<span class="product-price">' +
          escapeHtml(product.price) +
          "</span>" +
          '<a href="' +
          escapeHtml(checkoutUrl) +
          '" class="btn btn-primary btn-block" data-checkout-url="' +
          escapeHtml(checkoutUrl) +
          '" target="_blank" rel="noopener noreferrer">Get Access</a>' +
          '<span class="mono-label" style="display:block; margin-top: var(--space-4)">LEVEL: ' +
          escapeHtml(product.level) +
          "</span>",
        "product-hero-side"
      ) +
      "</div>";

    // --- What you'll learn --------------------------------------------------
    const learnCardsHtml = product.learn
      .map(function (item) {
        return bracketFrame(
          "<h3>" + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.detail) + "</p>",
          "learn-card"
        );
      })
      .join("");

    const learnSectionHtml =
      '<section class="section section--tight">' +
      '<div class="section-header"><span class="mono-label">CURRICULUM</span><h2>What you\'ll learn</h2></div>' +
      '<div class="grid learn-grid">' +
      learnCardsHtml +
      "</div>" +
      "</section>";

    // --- Included / Audience & Requirements (two-column) --------------------
    const includedHtml = product.included
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");

    const requirementsHtml = product.requirements
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");

    const detailsSectionHtml =
      '<section class="section section--tight">' +
      '<div class="grid two-col">' +
      "<div>" +
      '<div class="section-header"><span class="mono-label">WHAT\'S INCLUDED</span></div>' +
      '<ul class="included-list">' +
      includedHtml +
      "</ul>" +
      "</div>" +
      "<div>" +
      '<div class="section-header"><span class="mono-label">REQUIREMENTS</span></div>' +
      '<ul class="requirements-list">' +
      requirementsHtml +
      "</ul>" +
      "</div>" +
      "</div>" +
      '<div style="margin-top: var(--space-16)">' +
      '<div class="section-header"><span class="mono-label">WHO IT\'S FOR</span></div>' +
      "<p class=\"lede\">" + escapeHtml(product.audience) + "</p>" +
      "</div>" +
      "</section>";

    // --- FAQ ------------------------------------------------------------
    const faqHtml = product.faq
      .map(function (item) {
        return bracketFrame("<h3>" + escapeHtml(item.q) + "</h3><p>" + escapeHtml(item.a) + "</p>", "faq-item");
      })
      .join("");

    const faqSectionHtml =
      '<section class="section section--tight">' +
      '<div class="section-header"><span class="mono-label">FAQ</span><h2>Common questions</h2></div>' +
      faqHtml +
      "</section>";

    // --- Final CTA --------------------------------------------------------
    const finalCtaHtml = bracketFrame(
      "<h2>Start Building Your Lab</h2>" +
        '<a href="' +
        escapeHtml(checkoutUrl) +
        '" class="btn btn-primary" data-checkout-url="' +
        escapeHtml(safeCheckoutUrl(product.checkoutUrl)) +
        '" target="_blank" rel="noopener noreferrer">Get Access</a>',
      "final-cta"
    );

    root.innerHTML = heroHtml + learnSectionHtml + detailsSectionHtml + faqSectionHtml + finalCtaHtml;

    // Re-bind checkout buttons rendered dynamically above
    root.querySelectorAll("[data-checkout-url]").forEach(function (btn) {
      const url = btn.getAttribute("data-checkout-url");
      if (!url) {
        btn.setAttribute("aria-disabled", "true");
        btn.setAttribute("title", "Checkout not yet configured");
        btn.addEventListener("click", function (event) {
          event.preventDefault();
        });
      } else {
        btn.addEventListener("click", function () {
          window.TekVexAnalytics.trackEvent("checkout_redirect", { product: product.id });
        });
      }
    });

    if (checkoutDisabled) {
      // Non-blocking console note for the team — not shown to visitors.
      console.info("[TekVex] Checkout URL not yet configured for product:", product.id);
    }
  }

  function renderNotFound() {
    document.getElementById("product-root").hidden = true;
    document.getElementById("breadcrumb").hidden = true;
    document.getElementById("not-found").hidden = false;
    document.getElementById("page-title").textContent = "Product not found — TekVex Labs";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const slug = getSlugFromUrl();
    const product = slug && typeof getProductBySlug === "function" ? getProductBySlug(slug) : null;

    if (!product) {
      renderNotFound();
      return;
    }

    window.TekVexAnalytics && window.TekVexAnalytics.trackEvent("view_product", { id: product.id, source: "product_page" });
    setMeta(product);
    renderProduct(product);
  });
})();
