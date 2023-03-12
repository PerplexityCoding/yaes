import { defineManifest } from '@crxjs/vite-plugin'
import { version } from '../package.json'

export default defineManifest(() => {
  return {
    name: 'YAES',
    version,
    version_name: version,
    description: 'Yet Another Environment Switcher',
    permissions: [
      'storage'
    ],
    host_permissions: [
      '*://*/*'
    ],
    action: {
      default_popup: process.env.CYPRESS ? 'src/popup-cypress.html' : 'src/popup.html',
      default_icon: {
        '16': 'assets/images/favicon-16x16.png',
        '32': 'assets/images/favicon-32x32.png',
        '48': 'assets/images/favicon.ico',
        '180': 'assets/images/apple-touch-icon.png',
        '192': 'assets/images/android-chrome-192x192.png',
        '512': 'assets/images/android-chrome-512x512.png'
      }
    },
    icons: {
      '16': 'assets/images/favicon-16x16.png',
      '32': 'assets/images/favicon-32x32.png',
      '48': 'assets/images/favicon.ico',
      '180': 'assets/images/apple-touch-icon.png',
      '192': 'assets/images/android-chrome-192x192.png',
      '512': 'assets/images/android-chrome-512x512.png'
    },
    background: {
      service_worker: 'src/background.mjs'
    },
    options_ui: {
      page: process.env.CYPRESS ? 'src/options-cypress.html' : 'src/options.html',
      open_in_tab: true
    },
    content_scripts: [
      {
        js: ['src/content-script.mjs'],
        matches: ['*://*/*']
      }
    ],
    manifest_version: 3
  }
})
