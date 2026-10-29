---
name: drupal
description: >-
  Comprehensive guide and operational skill for creating, theming, architecting, managing, and
  deploying Drupal 10 and 11 websites. Covers custom theme development (Twig, .info.yml, .libraries.yml,
  .theme), custom module architecture, Composer dependency management, Drush automation, configuration
  synchronization, Headless/Static Drupal deployments, and Azure hosting.
---

# Drupal 10/11 Website Creation, Theming & Management

This skill provides complete reference patterns and operational guidelines for building, maintaining, theming, and deploying Drupal 10 and Drupal 11 sites.

---

## 1. Standard Drupal Project Architecture

A modern Composer-managed Drupal 10/11 site follows this recommended filesystem hierarchy:

```
project-root/
├── composer.json               # Root dependencies, Drupal core-recommended, Drush
├── composer.lock
├── config/
│   └── sync/                   # Version-controlled Drupal configuration exports (.yml)
├── drush/
│   └── Sites/                  # Site aliases and Drush config
├── web/                        # Web docroot (served by HTTP server)
│   ├── index.php               # Front controller
│   ├── .htaccess / nginx.conf
│   ├── core/                   # Drupal core (managed by Composer - do not edit)
│   ├── modules/
│   │   ├── contrib/            # Downloaded community modules
│   │   └── custom/             # Project-specific custom modules
│   ├── themes/
│   │   ├── contrib/            # Downloaded community themes
│   │   └── custom/             # Project-specific custom themes
│   │       └── my_theme/       # Custom theme directory
│   └── sites/
│       ├── default/
│       │   ├── settings.php    # Database, hash salt, config sync paths
│       │   └── files/          # User-uploaded files (public://)
└── .github/
    └── workflows/              # CI/CD pipelines
```

---

## 2. Custom Theme Development (Twig & Modern Theming)

### A. Theme Definition (`my_theme.info.yml`)
Every Drupal theme requires a `<theme_name>.info.yml` file:

```yaml
name: 'Nilort Christmas Theme'
type: theme
description: 'Festive holiday Drupal theme for Nilort IT Group with snow canvas and responsive layout.'
core_version_requirement: ^10 || ^11
base theme: false

libraries:
  - nilort_christmas/global-styling
  - nilort_christmas/snow-effect

regions:
  top_bar: 'Festive Top Bar'
  header: 'Header & Navigation'
  hero: 'Winter Wonderland Hero'
  about: 'About & Values'
  expertises: 'Specializations & Expertises'
  careers: 'Work @ Nilort / Careers'
  faq: 'Frequently Asked Questions'
  contact: 'Contact & Inquiries'
  ecosystem: 'Partner Ecosystem'
  footer: 'Footer'
```

### B. Library Definition (`my_theme.libraries.yml`)
CSS and JavaScript are registered as asset libraries:

```yaml
global-styling:
  version: 1.0.0
  css:
    theme:
      css/styles.css: {}
  js:
    js/app.js: {}
  dependencies:
    - core/drupal

snow-effect:
  version: 1.0.0
  js:
    js/snow.js: {}
```

### C. Theme Processing Hooks (`my_theme.theme`)
Custom PHP preprocessors inject variables, dynamic holiday states, or custom classes:

```php
<?php

/**
 * @file
 * Functions to support theming in the Nilort Christmas theme.
 */

use Drupal\Core\Template\Attribute;

/**
 * Implements hook_preprocess_page().
 */
function nilort_christmas_preprocess_page(array &$variables): void {
  $variables['site_name'] = \Drupal::config('system.site')->get('name');
  $variables['site_slogan'] = \Drupal::config('system.site')->get('slogan');
  $variables['holiday_greeting'] = 'Season\'s Greetings from Nilort IT Group!';
  $variables['is_holiday_season'] = TRUE;
}

/**
 * Implements hook_preprocess_html().
 */
function nilort_christmas_preprocess_html(array &$variables): void {
  $variables['attributes']['class'][] = 'nilort-festive-theme';
}
```

### D. Twig Templates Hierarchy (`templates/`)
- `html.html.twig`: The outermost HTML5 document structure (`<!DOCTYPE html>`, `<head>`, `{{ page_top }}`, `{{ page }}`, `{{ page_bottom }}`).
- `page.html.twig`: The page layout structuring regions:
  ```twig
  <div class="layout-container">
    {{ page.top_bar }}
    {{ page.header }}
    <main role="main">
      {{ page.hero }}
      {{ page.about }}
      {{ page.expertises }}
      {{ page.careers }}
      {{ page.faq }}
      {{ page.contact }}
    </main>
    {{ page.footer }}
  </div>
  ```
- `region.html.twig`, `block.html.twig`, `node.html.twig`.

---

## 3. Custom Module Development

Create custom modules in `web/modules/custom/<module_name>`:
- `<module_name>.info.yml`: Declares name, package, type (`module`), core version requirement.
- `<module_name>.module`: Implements Drupal procedural hooks.
- `src/Controller/`: PSR-4 controllers returning render arrays or JSON responses.
- `src/Plugin/Block/`: Custom reusable content and widget blocks.

---

## 4. Drush CLI Essentials

Drush is the command-line shell and scripting interface for Drupal:
- **Cache Rebuild:** `drush cache:rebuild` (or `drush cr`)
- **Site Install:** `drush site:install standard --db-url=sqlite://sites/default/files/.ht.sqlite`
- **Config Management:**
  - Export: `drush config:export` (`drush cex`)
  - Import: `drush config:import` (`drush cim`)
- **Module & Theme Management:**
  - Enable: `drush pm:enable <name>` (`drush en <name>`)
  - Set Default Theme: `drush config:set system.theme default <theme_name>`

---

## 5. Deployment Strategies (Azure & Static Web Apps)

### Strategy A: Static Drupal Export (Azure Static Web Apps)
1. Drupal acts as the headless content model and Twig rendering engine.
2. The site generates pre-rendered static HTML, CSS, JS, and media (using Tome / static compiler).
3. Deploys directly to Azure Static Web Apps with global edge CDN, zero server maintenance, and maximum speed.

### Strategy B: Containerized / Azure App Service (Full Dynamic CMS)
1. Run Drupal in PHP-FPM 8.2/8.3 container on Azure App Service Linux.
2. Connect to Azure Database for MySQL Flexible Server or Azure SQLite volume.
3. Persistent storage mounted to `/var/www/html/web/sites/default/files`.

---

## 6. Best Practices Checklist
- [x] Strict separation of presentation (Twig templates) and logic (modules/services).
- [x] No hardcoded text: use `{% trans %}` or Drupal configuration for localization.
- [x] Version-control `config/sync/` while excluding secret credentials (`settings.local.php`).
- [x] Optimize asset libraries with CSS/JS aggregation enabled in production.
