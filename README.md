# Aliasing in sampling

Static, interactive page demonstrating the sampling theorem and aliasing, in English and Thai. No build step, no dependencies beyond a Google Fonts stylesheet link.

Live at <https://ssupawat.github.io/aliasing-demo/>.

## Languages

The page ships bilingual (English and Thai) with a toggle in the header. The language is chosen in this order:

1. `?lang=en` / `?lang=th` in the URL
2. a previous choice, remembered in `localStorage`
3. the browser's preferred languages
4. English

Switching updates `<html lang>`, the URL, the title and meta description, and the live status readouts — no page reload.

To add or change wording, edit the `strings` table in `i18n.js`. Keys are wired to the markup by attribute:

- `data-i18n` — replaces text content
- `data-i18n-html` — replaces inner HTML, for strings carrying inline `<span class="mono">` markup
- `data-i18n-aria-label`, `data-i18n-title` — replace the matching attribute

Strings rendered from JavaScript (the status line and the canvas description) go through `I18N.t(key, params)`, with `{placeholder}` substitution.

### Thai terminology

Where Thai technical writing transliterates a term rather than translating it, the Thai strings follow that usage: `เอเลียซิง` (aliasing), `แซมเปิล` (samples), `ฟิลเตอร์แอนติเอเลียซิง` (anti-aliasing filter), `เฟรมเรต` (frame rate), alongside the already-established `ไนควิสต์`, `ออสซิลโลสโคป`, `แอนะล็อก`, and `มัวเร`. Terms that have a settled native Thai form — `การสุ่มตัวอย่าง` (sampling), `ความถี่ไนควิสต์` (Nyquist frequency) — are kept translated. The English word is carried in parentheses on first mention, which also keeps the page findable by searchers using either form.

## SEO

- Canonical URL plus `hreflang` alternates for `en`, `th`, and `x-default`
- Open Graph and Twitter card tags, with `og-image.png` (1200×630) as the social card
- JSON-LD structured data (`WebSite` and `WebPage` / `LearningResource`)
- `robots.txt` and a `sitemap.xml` listing both language URLs

The absolute URLs in `index.html`, `robots.txt`, and `sitemap.xml` are hard-coded to `https://ssupawat.github.io/aliasing-demo/`. If the site moves, update them together.

## Deploy to GitHub Pages

1. Push these files to a repository (they can sit at the repo root).
2. In the repo, go to Settings → Pages.
3. Under "Build and deployment", set Source to "Deploy from a branch", pick the default branch and folder `/ (root)`.
4. Save. The page will be live at `https://<username>.github.io/<repo>/` within a minute or two.

## Files

- `index.html` — page structure, content, and SEO metadata
- `style.css` — styling
- `script.js` — sampling and aliasing calculations, canvas drawing
- `i18n.js` — English/Thai string table and language switching
- `og-image.png` — social sharing card
- `favicon.svg` — site icon
- `robots.txt`, `sitemap.xml` — crawler directives
