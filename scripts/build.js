/**
 * scripts/build.js
 * Generador automático de paquetes corporativos Attlon para Chromium:
 * 1. Temas nativos para Google Chrome y Microsoft Edge (con bordes transparentes manteniendo el azul)
 * 2. Extensiones de Espacio de Trabajo Dinámico (Fondo de vídeo building.mp4 + Favoritos preinstalados + Sincronización)
 * 3. Paquetes comprimidos ZIP para despliegue
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const WORKSPACE_DIR = path.resolve(ROOT_DIR, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const BUILD_DIR = path.join(ROOT_DIR, 'build');

const CHROME_THEME_DIR = path.join(BUILD_DIR, 'chrome');
const EDGE_THEME_DIR = path.join(BUILD_DIR, 'edge');
const CHROME_EXT_DIR = path.join(BUILD_DIR, 'chrome-extension');
const EDGE_EXT_DIR = path.join(BUILD_DIR, 'edge-extension');

console.log('====================================================');
console.log('   ATTLON CORPORATE SUITE - SISTEMA DE BUILD        ');
console.log('====================================================\n');

// 1. Limpieza y preparación de directorios
function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

console.log('[1/6] Preparando directorios de salida...');
cleanDir(BUILD_DIR);
cleanDir(CHROME_THEME_DIR);
cleanDir(EDGE_THEME_DIR);
cleanDir(CHROME_EXT_DIR);
cleanDir(EDGE_EXT_DIR);

// 2. Carga y parseo de configuraciones
console.log('[2/6] Cargando especificaciones corporativas...');
const baseManifestPath = path.join(SRC_DIR, 'manifest.json');
const dynamicManifestPath = path.join(SRC_DIR, 'manifest-dynamic.json');
const colorsPath = path.join(SRC_DIR, 'theme', 'colors.json');
const themePath = path.join(SRC_DIR, 'theme', 'theme.json');

const baseManifest = JSON.parse(fs.readFileSync(baseManifestPath, 'utf8'));
const dynamicManifest = JSON.parse(fs.readFileSync(dynamicManifestPath, 'utf8'));
const colorsConfig = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));
const themeConfig = JSON.parse(fs.readFileSync(themePath, 'utf8'));

// 3. Copiar assets recursivamente
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('[3/6] Sincronizando recursos gráficos y multimedia...');
const srcAssets = path.join(SRC_DIR, 'assets');
const srcNewtab = path.join(SRC_DIR, 'newtab');

// Para temas puros (solo assets necesarios, sin video para mantener tamaño ligero)
function copyThemeAssets(destAssetsDir) {
  fs.mkdirSync(destAssetsDir, { recursive: true });
  copyDirSync(path.join(srcAssets, 'icons'), path.join(destAssetsDir, 'icons'));
  copyDirSync(path.join(srcAssets, 'logo'), path.join(destAssetsDir, 'logo'));
  copyDirSync(path.join(srcAssets, 'backgrounds'), path.join(destAssetsDir, 'backgrounds'));
}

copyThemeAssets(path.join(CHROME_THEME_DIR, 'assets'));
copyThemeAssets(path.join(EDGE_THEME_DIR, 'assets'));

// Para extensiones dinámicas (incluye newtab + video)
copyDirSync(srcAssets, path.join(CHROME_EXT_DIR, 'assets'));
copyDirSync(srcAssets, path.join(EDGE_EXT_DIR, 'assets'));
copyDirSync(srcNewtab, path.join(CHROME_EXT_DIR, 'newtab'));
copyDirSync(srcNewtab, path.join(EDGE_EXT_DIR, 'newtab'));

// 4. Generación de Manifests
console.log('[4/6] Generando manifests adaptados...');

// A) Manifiestos de Temas
const chromeThemeManifest = {
  ...baseManifest,
  name: "Attlon Corporate Theme",
  description: "Tema corporativo oficial de Attlon para Google Chrome. Bordes transparentes en azul corporativo, ergonomía y seguridad industrial.",
  theme: themeConfig.theme
};
fs.writeFileSync(path.join(CHROME_THEME_DIR, 'manifest.json'), JSON.stringify(chromeThemeManifest, null, 2), 'utf8');

const edgeThemeManifest = {
  ...baseManifest,
  name: "Attlon Corporate Theme for Microsoft Edge",
  description: "Tema corporativo oficial de Attlon para Microsoft Edge. Bordes transparentes en azul corporativo, ergonomía y seguridad industrial.",
  theme: themeConfig.theme,
  minimum_chrome_version: "112"
};
fs.writeFileSync(path.join(EDGE_THEME_DIR, 'manifest.json'), JSON.stringify(edgeThemeManifest, null, 2), 'utf8');

// B) Manifiestos de Extensión Dinámica (con nueva pestaña + marcadores)
const chromeExtManifest = {
  ...dynamicManifest,
  short_name: "Attlon",
  name: "Attlon Workspace & Dynamic Dashboard",
  description: "Espacio corporativo de Attlon: fondo dinámico, buscador Copilot, noticias PCI y herramientas de seguridad industrial."
};
delete chromeExtManifest.key; // Requerido por la tienda de Chrome
fs.writeFileSync(path.join(CHROME_EXT_DIR, 'manifest.json'), JSON.stringify(chromeExtManifest, null, 2), 'utf8');

const edgeExtManifest = {
  ...dynamicManifest,
  short_name: "Attlon",
  name: "Attlon Workspace & Dynamic Dashboard for Edge",
  description: "Espacio corporativo de Attlon: fondo dinámico, buscador Copilot, noticias PCI y herramientas de seguridad industrial."
};
delete edgeExtManifest.key; // Requerido por Microsoft Partner Center
fs.writeFileSync(path.join(EDGE_EXT_DIR, 'manifest.json'), JSON.stringify(edgeExtManifest, null, 2), 'utf8');

// 5. Empaquetado ZIP
console.log('[5/6] Generando paquetes ZIP de distribución...');

function createZip(sourceDir, zipFileName) {
  const targetZipPath = path.join(BUILD_DIR, zipFileName);
  const rootZipPath = path.join(ROOT_DIR, zipFileName);
  const workspaceZipPath = path.join(WORKSPACE_DIR, zipFileName);

  if (fs.existsSync(targetZipPath)) fs.unlinkSync(targetZipPath);
  if (fs.existsSync(rootZipPath)) fs.unlinkSync(rootZipPath);
  if (fs.existsSync(workspaceZipPath)) fs.unlinkSync(workspaceZipPath);

  try {
    execSync(`tar -a -c -f "${targetZipPath}" *`, { cwd: sourceDir, stdio: 'pipe' });
    fs.copyFileSync(targetZipPath, rootZipPath);
    fs.copyFileSync(targetZipPath, workspaceZipPath);
    const stats = fs.statSync(targetZipPath);
    console.log(`  -> [ZIP] ${zipFileName} (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    try {
      execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${sourceDir}\\*' -DestinationPath '${targetZipPath}' -Force"`, { stdio: 'pipe' });
      fs.copyFileSync(targetZipPath, rootZipPath);
      fs.copyFileSync(targetZipPath, workspaceZipPath);
      const stats = fs.statSync(targetZipPath);
      console.log(`  -> [ZIP vía PowerShell] ${zipFileName} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (fallbackErr) {
      console.error(`  Error empaquetando ${zipFileName}:`, fallbackErr.message);
    }
  }
}

// 1. Temas nativos
createZip(CHROME_THEME_DIR, 'attlon-browser-theme-chrome.zip');
createZip(EDGE_THEME_DIR, 'attlon-browser-theme-edge.zip');

// 2. Extensiones dinámicas con video y favoritos
createZip(CHROME_EXT_DIR, 'attlon-dynamic-newtab-chrome.zip');
createZip(EDGE_EXT_DIR, 'attlon-dynamic-newtab-edge.zip');

// 6. Copia de políticas corporativas
console.log('[6/6] Sincronizando directivas de registro IT...');
const regSrc = path.join(ROOT_DIR, 'policies', 'attlon-managed-bookmarks.reg');
const regDest = path.join(WORKSPACE_DIR, 'attlon-managed-bookmarks.reg');
if (fs.existsSync(regSrc)) {
  fs.copyFileSync(regSrc, regDest);
  console.log('  -> Copiada política de registro a la raíz del espacio de trabajo.');
}

// 7. Sincronización de salida web para Vercel (public)
const websiteDir = path.join(ROOT_DIR, 'website');
const publicDir = path.join(ROOT_DIR, 'public');
if (fs.existsSync(websiteDir)) {
  cleanDir(publicDir);
  copyDirSync(websiteDir, publicDir);
  console.log('  -> Sincronizado directorio website a public para Vercel.');
}

console.log('\n====================================================');
console.log('   COMPILACION FINALIZADA CON EXITO!                ');
console.log('====================================================');
console.log('Distribuciones generadas:');
console.log(' 1. Temas Nativos (Chrome y Edge):');
console.log('    - build/chrome/ y attlon-browser-theme-chrome.zip');
console.log('    - build/edge/   y attlon-browser-theme-edge.zip');
console.log(' 2. Extensiones Dinámicas (Vídeo + Favoritos + Sync):');
console.log('    - build/chrome-extension/ y attlon-dynamic-newtab-chrome.zip');
console.log('    - build/edge-extension/   y attlon-dynamic-newtab-edge.zip');
console.log(' 3. Directiva Corporativa para Administradores IT:');
console.log('    - policies/attlon-managed-bookmarks.reg');
console.log('====================================================\n');
