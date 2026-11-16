(() => {
  const recipient = (window.siteConfig?.formSubmitRecipient || "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient);
  const validToken = /^[a-f0-9]{32}$/i.test(recipient);

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

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
  if (form && (validEmail || validToken)) {
    form.hidden = false;
    if (formUnavailable) formUnavailable.hidden = true;

    const submitButton = form.querySelector('button[type="submit"]');
    const status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.hidden = true;
    form.append(status);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (submitButton.disabled) return;

      submitButton.disabled = true;
      status.hidden = false;
      status.dataset.state = "sending";
      status.textContent = "Sending your inquiry...";

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const result = await response.json();
        if (!response.ok || (result.success !== true && result.success !== "true")) {
          throw new Error("FormSubmit did not confirm delivery");
        }

        form.reset();
        status.dataset.state = "success";
        status.textContent = "Thanks! Your inquiry was sent. We'll be in touch soon.";
      } catch {
        status.dataset.state = "error";
        status.textContent = "Your inquiry could not be sent. Please try again or call 214-994-4263.";
      } finally {
        submitButton.disabled = false;
      }
    });
  }
})();
