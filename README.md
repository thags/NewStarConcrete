# New Star Concrete Pumping

A four-page static site for New Star Concrete Pumping. It runs directly on GitHub Pages without a build process. Pages are in `index.html`, `concrete-pumping/`, `gallery/`, and `contact-us/`. Photos and the logo (`assets/logo.jpg`, also used as the favicon) are in `assets/`.

## Contact form setup

Edit only `site-config.js` to choose the FormSubmit recipient:

```js
window.siteConfig = {
  formSubmitRecipient: "your-email@example.com"
};
```

You can also use a 32-character FormSubmit invisible-email token as `formSubmitRecipient`. The form posts to FormSubmit's AJAX endpoint and displays submission status inline. A token keeps the receiving mailbox address out of the page source. The public contact email (Nscpumping@gmail.com) is written directly in the HTML on the contact page and in each page's footer. An empty or invalid value hides the form. The mailbox owner must confirm FormSubmit's activation email for a new address. A local preview cannot verify delivery; test with a real submission.

## Local preview

Run `make dev` from this directory and open `http://localhost:8000/`. Use `make dev PORT=3000` to pick another port.

## GitHub Pages

1. Push updates to the repository's default branch. GitHub Pages publishes from `/ (root)` on that branch.
2. Visit the Pages URL listed under **Settings → Pages** after publishing finishes. Links and asset paths are relative, so the site works at a project URL.
3. To change the contact form recipient, edit `site-config.js` and push the change. Submit a test inquiry to verify delivery.

If you later connect the existing domain, configure it in the repository's Pages settings and update DNS as instructed by GitHub. The repo does not include a `CNAME` file while it uses the project URL.
