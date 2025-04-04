# FzForm + Bootstrap Integration

FzForm uses Bootstrap 5 class conventions (`form-control`, `form-group`, `is-valid`, etc.) to provide familiar styling for forms. However, **it does not include Bootstrap by default**, so the developer must explicitly register the styles.

This design ensures:
- Smaller bundle size
- No duplication if the app already includes Bootstrap
- Full control by the host application

---

## 🔧 Integration Methods

You have **3 supported ways** to register Bootstrap styles into FzForm:

### ✅ 1. Register CSS via JS imports

**If you import Bootstrap via JS in your app (e.g. using Vite/Webpack):**

```ts
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'
import iconsCss from 'bootstrap-icons/font/bootstrap-icons.css'
import { FzForm } from 'formulizer'

FzForm.registerBootstrap(bootstrapCss, iconsCss)
```

This is the recommended method when you're already using Bootstrap in a modular way.

---

### ✅ 2. Reuse existing `<link>` in HTML

If your app includes Bootstrap via a `<link>` tag in HTML:

```html
<link rel="stylesheet" href="/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/bootstrap-icons.css">
```

Then register it with:

```ts
FzForm.registerBootstrapFromLinks(
  'link[href*="bootstrap.min.css"]',
  'link[href*="bootstrap-icons"]'
)
```

This reuses the already-loaded `CSSStyleSheet` objects and injects them into all FzForm fields.

---

### ✅ 3. Load Bootstrap from CDN (fallback)

If no styles are registered, you can let FzForm load Bootstrap automatically:

```ts
await FzForm.registerBootstrapCDN()
```

This will inject the following:
- Bootstrap 5.3.2 from jsDelivr
- Bootstrap Icons 1.10.5

> ⚠️ Warning: not recommended for production. Use as fallback only.

---

## ❓ Did Bootstrap Register?

Check:

```ts
if (!FzForm.isBootstrapRegistered()) {
  console.warn("No Bootstrap styles registered")
}
```

---

## 📌 Content Security Policy (CSP) Notes

If your app uses a strict CSP (Content Security Policy), and the browser does not support `adoptedStyleSheets`, Lit falls back to injecting `<style>` tags.

In this case, you must:

- Set `window.litNonce` to match your server-generated nonce:

```html
<script>
  window.litNonce = 'abc123xyz'
</script>
```

- Or allow `'unsafe-inline'` in `style-src` (not recommended)

```http
Content-Security-Policy: style-src 'self' 'unsafe-inline'
```

> Lit will automatically apply `nonce` to `<style>` tags if `window.litNonce` is set.

---

## 🧠 Best Practices

| Situation                        | Use This                            |
|----------------------------------|-------------------------------------|
| Importing Bootstrap via JS       | `registerBootstrap()`               |
| Using `<link>` tags in HTML      | `registerBootstrapFromLinks()`      |
| No Bootstrap setup (testing/dev) | `registerBootstrapCDN()`            |
| App doesn't use Bootstrap        | Fallback loading bootstrap from CDN |

---

## 🔍 Example Full Setup

```ts
import { FzForm } from 'formulizer'

FzForm.registerBootstrapFromLinks(
  'link[href*="bootstrap.min.css"]',
  'link[href*="bootstrap-icons"]'
)

// OR

import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'
FzForm.registerBootstrap(bootstrapCss)

// OR

await FzForm.registerBootstrapCDN()
```

Done properly, all FzForm fields (`fz-form`, `fz-string`, `fz-boolean`, etc.) will render with Bootstrap 5 styling, validation feedback, layout, and responsiveness.

---

Need help? Encounter CSP issues or shadow DOM styling problems? Ask for guidance on registering styles explicitly before rendering your first form.

