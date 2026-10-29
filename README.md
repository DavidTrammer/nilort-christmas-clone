# Nilort IT Group — Christmas Themed Drupal 10/11 Website 🎄

A festive, high-performance holiday edition redesign and transformation of [nilort.be](https://nilort.be) powered by **Drupal 10 / Drupal 11** and deployed to **Azure Static Web Apps**.

---

## 🌟 Highlights & Drupal Architecture
- **Drupal 10/11 Project Structure:** Built following official Composer-managed Drupal best practices (`composer.json`, `config/sync/`, `web/index.php`, `web/sites/default/settings.php`).
- **Custom Christmas Theme (`nilort_christmas`):**
  - Path: `web/themes/custom/nilort_christmas/`
  - Manifest: `nilort_christmas.info.yml` and `nilort_christmas.libraries.yml`
  - Theme Engine: `nilort_christmas.theme`
  - Twig Templates: `html.html.twig`, `page.html.twig`, `page--front.html.twig`, `region.html.twig`, `block.html.twig`, `node.html.twig`.
- **Custom Drupal Module (`nilort_christmas_core`):**
  - Path: `web/modules/custom/nilort_christmas_core/`
  - Holiday hooks, snowfall attachments, and custom block definitions.
- **Festive Theme & Palette:** Deep festive reds (`#9b111e`), pine/forest greens (`#133a27`), snowy whites, and warm gold accents (`#d4af37`).
- **Holiday Aesthetics:** Animated Santa hat on the brand logo, twinkling Christmas lights garland, gift card ribbons, and holiday badges.
- **Falling Snow Effect:** Lightweight, smooth vanilla HTML5 Canvas falling snow with wind physics and an interactive toggle (Snow: On / Off).
- **Core Content & Architecture Replicated:**
  - Hero section with live statistics and holiday greeting
  - About Nilort & 3 Core Values (Collaboration, Trust, Proximity)
  - 4 Core Expertises (Workplace & Cloud Support, System & Network Engineering, IT Project Management, End-to-End Software Development)
  - Talent / Work @ Nilort section
  - Interactive FAQ Accordion
  - Contact details and interactive holiday message form
  - MetiGroup partner network badges
- **Dual Deployment Architecture:**
  - **Live Edge CDN:** Azure Static Web Apps (Free tier) with CI/CD via GitHub Actions.
  - **Local Dynamic Drupal CMS:** Ready to run via Docker (`docker compose up`) with PHP 8.2 and SQLite/MySQL.

---

## 🚀 Running Drupal Locally

### Option A: Using Docker Compose
```bash
# Build and run the Drupal container on port 8080
docker compose up -d

# Check logs
docker compose logs -f
```
Visit `http://localhost:8080`.

### Option B: Using PHP Built-in Server
```bash
php -S localhost:8080 -t web
```

---

## 🛠️ Drupal CLI & Theming Management

To clear Drupal cache:
```bash
drush cr
```

To export/import configuration:
```bash
drush config:export
drush config:import
```

---

## 🌐 Live Deployments & Repository Links
- **Live Azure Deployment:** [https://icy-mud-00c308603.3.azurestaticapps.net](https://icy-mud-00c308603.3.azurestaticapps.net)
- **GitHub Repository:** [https://github.com/DavidTrammer/nilort-christmas-clone](https://github.com/DavidTrammer/nilort-christmas-clone)
