/**
 * scripts/validate.js
 * Suite integral de validación técnica, accesibilidad WCAG y consistencia de marca
 * para el tema corporativo y la extensión dinámica de Attlon.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const BUILD_DIR = path.join(ROOT_DIR, 'build');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('====================================================');
console.log('   ATTLON CORPORATE SUITE - VALIDATION SUITE        ');
console.log('====================================================\n');

// 1. VALIDACION TECNICA Y ESTRUCTURA DE ARCHIVOS
console.log('--- 1. ARCHIVOS BASE Y ESQUEMAS JSON ---');

const requiredFiles = [
  'package.json',
  'LICENSE',
  'README.md',
  'src/manifest.json',
  'src/manifest-dynamic.json',
  'src/theme/colors.json',
  'src/theme/theme.json',
  'src/newtab/newtab.html',
  'src/newtab/newtab.css',
  'src/newtab/newtab.js',
  'policies/attlon-managed-bookmarks.reg',
  'build/chrome/manifest.json',
  'build/edge/manifest.json',
  'build/chrome-extension/manifest.json',
  'build/edge-extension/manifest.json',
  'attlon-browser-theme-chrome.zip',
  'attlon-browser-theme-edge.zip',
  'attlon-dynamic-newtab-chrome.zip',
  'attlon-dynamic-newtab-edge.zip'
];

requiredFiles.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  const exists = fs.existsSync(fullPath);
  assert(exists, `Archivo obligatorio existe: ${relPath}`);
  if (exists && relPath.endsWith('.json')) {
    try {
      JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      assert(true, `Sintaxis JSON valida en: ${relPath}`);
    } catch (err) {
      assert(false, `Error parseando JSON en ${relPath}: ${err.message}`);
    }
  }
});

// 2. VALIDACION DE ASSETS Y RECURSOS GRAFICOS
console.log('\n--- 2. VALIDACION DE RECURSOS GRAFICOS Y MULTIMEDIA ---');

const expectedAssets = [
  'assets/icons/icon16.png',
  'assets/icons/icon32.png',
  'assets/icons/icon48.png',
  'assets/icons/icon128.png',
  'assets/backgrounds/theme_frame.png',
  'assets/backgrounds/theme_frame_inactive.png',
  'assets/backgrounds/theme_toolbar.png',
  'assets/backgrounds/theme_ntp_background.jpg',
  'assets/backgrounds/theme_ntp_attribution.png',
  'assets/logo/attlon-logo-dark.svg',
  'assets/logo/attlon-logo-light.svg',
  'assets/logo/attlon-symbol.svg',
  'assets/logo/attlon-logo-dark.png',
  'assets/logo/attlon-logo-light.png',
  'assets/video/building.mp4'
];

expectedAssets.forEach(assetRel => {
  const srcPath = path.join(SRC_DIR, assetRel);
  const srcExists = fs.existsSync(srcPath) && fs.statSync(srcPath).size > 0;
  assert(srcExists, `Asset fuente existe y no vacio: ${assetRel}`);
});

// 3. VALIDACION DE MANIFESTS CHROMIUM
console.log('\n--- 3. ESPECIFICACIONES CHROMIUM THEME Y EXTENSION ---');

const chromeTheme = JSON.parse(fs.readFileSync(path.join(BUILD_DIR, 'chrome', 'manifest.json'), 'utf8'));
const edgeTheme = JSON.parse(fs.readFileSync(path.join(BUILD_DIR, 'edge', 'manifest.json'), 'utf8'));
const dynamicExt = JSON.parse(fs.readFileSync(path.join(BUILD_DIR, 'chrome-extension', 'manifest.json'), 'utf8'));

assert(chromeTheme.manifest_version === 3, 'Chrome Theme cumple Manifest V3');
assert(edgeTheme.manifest_version === 3, 'Edge Theme cumple Manifest V3');
assert(dynamicExt.manifest_version === 3, 'Dynamic Extension cumple Manifest V3');
assert(Array.isArray(dynamicExt.permissions) && dynamicExt.permissions.includes('bookmarks'), 'Dynamic Extension posee permiso de "bookmarks"');
assert(dynamicExt.chrome_url_overrides && dynamicExt.chrome_url_overrides.newtab, 'Dynamic Extension define override "newtab"');

// 4. VALIDACION DE ACCESIBILIDAD Y RATIOS DE CONTRASTE WCAG 2.1
console.log('\n--- 4. ACCESIBILIDAD WCAG 2.1 Y BORDES ERGONOMICOS ---');

function getLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrast(rgb1, rgb2) {
  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const colors = chromeTheme.theme.colors;
const activeContrast = getContrast(colors.tab_text, colors.toolbar);
assert(activeContrast >= 7.0, `Contraste Pestaña Activa: ${activeContrast.toFixed(2)}:1 (WCAG AAA >= 7.0:1)`);

const inactiveContrast = getContrast(colors.tab_background_text, colors.frame);
assert(inactiveContrast >= 4.5, `Contraste Pestaña Inactiva: ${inactiveContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`);

const omniboxContrast = getContrast(colors.omnibox_text, colors.omnibox_background);
assert(omniboxContrast >= 7.0, `Contraste Omnibox: ${omniboxContrast.toFixed(2)}:1 (WCAG AAA >= 7.0:1)`);

// 5. VALIDACION DE FAVORITOS CORPORATIVOS
console.log('\n--- 5. FAVORITOS Y ACCESOS CORPORATIVOS ATTLON ---');

const colorsJson = JSON.parse(fs.readFileSync(path.join(SRC_DIR, 'theme', 'colors.json'), 'utf8'));
const bookmarks = colorsJson.corporateBookmarks;

const expectedUrls = [
  'https://admin.cloudcottes.com/login',
  'https://acc.autodesk.eu/projects',
  'https://login.payfit.com/',
  'https://github.com/attlon',
  'https://cottesgroup.sharepoint.com/',
  'https://www.linkedin.com/company/attlon/',
  'https://www.cottesgroup.com/',
  'https://www.electroalavesa.es/',
  'https://www.svcseguridad.com/'
];

expectedUrls.forEach(urlPrefix => {
  const found = bookmarks.some(bm => bm.url.includes(urlPrefix));
  assert(found, `Favorito corporativo verificado en configuración: ${urlPrefix}`);
});

// Comprobar política de registro IT
const regContent = fs.readFileSync(path.join(ROOT_DIR, 'policies', 'attlon-managed-bookmarks.reg'), 'utf8');
assert(regContent.includes('ManagedBookmarks'), 'Archivo .reg contiene directiva ManagedBookmarks');
assert(regContent.includes('https://admin.cloudcottes.com/login'), 'Archivo .reg contiene enlace Cottes Admin');
assert(regContent.includes('https://login.payfit.com/'), 'Archivo .reg contiene enlace PayFit');
assert(regContent.includes('https://www.electroalavesa.es/'), 'Archivo .reg contiene enlace Electro Alavesa');
assert(regContent.includes('https://www.svcseguridad.com/'), 'Archivo .reg contiene enlace SVC Seguridad');
assert(regContent.includes('Normativa & Fuentes PCI'), 'Archivo .reg contiene carpeta Normativa & Fuentes PCI');

// 6. VALIDACION DE CLAVE PERMANENTE Y SEGURIDAD PCI
console.log('\n--- 6. EXTENSION ID PERMANENTE Y HERRAMIENTAS PCI ---');
const srcDynamic = JSON.parse(fs.readFileSync(path.join(SRC_DIR, 'manifest-dynamic.json'), 'utf8'));
assert(Boolean(srcDynamic.key && srcDynamic.key.length > 200), 'Dynamic Extension posee clave RSA permanente fijada');
assert(Array.isArray(colorsJson.normativeBookmarks) && colorsJson.normativeBookmarks.length >= 5, 'colors.json incluye enlaces normativos PCI (RIPCI, CTE, RSCIEI, Tecnifuego, Cepreven)');

// 6. RESUMEN FINAL
console.log('\n====================================================');
console.log(`   RESUMEN DE VALIDACION: ${passedTests}/${totalTests} PRUEBAS EXITOSAS`);
console.log('====================================================');

if (failedTests > 0) {
  console.error(`\nALERTA: Se encontraron ${failedTests} fallos en la validacion.\n`);
  process.exit(1);
} else {
  console.log('\nTODAS LAS VALIDACIONES HAN SIDO SUPERADAS EXITOSAMENTE.\n');
  process.exit(0);
}
