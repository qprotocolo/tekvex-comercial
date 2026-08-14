/**
 * TekVex Labs — Product Data
 * ---------------------------------------------------------------------------
 * Single source of truth for all TekVex Labs digital products.
 *
 * This file is intentionally framework-free and dependency-free so it can be
 * loaded on any page (home, products listing, individual product pages)
 * without a build step.
 *
 * STRIPE INTEGRATION (IMPORTANT — READ BEFORE EDITING):
 * Each product has a `stripeCheckoutUrl` field. This is a PLACEHOLDER.
 * - Do NOT put Stripe secret keys anywhere in this file or in any frontend file.
 * - Do NOT build a custom card form. All payment collection happens on
 *   Stripe's own hosted Checkout page.
 * - When a real Stripe Payment Link / Checkout Session URL exists for a
 *   product, replace the string "STRIPE_CHECKOUT_URL_HERE" with that URL.
 *   Nothing else needs to change — every "Get Access" / "View Product"
 *   button reads from this field automatically.
 */

const TEKVEX_PRODUCTS = [
  {
    id: "qubes-starter",
    slug: "qubes-os-starter-lab",
    name: "Qubes OS Starter Lab",
    category: "Cybersecurity",
    level: "Beginner–Intermediate",
    price: "$29",
    priceValue: 29,
    currency: "USD",
    featured: true, // Shown in the "Featured Lab" section on the homepage
    shortDescription:
      "A practical introduction to compartmentalization, isolation and secure workstation architecture using Qubes OS.",
    description:
      "Learn the fundamentals of compartmentalization and secure workstation architecture through a practical Qubes OS laboratory. This lab walks through the reasoning behind Qubes' security model and gives you a structured, hands-on path to building an isolated, compartmentalized computing environment — not just a list of commands to copy.",
    audience:
      "Built for people who already understand basic Linux usage and want to move into security-focused system architecture: developers, sysadmins, security-conscious professionals, and privacy-focused technical users. This is not an introductory Linux course.",
    requirements: [
      "A computer that supports hardware virtualization (Intel VT-x/VT-d or AMD-V/AMD-Vi)",
      "Comfort with the Linux command line",
      "At least 16GB of RAM recommended for a comfortable lab environment",
      "No prior Qubes OS experience required",
    ],
    learn: [
      {
        title: "Compartmentalization",
        detail: "The security model behind isolating tasks into separate domains.",
      },
      {
        title: "Qubes Architecture",
        detail: "How the Xen-based hypervisor structure underlies the whole system.",
      },
      {
        title: "AppVMs and TemplateVMs",
        detail: "How disposable and persistent VMs relate, and how to structure your own.",
      },
      {
        title: "Networking Architecture",
        detail: "How network traffic is routed and isolated between qubes.",
      },
      {
        title: "Isolation Concepts",
        detail: "Practical boundaries between identities, projects and trust levels.",
      },
      {
        title: "Practical Security Configuration",
        detail: "Hardening choices and configuration decisions, explained and justified.",
      },
    ],
    included: [
      "Technical guide (PDF)",
      "Practical laboratory walkthrough",
      "Configuration checklist",
      "Hands-on exercises",
      "Reference material and command index",
      "Future updates included",
    ],
    faq: [
      {
        q: "Do I need to be a security expert to start?",
        a: "No. You need to be comfortable in a Linux terminal. The lab explains the security reasoning as it goes, not just the steps.",
      },
      {
        q: "Does this replace official Qubes OS documentation?",
        a: "No. It's a structured, practical companion that gets you from install to a working compartmentalized setup faster, with context the official docs assume you already have.",
      },
      {
        q: "Is this a video course?",
        a: "No. It's a written technical guide and lab, designed to be followed at your own pace and referenced later.",
      },
    ],
    stripeCheckoutUrl: "STRIPE_CHECKOUT_URL_HERE",
  },
  {
    id: "linux-security",
    slug: "linux-security-lab",
    name: "Linux Security Lab",
    category: "Linux / Security",
    level: "Intermediate",
    price: "$39",
    priceValue: 39,
    currency: "USD",
    featured: false,
    shortDescription:
      "Hands-on material for understanding Linux hardening, permissions, processes and system security.",
    description:
      "A structured, practical path through Linux system security: permission models, process isolation, service hardening and the reasoning behind common hardening checklists — so you understand why each step matters, not just what to run.",
    audience:
      "For Linux users who want to move from 'it works' to 'I understand why it's secure' — sysadmins, backend developers, and technically-minded privacy users.",
    requirements: [
      "Working knowledge of the Linux command line",
      "A Linux system (VM or physical) to practice on",
      "No prior formal security training required",
    ],
    learn: [
      { title: "Permission Models", detail: "Users, groups, and the principle of least privilege in practice." },
      { title: "Process Isolation", detail: "How processes are contained and what breaks that containment." },
      { title: "Service Hardening", detail: "Reducing attack surface on running services." },
      { title: "System Auditing", detail: "Identifying what's actually exposed on a running system." },
    ],
    included: [
      "Technical guide (PDF)",
      "Hardening checklist",
      "Hands-on exercises",
      "Reference material",
      "Future updates included",
    ],
    faq: [
      {
        q: "Is this distribution-specific?",
        a: "The core concepts apply across distributions; examples are shown on widely-used systems and noted where behavior differs.",
      },
    ],
    stripeCheckoutUrl: "STRIPE_CHECKOUT_URL_HERE",
  },
  {
    id: "cybersecurity-foundations",
    slug: "cybersecurity-foundations-lab",
    name: "Cybersecurity Foundations Lab",
    category: "Cybersecurity",
    level: "Beginner",
    price: "$49",
    priceValue: 49,
    currency: "USD",
    featured: false,
    shortDescription:
      "A structured practical laboratory covering fundamental security concepts, attack surfaces and defensive thinking.",
    description:
      "A ground-up laboratory covering how attack surfaces form, how defenders reason about risk, and how core security concepts fit together — built to give you a working mental model, not a list of buzzwords.",
    audience:
      "For technical beginners entering security, or developers who want a structured foundation before specializing further.",
    requirements: ["Basic computer literacy", "Curiosity about how systems fail — no prior security background required"],
    learn: [
      { title: "Attack Surface Thinking", detail: "How to identify what's actually exposed in a system." },
      { title: "Defensive Reasoning", detail: "How defenders prioritize and think about risk." },
      { title: "Core Security Concepts", detail: "The vocabulary and models used across the field." },
    ],
    included: ["Technical guide (PDF)", "Practical exercises", "Reference glossary", "Future updates included"],
    faq: [
      {
        q: "Is this a certification?",
        a: "No. This is a self-paced technical resource, not a certification or accredited course.",
      },
    ],
    stripeCheckoutUrl: "STRIPE_CHECKOUT_URL_HERE",
  },
  {
    id: "c-lowlevel",
    slug: "c-low-level-programming-lab",
    name: "C & Low-Level Programming Lab",
    category: "Programming / Low-Level",
    level: "Intermediate",
    price: "$39",
    priceValue: 39,
    currency: "USD",
    featured: false,
    shortDescription:
      "Practical exercises for understanding memory, pointers, compilation, processes and low-level programming concepts.",
    description:
      "A hands-on lab for developers who want to understand what's actually happening beneath high-level languages: memory layout, pointers, compilation stages, and process fundamentals.",
    audience:
      "For programmers with experience in at least one language who want to build a real mental model of how computers execute code.",
    requirements: ["Basic programming experience in any language", "A C compiler (GCC or Clang) installed locally"],
    learn: [
      { title: "Memory Layout", detail: "Stack, heap, and how data is actually organized at runtime." },
      { title: "Pointers", detail: "What a pointer actually is and how to reason about it safely." },
      { title: "Compilation Stages", detail: "From source to binary: preprocessing, compiling, linking." },
      { title: "Processes", detail: "How a program becomes a running process." },
    ],
    included: ["Technical guide (PDF)", "Code exercises", "Reference material", "Future updates included"],
    faq: [
      {
        q: "Do I need to already know C?",
        a: "No. You need general programming experience; C fundamentals are taught from the ground up in the context of the low-level concepts.",
      },
    ],
    stripeCheckoutUrl: "STRIPE_CHECKOUT_URL_HERE",
  },
];

/**
 * Returns the product flagged as `featured: true`.
 * Falls back to the first product if none is explicitly marked, so the
 * homepage never renders empty even if the data changes.
 */
function getFeaturedProduct() {
  return TEKVEX_PRODUCTS.find((product) => product.featured) || TEKVEX_PRODUCTS[0];
}

/**
 * Looks up a single product by its URL slug.
 * Used by individual product pages (Phase 2) to know which product to render.
 */
function getProductBySlug(slug) {
  return TEKVEX_PRODUCTS.find((product) => product.slug === slug) || null;
}
