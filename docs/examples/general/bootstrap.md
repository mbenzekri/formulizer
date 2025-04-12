## Bootstrap for fz-form

fz-form uses Bootstrap 5 (`form-control`, `form-group`, `is-valid`, etc.) to provide familiar styling for forms. 
However, **it does not include Bootstrap by default**, so the developer must explicitly register the styles.

## 🔧 Integration Methods

fz-form needs bootstrap.css, bootstrap-icons.css and bootstrap-icons.woff Font.
You have **3 supported ways** to register Bootstrap styles into fz-form:

1. Import bootstrap as Constructable Style Sheet and FontFace on your app and provide them to fz-form
1. pass urls to those ressources and let fz-form manage loading and integration
1. just set bootstrap boolean attribute and let fz-form manage loading from CDN

### 1. Register CSS using JS imports

This is the recommended method when you're already using Bootstrap in a modular way.

```js
    import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'
    import iconsCss from 'bootstrap-icons/font/bootstrap-icons.css'
    import iconsWoff from 'bootstrap-icons/font/bootstrap-icons.woff'
    import { FzForm } from 'formulizer'
    FzForm.loadBootstrap(bootstrapCss, iconsCss,iconsWoff)
```


### 2. Use your own urls 
```ts
    const bs_url = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    const icons_url = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
    const woff_url = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/fonts/bootstrap-icons.woff2" 
    FzForm.loadBootstrap(bs_url,icons_url,woff_url)
```

### 3. Load Bootstrap from CDN (fallback)

If no styles are registered, you can let fz-form load Bootstrap automatically: just add `bootstap` attribute to fz-form tg

This will inject the following: Bootstrap 5.3.2 from jsDelivrand Bootstrap Icons 1.10.5 from jsDelivr
> ⚠️ Warning: not recommended for production. Use as fallback only.

```html
    <fz-form bootstrap ...></fz-form>
```

## ❓ Did Bootstrap Register?

To check boostrap loading:

```js
    if (!FzForm.isBootstrapLoaded()) {
        console.warn("No Bootstrap styles registered")
    }
```
