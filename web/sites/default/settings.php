<?php

/**
 * @file
 * Drupal site-specific configuration file for Nilort Christmas Site.
 */

// Database settings - SQLite default for zero-friction local/Azure execution
$databases['default']['default'] = [
  'database' => __DIR__ . '/files/.ht.sqlite',
  'prefix' => '',
  'namespace' => 'Drupal\\sqlite\\Driver\\Database\\sqlite',
  'driver' => 'sqlite',
];

// Configuration synchronization directory
$settings['config_sync_directory'] = '../config/sync';

// Salt for one-time login links, cancel links, form tokens, etc.
$settings['hash_salt'] = 'nilort-christmas-drupal-secure-salt-2026-c8f9b2';

// Access control for update.php
$settings['update_free_access'] = FALSE;

// Reverse proxy settings (Azure App Service / Azure Static Web Apps)
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
  $settings['reverse_proxy'] = TRUE;
  $settings['reverse_proxy_addresses'] = [$_SERVER['REMOTE_ADDR']];
  $settings['reverse_proxy_trusted_headers'] = \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_FOR | \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_PROTO | \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_HOST;
}

// Trusted host patterns
$settings['trusted_host_patterns'] = [
  '^localhost$',
  '^127\.0\.0\.1$',
  '.*\.azurestaticapps\.net$',
  '.*\.azurewebsites\.net$',
  '.*nilort\.be$',
];

// File public and private paths
$settings['file_public_path'] = 'sites/default/files';
$settings['file_private_path'] = '../private';

// Load local development overrides if present
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
