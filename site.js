(() => {
  const email = (window.siteConfig?.contactEmail || "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    if (validEmail) {
      link.href = `mailto:${email}`;
      link.textContent = email;
      link.hidden = false;
    }
  });
  if (validEmail) {
    document.querySelectorAll("[data-email-fallback]").forEach((node) => {
      node.hidden = true;
    });
  }

  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
    });
  }

  const form = document.querySelector("[data-contact-form]");
  const formUnavailable = document.querySelector("[data-form-unavailable]");
  if (form && validEmail) {
    form.action = `https://formsubmit.co/${encodeURIComponent(email)}`;
    form.hidden = false;
    if (formUnavailable) formUnavailable.hidden = true;
  }
})();
