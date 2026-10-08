/**
 * TekVex Labs — catalog rendering
 * ---------------------------------------------------------------------------
 * DOM-based catalog rendering for the home and products pages.
 * Product data is treated as data, not HTML, so catalog content cannot become
 * executable markup through accidental characters in products.js.
 */
(function () {
  "use strict";

  function addClass(el, className) {
    className.split(" ").forEach(function (name) {
      if (name) el.classList.add(name);
    });
  }

  function createCorner(className) {
    const corner = document.createElement("span");
    addClass(corner, "corner " + className);
    corner.setAttribute("aria-hidden", "true");
    return corner;
  }

  function createProductCard(product) {
    const article = document.createElement("article");
    addClass(article, "bracket-frame product-card");
    ["tl", "tr", "bl", "br"].forEach(function (corner) {
      article.appendChild(createCorner(corner));
    });

    const top = document.createElement("div");
    top.className = "product-card-top";
    const category = document.createElement("span");
    addClass(category, "mono-label mono-label--accent");
    category.textContent = product.category;
    top.appendChild(category);
    article.appendChild(top);

    const title = document.createElement("h3");
    title.textContent = product.name;
    article.appendChild(title);

    const description = document.createElement("p");
    description.textContent = product.shortDescription;
    article.appendChild(description);

    const meta = document.createElement("div");
    meta.className = "product-card-meta";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = product.price;
    meta.appendChild(price);

    const level = document.createElement("span");
    level.className = "product-level";
    level.textContent = product.level;
    meta.appendChild(level);
    article.appendChild(meta);

    const link = document.createElement("a");
    addClass(link, "btn btn-secondary btn-block");
    link.style.marginTop = "0.75rem";
    link.href = "product.html?slug=" + encodeURIComponent(product.slug);
    link.textContent = "View Product";
    link.dataset.trackView = product.id;
    link.addEventListener("click", function () {
      if (window.TekVexAnalytics) {
        window.TekVexAnalytics.trackEvent("view_product", { id: product.id });
      }
    });
    article.appendChild(link);

    return article;
  }

  function renderGrid(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid || typeof TEKVEX_PRODUCTS === "undefined") return;

    const fragment = document.createDocumentFragment();
    TEKVEX_PRODUCTS.forEach(function (product) {
      fragment.appendChild(createProductCard(product));
    });

    grid.replaceChildren(fragment);
  }

  function createCheckoutLink(product, className, label) {
    const link = document.createElement("a");
    addClass(link, className);
    link.textContent = label;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const checkoutUrl = window.TekVexSite
      ? window.TekVexSite.getSafeCheckoutUrl(product.checkoutUrl)
      : "";

    if (!checkoutUrl) {
      link.href = "#";
      link.setAttribute("aria-disabled", "true");
      link.title = "Checkout not yet configured";
      link.addEventListener("click", function (event) {
        event.preventDefault();
      });
      return link;
    }

    link.href = checkoutUrl;
    link.dataset.checkoutUrl = checkoutUrl;
    link.addEventListener("click", function () {
      if (window.TekVexAnalytics) {
        window.TekVexAnalytics.trackEvent("checkout_redirect", { product: product.id });
      }
    });
    return link;
  }

  function renderFeaturedProduct() {
    const panel = document.getElementById("featured-product");
    if (!panel || typeof getFeaturedProduct !== "function") return;

    const product = getFeaturedProduct();
    panel.replaceChildren();
    ["tl", "tr", "bl", "br"].forEach(function (corner) {
      panel.appendChild(createCorner(corner));
    });

    const copy = document.createElement("div");
    copy.className = "featured-copy";

    const category = document.createElement("span");
    addClass(category, "mono-label mono-label--accent");
    category.textContent = product.category;
    copy.appendChild(category);

    const title = document.createElement("h3");
    title.textContent = product.name;
    copy.appendChild(title);

    const description = document.createElement("p");
    description.textContent = product.description;
    copy.appendChild(description);

    const list = document.createElement("ul");
    list.className = "featured-list";
    product.included.slice(0, 4).forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    copy.appendChild(list);

    const priceRow = document.createElement("div");
    priceRow.className = "featured-price-row";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = product.price;
    priceRow.appendChild(price);
    priceRow.appendChild(createCheckoutLink(product, "btn btn-primary", "Get Access"));

    const details = document.createElement("a");
    details.className = "btn btn-ghost";
    details.href = "product.html?slug=" + encodeURIComponent(product.slug);
    details.textContent = "View Details";
    priceRow.appendChild(details);
    copy.appendChild(priceRow);
    panel.appendChild(copy);

    const visual = document.createElement("div");
    visual.className = "featured-visual";
    visual.setAttribute("aria-hidden", "true");
    const mark = document.createElement("span");
    mark.className = "featured-visual-mark";
    mark.textContent = product.slug;
    visual.appendChild(mark);
    panel.appendChild(visual);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderGrid("product-grid");
    renderGrid("product-grid-full");
    renderFeaturedProduct();
  });
})();
