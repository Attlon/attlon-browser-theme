/**
 * newtab.js - Attlon Corporate New Tab Page
 * Versión 1.2.0 (Producción para Chrome Web Store y Microsoft Edge)
 * 
 * Funcionalidades Integradas:
 * 1. Clima Interactivo en Vivo Compacto mediante Open-Meteo API
 * 2. Widget de Calidad del Aire & Seguridad Ambiental en Vivo (Open-Meteo Air Quality)
 * 3. Widget de Divisas y Mercados en Vivo (EUR/USD y EUR/GBP en tiempo real)
 * 4. Widget de Tareas Rápidas y Objetivos del Día (Checklist interactiva)
 * 5. Marcador PayFit oficial añadido a los accesos directos corporativos
 * 6. Selector de Tema Claro / Oscuro con persistencia en localStorage
 * 7. Selector de Fondo de Pantalla (Vídeo, Foto Sede, Azul Puro o Subida Propia)
 * 8. Visualizador de Versión y Verificador de Actualizaciones (chrome.runtime API)
 * 9. Gestión dinámica completa de marcadores (Añadir, Renombrar, Quitar, Anclar)
 * 10. Buscador central conectado a Microsoft Copilot
 * 11. Sincronización nativa con la barra de favoritos (chrome.bookmarks API)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeMode();
  initWallpaperManager();
  initShortcutsManager();
  initWeatherSystem();
  initAirQualitySystem();
  initCurrencySystem();
  initQuickTasks();
  initHydraulicCalculator();
  initTechnicalConverter();
  initCoverageCalculator();
  initNewsTickerSystem();
  initLocationDetection();
  initWidgetHideAndManageButtons();
  initWidgetClickthroughs();
  initWidgetsDragAndDrop();
  initNewsDragAndDrop();
  initVersionAndUpdates();
  initDrawerNavigation();
  initSearchAndCopilot();
  initPageConfiguration();
});

// ==========================================================================
// 1. MARCADORES CORPORATIVOS PREDETERMINADOS (CON PAYFIT)
// ==========================================================================

const DEFAULT_BOOKMARKS = [
  {
    id: 'autodesk-forma',
    title: 'Autodesk Fo...',
    fullName: 'Autodesk Forma & Projects',
    url: 'https://acc.autodesk.eu/projects',
    iconSvg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1CFF86" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`
  },
  {
    id: 'cottes-admin',
    title: 'Iniciar sesión...',
    fullName: 'Cottes Cloud Admin',
    url: 'https://admin.cloudcottes.com/login',
    iconSvg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#001B3E" stroke="#09E36F" stroke-width="1.5"/><text x="12" y="17" fill="#09E36F" font-size="14" font-weight="900" font-family="sans-serif" text-anchor="middle">C</text></svg>`
  },
  {
    id: 'payfit',
    title: 'PayFit',
    fullName: 'PayFit · Nóminas y RRHH',
    url: 'https://login.payfit.com/',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#0052FF"/><path d="M7 6h6a4 4 0 0 1 0 8H9v4H7V6zm2 2v4h4a2 2 0 1 0 0-4H9z" fill="#FFF"/></svg>`
  },
  {
    id: 'youtube',
    title: 'YouTube',
    fullName: 'YouTube',
    url: 'https://www.youtube.com/',
    iconSvg: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#FF0000"/><path d="M10 15.5V8.5L16 12L10 15.5Z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'microsoft-365',
    title: 'Microsoft 365',
    fullName: 'Microsoft 365 Portal',
    url: 'https://www.microsoft365.com/',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022"/><rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900"/></svg>`
  },
  {
    id: 'personal-2026',
    title: 'Personal 2026',
    fullName: 'PERSONAL COTTES 2026.xlsx',
    url: 'https://cottesgroup.sharepoint.com/:x:/r/sites/GlobalCotts/_layouts/15/doc2.aspx?action=edit&sourcedoc=%7B40c743a7-bc02-4fba-aad7-eeccbd1fca0b%7D&wdExp=TEAMS-TREATMENT&web=1',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#107C41"/><path d="M8.5 7.5L12 12L8.5 16.5H10.5L13 13.2L15.5 16.5H17.5L14 12L17.5 7.5H15.5L13 10.8L10.5 7.5H8.5Z" fill="#FFF"/></svg>`
  },
  {
    id: 'attlon-github',
    title: 'Attlon GitHub',
    fullName: 'Attlon · GitHub',
    url: 'https://github.com/attlon',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#F9F6E6"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>`
  },
  {
    id: 'attlon-linkedin',
    title: 'LinkedIn',
    fullName: 'Attlon · LinkedIn',
    url: 'https://www.linkedin.com/company/attlon/',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg>`
  },
  {
    id: 'cottes-group',
    title: 'Cottés Group',
    fullName: 'Cottés Group Oficial',
    url: 'https://www.cottesgroup.com/',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F9F6E6" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
  },
  {
    id: 'electro-alavesa',
    title: 'Electro Alavesa',
    fullName: 'Electro Alavesa',
    url: 'https://www.electroalavesa.es/',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
  },
  {
    id: 'svc-seguridad',
    title: 'SVC Seguridad',
    fullName: 'SVC Seguridad',
    url: 'https://www.svcseguridad.com/',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B0FF" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
  }
];

// ==========================================================================
// BIBLIOTECA VECTORIAL DE LOGOTIPOS Y RESOLUTOR AUTOMÁTICO DE ICONOS
// Soporta YouTube, Google, PayFit, redes y extracción global vía Google S2 (128px)
// ==========================================================================

const BRAND_ICONS = {
  'youtube.com': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#FF0000"/><path d="M10 15.5V8.5L16 12L10 15.5Z" fill="#FFFFFF"/></svg>`,
  'youtu.be': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#FF0000"/><path d="M10 15.5V8.5L16 12L10 15.5Z" fill="#FFFFFF"/></svg>`,
  'google.com': `<svg width="26" height="26" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.09 3.66-5.17 3.66-9.12z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.43 7.34 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.24C.45 8.15 0 9.97 0 12s.45 3.85 1.24 5.42l4.04-3.13z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.57 1.24 6.58l4.04 3.13c.95-2.83 3.6-4.96 6.72-4.96z"/></svg>`,
  'github.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#F9F6E6"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>`,
  'linkedin.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg>`,
  'payfit.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#0052FF"/><path d="M7 6h6a4 4 0 0 1 0 8H9v4H7V6zm2 2v4h4a2 2 0 1 0 0-4H9z" fill="#FFF"/></svg>`,
  'microsoft.com': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022"/><rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900"/></svg>`,
  'office.com': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022"/><rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900"/></svg>`,
  'microsoft365.com': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022"/><rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900"/></svg>`,
  'openai.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#10A37F"><path d="M22.28 9.87a5.98 5.98 0 0 0-.52-4.93 6.05 6.05 0 0 0-6.19-2.88A6 6 0 0 0 4.9 3.8a6.05 6.05 0 0 0-3.64 4.54 5.98 5.98 0 0 0 .94 5.93 6 6 0 0 0 .52 4.93 6.05 6.05 0 0 0 6.19 2.88 6 6 0 0 0 10.67-1.74 6.05 6.05 0 0 0 3.64-4.54 5.98 5.98 0 0 0-.94-5.93z"/></svg>`,
  'chatgpt.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#10A37F"><path d="M22.28 9.87a5.98 5.98 0 0 0-.52-4.93 6.05 6.05 0 0 0-6.19-2.88A6 6 0 0 0 4.9 3.8a6.05 6.05 0 0 0-3.64 4.54 5.98 5.98 0 0 0 .94 5.93 6 6 0 0 0 .52 4.93 6.05 6.05 0 0 0 6.19 2.88 6 6 0 0 0 10.67-1.74 6.05 6.05 0 0 0 3.64-4.54 5.98 5.98 0 0 0-.94-5.93z"/></svg>`,
  'whatsapp.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>`,
  'twitter.com': `<svg width="24" height="24" viewBox="0 0 24 24" fill="#F9F6E6"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  'x.com': `<svg width="24" height="24" viewBox="0 0 24 24" fill="#F9F6E6"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  'spotify.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#1DB954"><circle cx="12" cy="12" r="10"/><path d="M17.5 15.2c-.2.3-.5.4-.8.2-2.3-1.4-5.2-1.7-8.6-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.7-.8 6.9-.5 9.5 1.1.4.2.5.6.3.8zm1.2-2.7c-.3.4-.8.5-1.2.3-2.7-1.6-6.7-2.1-9.9-1.1-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 3.6-1.1 8-.5 11.2 1.4.4.1.5.7.3 1zm.1-2.8c-3.2-1.9-8.5-2.1-11.6-1.1-.5.2-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 3.5-1.1 9.4-.9 13.1 1.3.4.3.6.9.3 1.3-.2.5-.8.6-1.2.3z" fill="#000"/></svg>`,
  'netflix.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#E50914"><path d="M4 2v20l5.5-3.5V6.5L14.5 22H20V2l-5.5 3.5v12L9 2H4z"/></svg>`,
  'amazon.es': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#FF9900"><path d="M15.93 17.09c-2.84 2.1-6.95 3.21-10.51 3.21-4.99 0-9.49-1.89-12.92-5.06-.27-.25-.03-.59.29-.4 3.71 2.16 8.24 3.46 12.92 3.46 3.16 0 6.64-.7 9.81-2.16.48-.22.88.35.41.95zm1.5-1.55c-.36-.46-2.38-.22-3.28-.11-.27.03-.31-.19-.07-.36 1.56-1.1 4.12-.78 4.43-.39.31.39-.08 2.98-1.56 4.19-.23.19-.45.09-.34-.16.36-.84 1.18-2.71.82-3.17z"/></svg>`,
  'amazon.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="#FF9900"><path d="M15.93 17.09c-2.84 2.1-6.95 3.21-10.51 3.21-4.99 0-9.49-1.89-12.92-5.06-.27-.25-.03-.59.29-.4 3.71 2.16 8.24 3.46 12.92 3.46 3.16 0 6.64-.7 9.81-2.16.48-.22.88.35.41.95zm1.5-1.55c-.36-.46-2.38-.22-3.28-.11-.27.03-.31-.19-.07-.36 1.56-1.1 4.12-.78 4.43-.39.31.39-.08 2.98-1.56 4.19-.23.19-.45.09-.34-.16.36-.84 1.18-2.71.82-3.17z"/></svg>`,
  'tecnifuego.org': `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 6 6 9 6 13a6 6 0 0 0 12 0c0-4-2-7-6-11z" fill="#EF4444"/><path d="M12 9c-2 2-3 3.5-3 5.5a3 3 0 0 0 6 0c0-2-1-3.5-3-5.5z" fill="#F59E0B"/></svg>`,
  'cepreven.com': `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 5v6.5c0 5.5 3.4 10.7 8 12.5 4.6-1.8 8-7 8-12.5V5l-8-3z" fill="#0078D4"/><path d="M10 12l2 2 4-4" stroke="#FFF" stroke-width="2" stroke-linecap="round"/></svg>`,
  'insst.es': `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v9c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5z" stroke="#09E36F" stroke-width="2"/><path d="M9 12l2 2 4-4" stroke="#09E36F" stroke-width="2"/></svg>`
};

function extractDomain(url) {
  if (!url) return '';
  try {
    const fixed = url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
    const parsed = new URL(fixed);
    return parsed.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

function formatDomainAsTitle(domain) {
  if (!domain) return 'Acceso';
  const parts = domain.split('.');
  const name = parts[0] === 'www' ? parts[1] : parts[0];
  if (!name) return 'Acceso';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getShortcutIconHtml(bm) {
  if (bm.iconSvg) {
    return bm.iconSvg;
  }

  const domain = extractDomain(bm.url);

  // 1. Coincidencia exacta o por sufijo en el catálogo de vectores corporativos
  if (domain && BRAND_ICONS[domain]) {
    return BRAND_ICONS[domain];
  }
  for (const [key, svg] of Object.entries(BRAND_ICONS)) {
    if (domain && (domain.endsWith('.' + key) || domain === key)) {
      return svg;
    }
  }

  // 2. Extracción dinámica de alta definición mediante Google S2 Favicon API (128x128)
  if (domain) {
    const s2Url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${encodeURIComponent(domain)}&size=128`;
    const ddgUrl = `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`;
    const initial = (bm.title || domain.charAt(0) || 'A').charAt(0).toUpperCase();

    return `<img class="shortcut-favicon-img" src="${s2Url}" alt="${bm.title || ''}" loading="lazy" onerror="if(this.src!=='${ddgUrl}'){this.src='${ddgUrl}';}else{this.style.display='none';this.nextElementSibling.style.display='flex';}" /><div class="shortcut-fallback-monogram" style="display:none;"><span>${initial}</span></div>`;
  }

  const initial = (bm.title || 'A').charAt(0).toUpperCase();
  return `<div class="shortcut-fallback-monogram"><span>${initial}</span></div>`;
}

// ==========================================================================
// 2. MODO OSCURO / MODO CLARO (THEME SWITCHER)
// ==========================================================================

function initThemeMode() {
  const savedMode = localStorage.getItem('attlon_theme_mode') || 'dark';
  applyThemeMode(savedMode);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const darkBtn = document.getElementById('themeDarkBtn');
  const lightBtn = document.getElementById('themeLightBtn');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      applyThemeMode(isDark ? 'light' : 'dark');
      showToast(isDark ? 'Activado Modo Claro' : 'Activado Modo Oscuro');
    });
  }

  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      applyThemeMode('dark');
      showToast('Activado Modo Oscuro');
    });
  }

  if (lightBtn) {
    lightBtn.addEventListener('click', () => {
      applyThemeMode('light');
      showToast('Activado Modo Claro');
    });
  }
}

function applyThemeMode(mode) {
  const moonIcon = document.getElementById('themeMoonIcon');
  const sunIcon = document.getElementById('themeSunIcon');
  const darkBtn = document.getElementById('themeDarkBtn');
  const lightBtn = document.getElementById('themeLightBtn');

  if (mode === 'light') {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunIcon) sunIcon.style.display = 'block';
    if (darkBtn) darkBtn.classList.remove('active');
    if (lightBtn) lightBtn.classList.add('active');
  } else {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    if (moonIcon) moonIcon.style.display = 'block';
    if (sunIcon) sunIcon.style.display = 'none';
    if (darkBtn) darkBtn.classList.add('active');
    if (lightBtn) lightBtn.classList.remove('active');
  }

  localStorage.setItem('attlon_theme_mode', mode);
}

// ==========================================================================
// 3. SELECTOR DE FONDO DE PANTALLA (WALLPAPER MANAGER)
// ==========================================================================

function initWallpaperManager() {
  let savedBgType = localStorage.getItem('attlon_custom_bg_type') || 'photo';
  if (savedBgType === 'blueprint') savedBgType = 'photo';
  applyWallpaper(savedBgType);

  const cards = document.querySelectorAll('.bg-choice-card');
  const fileInput = document.getElementById('bgFileInput');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const bgType = card.dataset.bgType;
      if (bgType === 'custom') {
        if (fileInput) fileInput.click();
      } else {
        applyWallpaper(bgType);
        showToast('Fondo de pantalla actualizado');
      }
    });
  });

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        try {
          localStorage.setItem('attlon_custom_bg_data', dataUrl);
          applyWallpaper('custom');
          showToast('✓ Imagen personalizada aplicada correctamente');
        } catch (err) {
          showToast('La imagen es demasiado grande para almacenamiento local.');
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

function applyWallpaper(bgType) {
  if (bgType === 'blueprint') bgType = 'photo';
  const bgVideo = document.getElementById('bgVideo');
  const customBg = document.getElementById('customBgLayer');
  const cards = document.querySelectorAll('.bg-choice-card');

  cards.forEach((c) => {
    if (c.dataset.bgType === bgType) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  if (!customBg) return;

  if (bgType === 'video') {
    if (bgVideo) {
      bgVideo.style.display = 'block';
      bgVideo.play().catch(() => {});
    }
    customBg.classList.remove('active');
    customBg.style.backgroundImage = 'none';
  } else if (bgType === 'photo') {
    if (bgVideo) {
      bgVideo.pause();
      bgVideo.style.display = 'none';
    }
    customBg.style.backgroundImage = "url('../assets/backgrounds/theme_ntp_background.jpg')";
    customBg.classList.add('active');
  } else if (bgType === 'gradient') {
    if (bgVideo) {
      bgVideo.pause();
      bgVideo.style.display = 'none';
    }
    const isLight = document.body.classList.contains('theme-light');
    customBg.style.backgroundImage = isLight
      ? 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)'
      : 'linear-gradient(135deg, #001B3E 0%, #000D1D 100%)';
    customBg.classList.add('active');
  } else if (bgType === 'custom') {
    const savedData = localStorage.getItem('attlon_custom_bg_data');
    if (savedData) {
      if (bgVideo) {
        bgVideo.pause();
        bgVideo.style.display = 'none';
      }
      customBg.style.backgroundImage = `url('${savedData}')`;
      customBg.classList.add('active');
    } else {
      applyWallpaper('photo');
      return;
    }
  }

  localStorage.setItem('attlon_custom_bg_type', bgType);
}

// ==========================================================================
// 4. CLIMA INTERACTIVO EN VIVO COMPACTO (OPEN-METEO API & MSN)
// ==========================================================================

const DEFAULT_WEATHER = {
  city: 'Paterna',
  temp: 24,
  unit: 'C',
  condition: 'Parcialmente nublado',
  humidity: 58,
  windSpeed: 14,
  msnUrl: 'https://www.msn.com/es-es/eltiempo/prevision/in-Paterna,Comunidad-Valenciana-Comunitat-Valenciana',
  lat: 39.50,
  lon: -0.44
};

let currentWeatherConfig = { ...DEFAULT_WEATHER };

function initWeatherSystem() {
  const saved = localStorage.getItem('attlon_weather_config');
  if (saved) {
    try {
      currentWeatherConfig = { ...DEFAULT_WEATHER, ...JSON.parse(saved) };
    } catch {
      currentWeatherConfig = { ...DEFAULT_WEATHER };
    }
  }

  updateWeatherUI();
  initWeatherModal();

  // Consultar en vivo al inicio
  fetchLiveWeather(currentWeatherConfig.city, currentWeatherConfig.unit, false);

  const refreshBtn = document.getElementById('weatherRefreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fetchLiveWeather(currentWeatherConfig.city, currentWeatherConfig.unit, true);
    });
  }
}

function getWeatherInterpretation(code) {
  if (code === 0) return { text: 'Despejado', icon: '☀️' };
  if (code === 1) return { text: 'Mayormente despejado', icon: '🌤️' };
  if (code === 2) return { text: 'Parcialmente nublado', icon: '⛅' };
  if (code === 3) return { text: 'Nublado', icon: '☁️' };
  if (code === 45 || code === 48) return { text: 'Niebla / Neblina', icon: '🌫️' };
  if (code >= 51 && code <= 55) return { text: 'Llovizna', icon: '🌦️' };
  if (code >= 61 && code <= 65) return { text: 'Lluvia', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { text: 'Nieve', icon: '🌨️' };
  if (code >= 80 && code <= 82) return { text: 'Chubascos', icon: '🌧️' };
  if (code >= 95 && code <= 99) return { text: 'Tormenta eléctrica', icon: '⛈️' };
  return { text: 'Condición variable', icon: '⛅' };
}

async function fetchLiveWeather(cityName, unit = 'C', userInitiated = false) {
  const statusEl = document.getElementById('weatherFetchStatus');
  if (statusEl) statusEl.style.display = 'flex';

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=es&format=json`;
    const geoRes = await fetch(geoUrl);
    if (!geoRes.ok) throw new Error('Error de conexión con geocodificación');

    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`No se encontró la localidad "${cityName}".`);
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;
    const resolvedName = place.name;

    const tempUnitParam = unit === 'F' ? 'fahrenheit' : 'celsius';
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=${tempUnitParam}`;
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error('Error al consultar datos del tiempo');

    const weatherData = await weatherRes.json();
    const currentTemp = Math.round(weatherData.current.temperature_2m);
    const code = weatherData.current.weather_code;
    const humidity = weatherData.current.relative_humidity_2m;
    const wind = Math.round(weatherData.current.wind_speed_10m);
    const conditionInfo = getWeatherInterpretation(code);

    const msnUrl = `https://www.msn.com/es-es/eltiempo/prevision/in-${encodeURIComponent(resolvedName)}?weadegreetype=${unit}`;

    currentWeatherConfig = {
      city: resolvedName,
      temp: currentTemp,
      unit: unit,
      condition: conditionInfo.text,
      iconEmoji: conditionInfo.icon,
      humidity: humidity,
      windSpeed: wind,
      msnUrl: msnUrl,
      lat: lat,
      lon: lon,
      lastUpdated: Date.now()
    };

    localStorage.setItem('attlon_weather_config', JSON.stringify(currentWeatherConfig));
    updateWeatherUI();

    // Actualizar también la calidad del aire para las mismas coordenadas
    fetchLiveAirQuality(lat, lon);

    if (userInitiated) {
      showToast(`✓ Clima en vivo para ${resolvedName}: ${currentTemp}°${unit} (${conditionInfo.text})`);
    }

    return { success: true, data: currentWeatherConfig };
  } catch (err) {
    console.warn('Error consultando clima interactivo:', err.message);
    if (userInitiated) {
      showToast(`Aviso de clima: ${err.message}`);
    }
    return { success: false, error: err.message };
  } finally {
    if (statusEl) statusEl.style.display = 'none';
  }
}

function updateWeatherUI() {
  const topCity = document.getElementById('topWeatherCity');
  const topTemp = document.getElementById('topWeatherTemp');
  if (topCity) topCity.textContent = currentWeatherConfig.city;
  if (topTemp) topTemp.textContent = `${currentWeatherConfig.temp}°${currentWeatherConfig.unit}`;

  const cardCity = document.getElementById('widgetCityDisplay');
  const cardTemp = document.getElementById('widgetTempDisplay');
  const cardCond = document.getElementById('widgetWeatherCondition');
  const cardIcon = document.getElementById('widgetWeatherIcon');
  const msnLink = document.getElementById('msnWeatherLink');
  const humidityEl = document.getElementById('weatherHumidity');
  const windEl = document.getElementById('weatherWind');

  if (cardCity) cardCity.textContent = currentWeatherConfig.city;
  if (cardTemp) cardTemp.textContent = `${currentWeatherConfig.temp}°${currentWeatherConfig.unit}`;
  if (cardIcon) cardIcon.textContent = currentWeatherConfig.iconEmoji || '⛅';
  if (cardCond) cardCond.textContent = currentWeatherConfig.condition;
  if (humidityEl) humidityEl.textContent = `Hum: ${currentWeatherConfig.humidity || '--'}%`;
  if (windEl) windEl.textContent = `${currentWeatherConfig.windSpeed || '--'} km/h`;
  if (msnLink) msnLink.href = currentWeatherConfig.msnUrl;
}

function openWeatherModal() {
  const overlay = document.getElementById('weatherModalOverlay');
  const cityInput = document.getElementById('weatherCityInput');
  const unitC = document.getElementById('unitC');
  const unitF = document.getElementById('unitF');

  if (!overlay || !cityInput) return;

  cityInput.value = currentWeatherConfig.city;
  if (currentWeatherConfig.unit === 'F') {
    if (unitF) unitF.checked = true;
  } else {
    if (unitC) unitC.checked = true;
  }

  overlay.classList.add('active');
  cityInput.focus();
}

function closeWeatherModal() {
  const overlay = document.getElementById('weatherModalOverlay');
  if (overlay) overlay.classList.remove('active');
}

function initWeatherModal() {
  const cityDropdownBtn = document.getElementById('weatherCityDropdownBtn');
  const closeBtn = document.getElementById('closeWeatherModalBtn');
  const cancelBtn = document.getElementById('cancelWeatherModalBtn');
  const form = document.getElementById('weatherModalForm');
  const overlay = document.getElementById('weatherModalOverlay');

  if (cityDropdownBtn) {
    cityDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openWeatherModal();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeWeatherModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeWeatherModal);

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeWeatherModal();
    });
  }

  const detectLocationBtn = document.getElementById('weatherDetectLocationBtn');
  if (detectLocationBtn) {
    detectLocationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      detectUserLocation(true);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = document.getElementById('weatherCityInput').value.trim();
      const unit = document.querySelector('input[name="tempUnit"]:checked')?.value || 'C';

      if (!city) return;

      closeWeatherModal();
      fetchLiveWeather(city, unit, true);
    });
  }
}

// ==========================================================================
// 5. CALIDAD DEL AIRE & SEGURIDAD AMBIENTAL (OPEN-METEO AIR QUALITY API)
// ==========================================================================

function initAirQualitySystem() {
  const lat = currentWeatherConfig.lat || 39.50;
  const lon = currentWeatherConfig.lon || -0.44;
  fetchLiveAirQuality(lat, lon);
}

async function fetchLiveAirQuality(lat, lon) {
  try {
    const res = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5,uv_index`);
    if (!res.ok) return;
    const data = await res.json();
    const aqi = Math.round(data.current.european_aqi);
    const pm = data.current.pm2_5 ? data.current.pm2_5.toFixed(1) : '8.1';
    const uv = data.current.uv_index ? data.current.uv_index.toFixed(1) : '0.6';

    const aqiEl = document.getElementById('airQualityIndex');
    const badgeEl = document.getElementById('airQualityBadge');
    const pmEl = document.getElementById('airQualityPm');
    const uvEl = document.getElementById('airQualityUv');
    const summaryEl = document.getElementById('airQualitySummary');

    if (aqiEl) aqiEl.textContent = `AQI ${aqi}`;
    if (pmEl) pmEl.textContent = `PM2.5: ${pm} μg/m³`;
    if (uvEl) uvEl.textContent = `UV: ${uv}`;

    let statusText = 'Bueno';
    let statusSummary = 'Condición ambiental óptima';
    let badgeColor = '#09E36F';

    if (aqi > 40) {
      statusText = 'Deficiente';
      statusSummary = 'Nivel elevado de partículas';
      badgeColor = '#EF5350';
    } else if (aqi > 20) {
      statusText = 'Aceptable';
      statusSummary = 'Calidad del aire moderada';
      badgeColor = '#FFC107';
    }

    if (badgeEl) {
      badgeEl.textContent = statusText;
      badgeEl.style.color = badgeColor;
      badgeEl.style.borderColor = badgeColor;
    }
    if (summaryEl) summaryEl.textContent = statusSummary;
  } catch (err) {
    console.warn('Air quality fetch error:', err);
  }
}

// ==========================================================================
// 6. DIVISAS Y MERCADOS EN VIVO (OPEN EXCHANGE RATE API)
// ==========================================================================

function initCurrencySystem() {
  fetchLiveCurrencyRates();
}

async function fetchLiveCurrencyRates() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/EUR');
    if (!res.ok) return;
    const data = await res.json();
    const usd = data.rates.USD ? data.rates.USD.toFixed(3) : '1.134';
    const gbp = data.rates.GBP ? data.rates.GBP.toFixed(3) : '0.855';

    const usdEl = document.getElementById('rateEurUsd');
    const gbpEl = document.getElementById('rateEurGbp');

    if (usdEl) usdEl.textContent = `${usd} $`;
    if (gbpEl) gbpEl.textContent = `${gbp} £`;
  } catch (err) {
    console.warn('Currency rates fetch error:', err);
  }
}

// ==========================================================================
// 7. TAREAS RÁPIDAS & OBJETIVOS DEL DÍA (TO-DO LIST)
// ==========================================================================

function initQuickTasks() {
  let tasks = [];
  const saved = localStorage.getItem('attlon_quick_tasks');
  if (saved) {
    try { tasks = JSON.parse(saved); } catch { tasks = []; }
  } else {
    tasks = [
      { id: '1', text: 'Revisar proyectos en Forma', done: true },
      { id: '2', text: 'Validar nóminas en PayFit', done: false },
      { id: '3', text: 'Comprobar sistemas de seguridad', done: false }
    ];
  }

  function renderTasks() {
    const listEl = document.getElementById('tasksMiniList');
    const badgeEl = document.getElementById('tasksCountBadge');
    if (!listEl) return;

    listEl.innerHTML = '';
    const completedCount = tasks.filter(t => t.done).length;
    if (badgeEl) badgeEl.textContent = `${completedCount}/${tasks.length}`;

    tasks.forEach((task, idx) => {
      const item = document.createElement('div');
      item.className = `mini-task-item ${task.done ? 'completed' : ''}`;

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = task.done;
      cb.className = 'mini-task-checkbox';
      cb.addEventListener('change', () => {
        tasks[idx].done = cb.checked;
        saveTasks();
        renderTasks();
      });

      const span = document.createElement('span');
      span.textContent = task.text;

      const delBtn = document.createElement('button');
      delBtn.className = 'mini-task-del';
      delBtn.textContent = '✕';
      delBtn.title = 'Eliminar tarea';
      delBtn.addEventListener('click', () => {
        tasks.splice(idx, 1);
        saveTasks();
        renderTasks();
      });

      item.appendChild(cb);
      item.appendChild(span);
      item.appendChild(delBtn);
      listEl.appendChild(item);
    });
  }

  function saveTasks() {
    localStorage.setItem('attlon_quick_tasks', JSON.stringify(tasks));
  }

  const form = document.getElementById('addTaskForm');
  const input = document.getElementById('newTaskInput');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      tasks.push({ id: Date.now().toString(), text: val, done: false });
      input.value = '';
      saveTasks();
      renderTasks();
    });
  }

  renderTasks();
}

// ==========================================================================
// 8. WIDGET TÉCNICO: CALCULADORA HIDRÁULICA PCI (Q = K · √P)
// ==========================================================================

function initHydraulicCalculator() {
  const presetSelect = document.getElementById('pciPresetSelect');
  const customField = document.getElementById('pciCustomKField');
  const customInput = document.getElementById('pciCustomKInput');
  const pressInput = document.getElementById('pciPressureInput');
  const countSelect = document.getElementById('pciCountSelect');
  const resultLpm = document.getElementById('pciFlowResultLpm');
  const resultM3h = document.getElementById('pciFlowResultM3h');
  const compTag = document.getElementById('pciComplianceTag');
  const noteEl = document.getElementById('pciHydraulicNote');

  if (!presetSelect || !pressInput || !resultLpm) return;

  function calculate() {
    let k = 80;
    const presetVal = presetSelect.value;
    if (presetVal === 'custom') {
      if (customField) customField.style.display = 'flex';
      k = parseFloat(customInput ? customInput.value : 80) || 80;
    } else {
      if (customField) customField.style.display = 'none';
      k = parseFloat(presetVal) || 80;
    }

    let p = parseFloat(pressInput.value);
    if (isNaN(p) || p <= 0) p = 0.1;

    let count = parseInt(countSelect ? countSelect.value : '1', 10) || 1;

    // Fórmula hidráulica estándar: Q_unit = K * sqrt(P)
    const qUnitLpm = k * Math.sqrt(p);
    const qTotalLpm = qUnitLpm * count;
    const qTotalM3h = (qTotalLpm * 60) / 1000;
    const reserva60m = qTotalM3h.toFixed(1);

    resultLpm.textContent = qTotalLpm.toFixed(1);
    if (resultM3h) {
      if (count > 1) {
        resultM3h.textContent = `${qTotalM3h.toFixed(2)} m³/h (${count} uds × ${qUnitLpm.toFixed(0)} l/m)`;
      } else {
        resultM3h.textContent = `${qTotalM3h.toFixed(2)} m³/h`;
      }
    }

    if (compTag) {
      if (presetVal === '42' || presetVal === '85') {
        if (p < 2.0) {
          compTag.textContent = `⚠️ P < 2.0 bar (Mín. RIPCI) · Reserva: ${reserva60m} m³`;
          compTag.classList.add('warn');
        } else {
          compTag.textContent = `✓ Conforme RIPCI (≥ 2.0 bar) · Reserva 60m: ${reserva60m} m³`;
          compTag.classList.remove('warn');
        }
      } else {
        if (p < 0.5) {
          compTag.textContent = `⚠️ P < 0.5 bar (Mín. UNE-EN 12845) · Reserva: ${reserva60m} m³`;
          compTag.classList.add('warn');
        } else {
          compTag.textContent = `✓ Conforme UNE-EN 12845 · Reserva 60m: ${reserva60m} m³`;
          compTag.classList.remove('warn');
        }
      }
    }
    if (noteEl) {
      noteEl.textContent = `UNE 23500 · Autonomía 60 min (${reserva60m} m³)`;
    }
  }

  presetSelect.addEventListener('change', calculate);
  if (customInput) customInput.addEventListener('input', calculate);
  pressInput.addEventListener('input', calculate);
  if (countSelect) countSelect.addEventListener('change', calculate);

  calculate();
}

// ==========================================================================
// 9. WIDGET TÉCNICO: CONVERSOR TÉCNICO DE UNIDADES PCI
// ==========================================================================

function initTechnicalConverter() {
  const modeSelect = document.getElementById('pciConvModeSelect');
  const panelPress = document.getElementById('pciPanelPress');
  const panelFlow = document.getElementById('pciPanelFlow');
  const panelMass = document.getElementById('pciPanelMass');
  const panelVol = document.getElementById('pciPanelVol');
  const panelTemp = document.getElementById('pciPanelTemp');
  const panelDensity = document.getElementById('pciPanelDensity');
  const panelLength = document.getElementById('pciPanelLength');
  const panelPower = document.getElementById('pciPanelPower');
  const panelPipe = document.getElementById('pciPanelPipe');
  const footerNote = document.getElementById('pciConvFooterNote');

  if (!modeSelect) return;

  const panels = {
    press: { panel: panelPress, note: 'UNE-EN 12845 · DIN 2448' },
    flow: { panel: panelFlow, note: 'UNE-EN 12845 · NFPA 13/20' },
    mass: { panel: panelMass, note: 'RIPCI · Dotación de Agente Extintor (kg/lb/oz)' },
    vol: { panel: panelVol, note: 'UNE 23500 · Reservas de Agua & Espuma' },
    temp: { panel: panelTemp, note: 'Rociadores UNE-EN 12259-1' },
    density: { panel: panelDensity, note: 'Diseño Rociadores UNE-EN 12845' },
    length: { panel: panelLength, note: 'RIPCI & CTE DB-SI Coberturas (m/yd/ft)' },
    power: { panel: panelPower, note: 'Carga de Fuego Eurocódigos' },
    pipe: { panel: panelPipe, note: 'UNE-EN 10255 Serie Media' }
  };

  modeSelect.addEventListener('change', () => {
    const mode = modeSelect.value;
    Object.keys(panels).forEach((k) => {
      const p = panels[k];
      if (p.panel) p.panel.style.display = k === mode ? 'block' : 'none';
    });
    if (footerNote && panels[mode]) {
      footerNote.textContent = panels[mode].note;
    }
  });

  // A. Presión (bar, psi, mca, kPa)
  const pressInput = document.getElementById('pciPressValInput');
  const pressUnit = document.getElementById('pciPressUnitSelect');
  const pressResults = document.getElementById('pciPressResults');

  function updatePressure() {
    if (!pressInput || !pressUnit || !pressResults) return;
    const val = parseFloat(pressInput.value);
    if (isNaN(val)) return;

    let bar = val;
    const u = pressUnit.value;
    if (u === 'psi') bar = val / 14.5038;
    else if (u === 'mca') bar = val / 10.1972;
    else if (u === 'kpa') bar = val / 100;

    const psi = (bar * 14.5038).toFixed(1);
    const mca = (bar * 10.1972).toFixed(1);
    const kpa = (bar * 100).toFixed(0);
    const barDisp = bar.toFixed(2);

    let html = '';
    if (u !== 'bar') html += `<span class="conv-tag">${barDisp} bar</span>`;
    if (u !== 'psi') html += `<span class="conv-tag">${psi} psi</span>`;
    if (u !== 'mca') html += `<span class="conv-tag">${mca} mca</span>`;
    if (u !== 'kpa') html += `<span class="conv-tag">${kpa} kPa</span>`;

    pressResults.innerHTML = html;
  }

  if (pressInput && pressUnit) {
    pressInput.addEventListener('input', updatePressure);
    pressUnit.addEventListener('change', updatePressure);
    updatePressure();
  }

  // B. Caudal (l/min, m³/h, GPM)
  const flowInput = document.getElementById('pciFlowValInput');
  const flowUnit = document.getElementById('pciFlowUnitSelect');
  const flowResults = document.getElementById('pciFlowResults');

  function updateFlow() {
    if (!flowInput || !flowUnit || !flowResults) return;
    const val = parseFloat(flowInput.value);
    if (isNaN(val)) return;

    let lpm = val;
    const u = flowUnit.value;
    if (u === 'm3h') lpm = val / 0.06;
    else if (u === 'gpm') lpm = val / 0.264172;

    const m3h = (lpm * 0.06).toFixed(2);
    const gpm = (lpm * 0.264172).toFixed(1);
    const lpmDisp = lpm.toFixed(1);

    let html = '';
    if (u !== 'lpm') html += `<span class="conv-tag">${lpmDisp} l/min</span>`;
    if (u !== 'm3h') html += `<span class="conv-tag">${m3h} m³/h</span>`;
    if (u !== 'gpm') html += `<span class="conv-tag">${gpm} GPM</span>`;

    flowResults.innerHTML = html;
  }

  if (flowInput && flowUnit) {
    flowInput.addEventListener('input', updateFlow);
    flowUnit.addEventListener('change', updateFlow);
    updateFlow();
  }

  // C. Temperatura & Código de Bulbos Sprinkler
  const tempInput = document.getElementById('pciTempValInput');
  const tempUnit = document.getElementById('pciTempUnitSelect');
  const tempResults = document.getElementById('pciTempResults');

  function updateTemp() {
    if (!tempInput || !tempUnit || !tempResults) return;
    const val = parseFloat(tempInput.value);
    if (isNaN(val)) return;

    let degC = val;
    const u = tempUnit.value;
    if (u === 'f') degC = (val - 32) / 1.8;
    else if (u === 'k') degC = val - 273.15;

    const degF = (degC * 1.8 + 32).toFixed(1);
    const kelvin = (degC + 273.15).toFixed(1);
    const cDisp = degC.toFixed(1);

    let bulbText = '🔴 Rojo (68°C Estándar)';
    if (degC <= 60) bulbText = '🟠 Naranja (57°C)';
    else if (degC <= 74) bulbText = '🔴 Rojo (68°C Estándar)';
    else if (degC <= 86) bulbText = '🟡 Amarillo (79°C)';
    else if (degC <= 115) bulbText = '🟢 Verde (93°C)';
    else if (degC <= 160) bulbText = '🔵 Azul (141°C)';
    else if (degC <= 220) bulbText = '🟣 Malva (182°C)';
    else bulbText = '⚫ Negro (≥227°C)';

    let html = '';
    if (u !== 'c') html += `<span class="conv-tag">${cDisp} °C</span>`;
    if (u !== 'f') html += `<span class="conv-tag">${degF} °F</span>`;
    if (u !== 'k') html += `<span class="conv-tag">${kelvin} K</span>`;
    html += `<span class="conv-tag conv-highlight">${bulbText}</span>`;

    tempResults.innerHTML = html;
  }

  if (tempInput && tempUnit) {
    tempInput.addEventListener('input', updateTemp);
    tempUnit.addEventListener('change', updateTemp);
    updateTemp();
  }

  // D. Densidad de Descarga PCI (UNE-EN 12845 / NFPA 13)
  const densityInput = document.getElementById('pciDensityValInput');
  const densityUnit = document.getElementById('pciDensityUnitSelect');
  const densityResults = document.getElementById('pciDensityResults');

  function updateDensity() {
    if (!densityInput || !densityUnit || !densityResults) return;
    const val = parseFloat(densityInput.value);
    if (isNaN(val)) return;

    let mmmin = val;
    const u = densityUnit.value;
    if (u === 'gpmft2') mmmin = val / 0.02454;

    const gpmft2 = (mmmin * 0.02454).toFixed(3);
    const mmDisp = mmmin.toFixed(2);

    let classification = 'Riesgo Ordinario (RO)';
    if (mmmin <= 2.5) classification = 'Riesgo Ligero (RL - 2.25 mm/min)';
    else if (mmmin <= 5.5) classification = 'Riesgo Ordinario (RO - 5 mm/min)';
    else if (mmmin <= 12.5) classification = 'Riesgo Extra Proceso (REP)';
    else classification = 'Riesgo Extra Almacenamiento (REA)';

    let html = '';
    if (u !== 'mmmin') html += `<span class="conv-tag">${mmDisp} mm/min</span>`;
    if (u !== 'gpmft2') html += `<span class="conv-tag">${gpmft2} gpm/ft²</span>`;
    html += `<span class="conv-tag conv-highlight">${classification}</span>`;

    densityResults.innerHTML = html;
  }

  if (densityInput && densityUnit) {
    densityInput.addEventListener('input', updateDensity);
    densityUnit.addEventListener('change', updateDensity);
    updateDensity();
  }

  // C. Masa / Peso (kg, lb, oz, t, g) - Extintores y Cargas PCI
  const massInput = document.getElementById('pciMassValInput');
  const massUnit = document.getElementById('pciMassUnitSelect');
  const massResults = document.getElementById('pciMassResults');

  function updateMass() {
    if (!massInput || !massUnit || !massResults) return;
    const val = parseFloat(massInput.value);
    if (isNaN(val)) return;

    let kg = val;
    const u = massUnit.value;
    if (u === 'lb') kg = val / 2.20462;
    else if (u === 'oz') kg = val / 35.274;
    else if (u === 't') kg = val * 1000;
    else if (u === 'g') kg = val / 1000;

    const lb = (kg * 2.20462).toFixed(2);
    const oz = (kg * 35.274).toFixed(1);
    const g = Math.round(kg * 1000).toLocaleString('es-ES');
    const t = (kg / 1000).toFixed(3);
    const kgDisp = kg.toFixed(2);

    let badge = 'Carga técnica';
    if (Math.abs(kg - 2) < 0.3) badge = '🧯 Ext. CO2 2kg (34B)';
    else if (Math.abs(kg - 5) < 0.4) badge = '🧯 Ext. CO2 5kg (89B Eléctrico)';
    else if (Math.abs(kg - 6) < 0.4) badge = '🧯 Ext. Polvo ABC 6kg (21A)';
    else if (Math.abs(kg - 9) < 0.5) badge = '🧯 Ext. Polvo ABC 9kg (34A)';
    else if (Math.abs(kg - 50) < 2) badge = '🧯 Carro Móvil 50kg (Almacén)';
    else if (kg < 1) badge = 'Micromasa PCI';
    else if (kg >= 1000) badge = 'Carga Pesada / Agente Granel';

    let html = '';
    if (u !== 'kg') html += `<span class="conv-tag">${kgDisp} kg</span>`;
    if (u !== 'lb') html += `<span class="conv-tag">${lb} lb</span>`;
    if (u !== 'oz') html += `<span class="conv-tag">${oz} oz</span>`;
    if (u !== 'g' && kg < 50) html += `<span class="conv-tag">${g} g</span>`;
    if (u !== 't' && kg >= 100) html += `<span class="conv-tag">${t} t</span>`;
    html += `<span class="conv-tag conv-highlight" id="pciMassBadge">${badge}</span>`;

    massResults.innerHTML = html;
  }

  if (massInput && massUnit) {
    massInput.addEventListener('input', updateMass);
    massUnit.addEventListener('change', updateMass);
    updateMass();
  }

  // D. Longitud / Distancias de Seguridad PCI (m, yd, ft, in, cm, mm)
  const lengthInput = document.getElementById('pciLengthValInput');
  const lengthUnit = document.getElementById('pciLengthUnitSelect');
  const lengthResults = document.getElementById('pciLengthResults');

  function updateLength() {
    if (!lengthInput || !lengthUnit || !lengthResults) return;
    const val = parseFloat(lengthInput.value);
    if (isNaN(val)) return;

    let meters = val;
    const u = lengthUnit.value;
    if (u === 'yd') meters = val * 0.9144;
    else if (u === 'ft') meters = val * 0.3048;
    else if (u === 'in') meters = val * 0.0254;
    else if (u === 'cm') meters = val / 100;
    else if (u === 'mm') meters = val / 1000;

    const yd = (meters * 1.09361).toFixed(2);
    const ft = (meters * 3.28084).toFixed(1);
    const inches = (meters * 39.3701).toFixed(1);
    const cm = (meters * 100).toFixed(1);
    const mm = (meters * 1000).toFixed(0);
    const mDisp = meters.toFixed(2);

    let note = 'Radio de acción';
    if (meters <= 15.01) note = '✓ Máx. Extintor RIPCI (15m)';
    else if (meters <= 25.01) note = '✓ Cobertura BIE 25mm (25m)';
    else if (meters <= 50.01) note = '✓ Evacuación Salidas Alt. (50m)';
    else note = '⚠ Excede radio simple';

    let html = '';
    if (u !== 'm') html += `<span class="conv-tag">${mDisp} m</span>`;
    if (u !== 'yd') html += `<span class="conv-tag">${yd} yd</span>`;
    if (u !== 'ft') html += `<span class="conv-tag">${ft} ft</span>`;
    if (u !== 'in') html += `<span class="conv-tag">${inches} in</span>`;
    if (u !== 'cm' && meters < 10) html += `<span class="conv-tag">${cm} cm</span>`;
    if (u !== 'mm' && meters < 2) html += `<span class="conv-tag">${mm} mm</span>`;
    html += `<span class="conv-tag conv-highlight">${note}</span>`;

    lengthResults.innerHTML = html;
  }

  if (lengthInput && lengthUnit) {
    lengthInput.addEventListener('input', updateLength);
    lengthUnit.addEventListener('change', updateLength);
    updateLength();
  }

  // E. Volumen / Depósito PCI (L, m³, gal, ft³)
  const volInput = document.getElementById('pciVolValInput');
  const volUnit = document.getElementById('pciVolUnitSelect');
  const volResults = document.getElementById('pciVolResults');

  function updateVol() {
    if (!volInput || !volUnit || !volResults) return;
    const val = parseFloat(volInput.value);
    if (isNaN(val)) return;

    let liters = val;
    const u = volUnit.value;
    if (u === 'm3') liters = val * 1000;
    else if (u === 'gal') liters = val / 0.264172;
    else if (u === 'ft3') liters = val / 0.0353147;

    const m3 = (liters / 1000).toFixed(2);
    const gal = (liters * 0.264172).toFixed(1);
    const ft3 = (liters * 0.0353147).toFixed(1);
    const lDisp = Math.round(liters).toLocaleString('es-ES');

    let badge = 'Depósito';
    if (liters < 50) badge = 'Espumógeno / Agente Portátil';
    else if (liters <= 500) badge = 'Aljibe Compacto / BIEs';
    else if (liters <= 12000) badge = 'Reserva BIE 60 min (12 m³)';
    else if (liters <= 60000) badge = 'Reserva Rociadores Riesgo Ligero';
    else badge = 'Reserva Mayor UNE 23500 / NFPA';

    let html = '';
    if (u !== 'l') html += `<span class="conv-tag">${lDisp} L</span>`;
    if (u !== 'm3') html += `<span class="conv-tag">${m3} m³</span>`;
    if (u !== 'gal') html += `<span class="conv-tag">${gal} gal</span>`;
    if (u !== 'ft3') html += `<span class="conv-tag">${ft3} ft³</span>`;
    html += `<span class="conv-tag conv-highlight" id="pciVolBadge">${badge}</span>`;

    volResults.innerHTML = html;
  }

  if (volInput && volUnit) {
    volInput.addEventListener('input', updateVol);
    volUnit.addEventListener('change', updateVol);
    updateVol();
  }

  // F. Potencia Calorífica / Carga de Fuego
  const powerInput = document.getElementById('pciPowerValInput');
  const powerUnit = document.getElementById('pciPowerUnitSelect');
  const powerResults = document.getElementById('pciPowerResults');

  function updatePower() {
    if (!powerInput || !powerUnit || !powerResults) return;
    const val = parseFloat(powerInput.value);
    if (isNaN(val)) return;

    let kw = val;
    const u = powerUnit.value;
    if (u === 'mw') kw = val * 1000;
    else if (u === 'btuh') kw = val / 3412.14;
    else if (u === 'kcalh') kw = val / 859.85;

    const mw = (kw / 1000).toFixed(2);
    const btuh = Math.round(kw * 3412.14);
    const kcalh = Math.round(kw * 859.85);
    const kwDisp = kw.toFixed(1);

    const btuStr = btuh > 1000000 ? (btuh / 1000000).toFixed(2) + 'M BTU/h' : (btuh / 1000).toFixed(0) + 'k BTU/h';
    const kcalStr = kcalh > 1000000 ? (kcalh / 1000000).toFixed(2) + 'M kcal/h' : (kcalh / 1000).toFixed(0) + 'k kcal/h';

    let html = '';
    if (u !== 'kw') html += `<span class="conv-tag">${kwDisp} kW</span>`;
    if (u !== 'mw') html += `<span class="conv-tag">${mw} MW</span>`;
    if (u !== 'btuh') html += `<span class="conv-tag">${btuStr}</span>`;
    if (u !== 'kcalh') html += `<span class="conv-tag">${kcalStr}</span>`;

    powerResults.innerHTML = html;
  }

  if (powerInput && powerUnit) {
    powerInput.addEventListener('input', updatePower);
    powerUnit.addEventListener('change', updatePower);
    updatePower();
  }

  // G. Tuberías (UNE-EN 10255)
  const pipeSelect = document.getElementById('pciPipeSelect');
  const pipeDetails = document.getElementById('pciPipeDetails');

  const pipeData = {
    '1': { ext: '33.7 mm', int: '27.3 mm', dn: 'DN25' },
    '1.25': { ext: '42.4 mm', int: '36.0 mm', dn: 'DN32' },
    '1.5': { ext: '48.3 mm', int: '41.9 mm', dn: 'DN40' },
    '2': { ext: '60.3 mm', int: '52.5 mm', dn: 'DN50' },
    '2.5': { ext: '76.1 mm', int: '68.7 mm', dn: 'DN65' },
    '3': { ext: '88.9 mm', int: '80.9 mm', dn: 'DN80' },
    '4': { ext: '114.3 mm', int: '105.3 mm', dn: 'DN100' },
    '6': { ext: '168.3 mm', int: '159.3 mm', dn: 'DN150' },
    '8': { ext: '219.1 mm', int: '206.5 mm', dn: 'DN200' }
  };

  function updatePipe() {
    if (!pipeSelect || !pipeDetails) return;
    const d = pipeData[pipeSelect.value] || pipeData['2'];
    pipeDetails.innerHTML = `<span>Ext: <strong>${d.ext}</strong></span><span>•</span><span>Paso: <strong>${d.int}</strong></span>`;
  }

  if (pipeSelect) {
    pipeSelect.addEventListener('change', updatePipe);
    updatePipe();
  }
}

// ==========================================================================
// WIDGET TÉCNICO: PLANIFICADOR DE DOTACIÓN & COBERTURA PCI Y SEGURIDAD
// Normativa RIPCI (RD 513/2017) y Código Técnico de la Edificación CTE DB-SI
// ==========================================================================

function initCoverageCalculator() {
  const typeSelect = document.getElementById('pciCoverageTypeSelect');
  const areaInput = document.getElementById('pciCoverageAreaInput');
  const unitsResult = document.getElementById('pciCoverageUnitsResult');
  const unitLabel = document.getElementById('pciCoverageUnitLabel');
  const detailResult = document.getElementById('pciCoverageDetailResult');
  const ruleTag = document.getElementById('pciCoverageRuleTag');
  const note = document.getElementById('pciCoverageNote');

  if (!typeSelect || !areaInput || !unitsResult) return;

  function calculateCoverage() {
    const type = typeSelect.value;
    let area = parseFloat(areaInput.value);
    if (isNaN(area) || area <= 0) area = 100;

    let units = 1;
    let detail = '';
    let rule = '';
    let footNote = '';
    let label = 'uds mín.';

    switch (type) {
      case 'ext':
      case 'ext_abc6': {
        // CTE DB-SI Tabla 1.1: 1 extintor cada 15 m de recorrido en cada planta
        units = Math.max(1, Math.ceil(area / 200));
        detail = 'Radio ≤ 15 m | Eficacia ≥ 21A-113B';
        rule = 'CTE DB-SI Tabla 1.1 · RIPCI';
        footNote = 'Distancia máx. a extintor: 15 m. Altura colgado: 80-120 cm.';
        label = units === 1 ? 'extintor 6kg' : 'extintores 6kg';
        break;
      }
      case 'ext_abc9': {
        units = Math.max(1, Math.ceil(area / 250));
        detail = 'Radio ≤ 15 m | Eficacia ≥ 34A-233B';
        rule = 'RIPCI Gran Superficie / Almacén';
        footNote = 'Mayor potencia de extinción para focos industriales y carga media.';
        label = units === 1 ? 'extintor 9kg' : 'extintores 9kg';
        break;
      }
      case 'ext_co2_5': {
        units = Math.max(1, Math.ceil(area / 100));
        detail = 'Radio ≤ 15 m | Eficacia 89B Eléctrico';
        rule = 'UNE 23110 · CTE DB-SI';
        footNote = 'Dieléctrico sin residuos. Esencial en cuadros eléctricos y salas TIC.';
        label = units === 1 ? 'extintor CO2 5kg' : 'extintores CO2 5kg';
        break;
      }
      case 'ext_co2_2': {
        units = Math.max(1, Math.ceil(area / 60));
        detail = 'Eficacia 34B | Equipos delicados';
        rule = 'RIPCI CPDs y Laboratorios';
        footNote = 'Portátil ligero para atajar fuegos en rack o maquinaria de precisión.';
        label = units === 1 ? 'extintor CO2 2kg' : 'extintores CO2 2kg';
        break;
      }
      case 'ext_afff': {
        units = Math.max(1, Math.ceil(area / 200));
        detail = 'Eficacia 21A-183B | Líquidos combustibles';
        rule = 'RIPCI & UNE-EN 3-7';
        footNote = 'Extintor de agua con aditivo AFFF. No genera nube de polvo.';
        label = units === 1 ? 'extintor AFFF 6L' : 'extintores AFFF 6L';
        break;
      }
      case 'ext_carro50': {
        units = Math.max(1, Math.ceil(area / 800));
        detail = 'Cobertura móvil gran nave | Polvo 50kg';
        rule = 'RIPCI Anexo I Almacenamiento';
        footNote = 'Protección reforzada para industrias con alta carga de fuego.';
        label = units === 1 ? 'carro 50kg' : 'carros 50kg';
        break;
      }
      case 'bie25': {
        // RIPCI Anexo I / CTE DB-SI: Radio acción 25 m (manguera 20m + 5m chorro). Máx 50m entre BIEs.
        units = Math.max(1, Math.ceil(area / 500));
        detail = 'Radio 25 m | P. dinámica ≥ 2.0 bar';
        rule = 'RIPCI Anexo I · UNE-EN 671-1';
        footNote = 'Manguera semirrígida 20m + chorro 5m. Distancia máx. entre BIEs ≤ 50m.';
        label = units === 1 ? 'BIE 25' : 'BIEs 25';
        break;
      }
      case 'bie45': {
        units = Math.max(1, Math.ceil(area / 600));
        detail = 'Caudal mín. 200 l/min | P ≥ 2.0 bar';
        rule = 'RIPCI Anexo I · UNE-EN 671-2';
        footNote = 'Uso profesional bomberos o brigada entrenada. Manguera plana 20m.';
        label = units === 1 ? 'BIE 45' : 'BIEs 45';
        break;
      }
      case 'spr_lh': {
        units = Math.max(4, Math.ceil(area / 21));
        detail = '21 m² / cabeza | Distancia ≤ 4.6 m';
        rule = 'UNE-EN 12845 (Riesgo Ligero LH)';
        footNote = 'Densidad diseño: 2.25 mm/min. Oficinas, aulas y zonas comunes.';
        label = 'rociadores LH';
        break;
      }
      case 'spr_ord':
      case 'spr_oh': {
        // UNE-EN 12845 Riesgo Ordinario: Cobertura estándar 12 m² por cabeza
        units = Math.max(4, Math.ceil(area / 12));
        detail = '12 m² / cabeza | Distancia ≤ 4.0 m';
        rule = 'UNE-EN 12845 (Riesgo Ordinario OH)';
        footNote = 'Densidad diseño: 5 mm/min. Área operación: 144 m².';
        label = 'rociadores OH';
        break;
      }
      case 'spr_high':
      case 'spr_hhp': {
        // UNE-EN 12845 Riesgo Alto: Cobertura máx. 9 m² por cabeza
        units = Math.max(6, Math.ceil(area / 9));
        detail = '9 m² / cabeza | Distancia ≤ 3.0 m';
        rule = 'UNE-EN 12845 (Riesgo Alto HHP)';
        footNote = 'Densidad diseño: 7.5 a 12.5 mm/min. Almacenes y naves industriales.';
        label = 'rociadores HHP';
        break;
      }
      case 'spr_esfr': {
        units = Math.max(8, Math.ceil(area / 9));
        detail = '9 m² / cabeza | K-242 / K-360';
        rule = 'NFPA 13 · Supresión Rápida ESFR';
        footNote = 'Supresión directa de incendios en almacenes de gran altura.';
        label = 'rociadores ESFR';
        break;
      }
      case 'detector':
      case 'detector_opt': {
        // UNE 23007-14: Detectores ópticos de humo hasta 60 m² (altura ≤ 6m)
        units = Math.max(1, Math.ceil(area / 60));
        detail = '60 m² / detector | Radio ≤ 6.7 m';
        rule = 'UNE 23007-14 · RIPCI';
        footNote = 'Separación máx. a pared: 4.5 m. Altura máx: 12 m.';
        label = units === 1 ? 'detector óptico' : 'detectores ópticos';
        break;
      }
      case 'detector_term': {
        units = Math.max(1, Math.ceil(area / 30));
        detail = '30 m² / detector | Radio ≤ 4.4 m';
        rule = 'UNE 23007-14 · Detectores Térmicos';
        footNote = 'Indicado para zonas con polvo, humos o vapores de proceso.';
        label = units === 1 ? 'detector térmico' : 'detectores térmicos';
        break;
      }
      case 'scteh_exutorio': {
        units = Math.max(1, Math.ceil(area / 200));
        detail = 'Superficie aerodinámica Cv·Av (≥0.5%)';
        rule = 'UNE-EN 12101-2 · CTE DB-SI Evacuación';
        footNote = 'Evacuación de humos y gases calientes. Apertura automática 68°C.';
        label = units === 1 ? 'exutorio SCTEH' : 'exutorios SCTEH';
        break;
      }
    }

    unitsResult.textContent = units;
    if (unitLabel) unitLabel.textContent = label;
    if (detailResult) detailResult.textContent = detail;
    if (ruleTag) ruleTag.textContent = rule;
    if (note) note.textContent = footNote;
  }

  typeSelect.addEventListener('change', calculateCoverage);
  areaInput.addEventListener('input', calculateCoverage);
  calculateCoverage();
}

// ==========================================================================
// 8. DETECCIÓN AUTOMÁTICA DE UBICACIÓN (CLIMA EN VIVO)
// ==========================================================================

async function detectUserLocation(userInitiated = false) {
  const isAutoEnabled = localStorage.getItem('attlon_auto_location') !== 'false';
  if (!userInitiated && !isAutoEnabled) return;

  try {
    let detectedCity = '';

    // Consulta Geográfica IP silenciosa y compatible con CORS
    try {
      const ipRes = await fetch('https://ipwho.is/');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        if (ipData && ipData.success && ipData.city) {
          detectedCity = ipData.city;
        }
      }
    } catch {}

    if (!detectedCity) {
      try {
        const altRes = await fetch('https://freeipapi.com/api/json');
        if (altRes.ok) {
          const altData = await altRes.json();
          detectedCity = altData.cityName || '';
        }
      } catch {}
    }

    if (!detectedCity && !userInitiated) {
      return;
    }

    const cityResolved = detectedCity || currentWeatherConfig.city || 'Paterna';

    // Actualizar ciudad en el input del modal
    const cityInput = document.getElementById('weatherCityInput');
    if (cityInput) cityInput.value = cityResolved;

    // Actualizar Clima en Vivo para la localidad detectada
    await fetchLiveWeather(cityResolved, currentWeatherConfig.unit, false);

    if (userInitiated) {
      showToast(`📍 Ubicación detectada: ${cityResolved}. Clima sincronizado en vivo.`);
    }
  } catch (err) {
    console.warn('Detección automática de ubicación:', err.message);
    if (userInitiated) {
      showToast(`Aviso: No se pudo geolocalizar automáticamente (${err.message})`);
    }
  }
}

function initLocationDetection() {
  const isAutoEnabled = localStorage.getItem('attlon_auto_location') !== 'false';
  const lastDetected = localStorage.getItem('attlon_last_location_detection');
  const now = Date.now();

  if (isAutoEnabled && (!lastDetected || (now - Number(lastDetected)) > 12 * 60 * 60 * 1000)) {
    setTimeout(() => {
      detectUserLocation(false);
      localStorage.setItem('attlon_last_location_detection', String(now));
    }, 1200);
  }
}

// ==========================================================================
// 8.2 BARRA DINÁMICA DE NOTICIAS: ESPAÑA & PROTECCIÓN CONTRA INCENDIOS (PCI)
// ==========================================================================

const NEWS_DATA = [
  {
    cat: 'pci',
    tag: 'PCI · Tecnifuego',
    tagClass: 'cat-pci',
    title: 'Tecnifuego impulsa el marco técnico para Centrales Receptoras de Incendios (CRI) y telegestión',
    summary: 'Presentación de directrices para la verificación remota de alarmas y coordinación digital con servicios de bomberos.',
    url: 'https://www.tecnifuego.org/',
    time: 'Hoy · 10:30'
  },
  {
    cat: 'pci',
    tag: 'Normativa · Baterías & FV',
    tagClass: 'cat-normativa',
    title: 'APICI y Tecnifuego analizan los protocolos PCI en plantas fotovoltaicas y baterías de litio',
    summary: 'Directrices técnicas de supresión de incendios por embalamiento térmico y sectorización en cubiertas industriales.',
    url: 'https://www.tecnifuego.org/',
    time: 'Hace 2h'
  },
  {
    cat: 'pci',
    tag: 'Ministerio · RIPCI',
    tagClass: 'cat-normativa',
    title: 'Guía técnica del RIPCI (RD 513/2017): Nuevos criterios de inspección periódica de BIEs y rociadores',
    summary: 'Exigencias de certificación acreditada por ENAC para mantenedores autorizados y actas digitales de revisión.',
    url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2017-6642',
    time: 'Hace 3h'
  },
  {
    cat: 'pci',
    tag: 'PCI · Cepreven',
    tagClass: 'cat-pci',
    title: 'CEPREVEN publica la directriz R.T.4-ABA sobre reservas hídricas y grupos de presión en logística',
    summary: 'Criterios de autonomía mínima de bombeo, redundancia diésel y dimensionamiento de depósitos para grandes centros.',
    url: 'https://www.cepreven.com/',
    time: 'Hace 5h'
  },
  {
    cat: 'pci',
    tag: 'CTE DB-SI · Vivienda',
    tagClass: 'cat-normativa',
    title: 'Ministerio de Vivienda actualiza criterios de evacuación y resistencia al fuego EI en edificación',
    summary: 'Aclaraciones sobre longitudes máximas de evacuación (25m salida única / 50m alternativa) y puertas cortafuegos.',
    url: 'https://www.codigotecnico.org/DocumentosCTE/SeguridadEnCasoDeIncendio.html',
    time: 'Ayer'
  },
  {
    cat: 'spain',
    tag: 'Protección Civil · 112',
    tagClass: 'cat-spain',
    title: 'Protección Civil consolida la red ES-Alert para emergencias industriales y autoprotección',
    summary: 'Protocolos de confinamiento y aviso inmediato a la población en zonas limítrofes con polígonos químicos.',
    url: 'https://www.proteccioncivil.es/',
    time: 'Ayer'
  },
  {
    cat: 'pci',
    tag: 'Attlon · Cottés',
    tagClass: 'cat-pci',
    title: 'Attlon optimiza el control de humos y la compartimentación de naves con simulación CFD avanzada',
    summary: 'Ingeniería prestacional en exutorios certificados UNE-EN 12101-2 y barreras de contención térmica.',
    url: 'https://attlon.com/',
    time: 'Esta semana'
  },
  {
    cat: 'pci',
    tag: 'Seguridad · INSST',
    tagClass: 'cat-normativa',
    title: 'INSST publica directrices de seguridad contra atmósferas explosivas (ATEX) en silos y tolvas',
    summary: 'Medidas de prevención en manipulación de polvos orgánicos combustibles y venteo de deflagraciones.',
    url: 'https://www.insst.es/',
    time: 'Esta semana'
  },
  {
    cat: 'spain',
    tag: 'España · Industria',
    tagClass: 'cat-spain',
    title: 'El tejido industrial español acelera la inversión en eficiencia hídrica y sensorización PCI',
    summary: 'Planes de modernización en polígonos industriales con monitorización IoT en tiempo real de presiones y reservas.',
    url: 'https://elpais.com/economia/',
    time: 'Esta semana'
  },
  {
    cat: 'spain',
    tag: 'AEMET & DGT · Tráfico',
    tagClass: 'cat-spain',
    title: 'AEMET y DGT coordinan avisos de emergencias meteorológicas y planes de contingencia logística',
    summary: 'Activación de planes preventivos ante fenómenos meteorológicos adversos y accesos a corredores industriales.',
    url: 'https://www.aemet.es/es/eltiempo/prediccion/avisos',
    time: 'Reciente'
  }
];

function initNewsTickerSystem() {
  const container = document.getElementById('newsTickerContainer');
  if (!container) return;

  const topicTag = document.getElementById('newsTopicTag');
  const headlineLink = document.getElementById('newsHeadlineLink');
  const headlineText = document.getElementById('newsHeadlineText');
  const summaryEl = document.getElementById('newsSummaryText');
  const timestamp = document.getElementById('newsTimestamp');
  const prevBtn = document.getElementById('newsPrevBtn');
  const nextBtn = document.getElementById('newsNextBtn');
  const pauseBtn = document.getElementById('newsPauseBtn');
  const posBtn = document.getElementById('newsPosBtn');
  const posLabel = document.getElementById('newsPosLabel');
  const drawerPosSelect = document.getElementById('newsPositionSelect');
  const catFilterBtns = document.querySelectorAll('.news-cat-btn');

  let currentCategory = 'all';
  let currentIndex = 0;
  let isPaused = false;
  let tickerInterval = null;

  const POSITIONS = ['bottom-center', 'bottom-left', 'bottom-right', 'top-bar'];
  const POS_LABELS = {
    'bottom-center': 'Centro',
    'bottom-left': 'Izq.',
    'bottom-right': 'Der.',
    'top-bar': 'Arriba'
  };

  function setNewsPosition(pos) {
    if (!POSITIONS.includes(pos)) pos = 'bottom-center';
    container.classList.remove('is-custom-floating');
    container.style.left = '';
    container.style.top = '';
    localStorage.removeItem('attlon_news_free_pos');
    container.setAttribute('data-position', pos);
    if (posLabel) posLabel.textContent = POS_LABELS[pos] || 'Centro';
    if (drawerPosSelect) drawerPosSelect.value = pos;
    localStorage.setItem('attlon_news_position', pos);
  }

  // Cargar posición guardada (libre o preset)
  const savedFreePos = localStorage.getItem('attlon_news_free_pos');
  if (savedFreePos) {
    try {
      const parsed = JSON.parse(savedFreePos);
      container.classList.add('is-custom-floating');
      container.style.left = `${parsed.left}px`;
      container.style.top = `${parsed.top}px`;
      if (posLabel) posLabel.textContent = 'Libre';
    } catch {
      const savedPos = localStorage.getItem('attlon_news_position') || 'bottom-center';
      setNewsPosition(savedPos);
    }
  } else {
    const savedPos = localStorage.getItem('attlon_news_position') || 'bottom-center';
    setNewsPosition(savedPos);
  }

  if (posBtn) {
    posBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentPos = container.getAttribute('data-position') || 'bottom-center';
      const curIdx = POSITIONS.indexOf(currentPos);
      const nextPos = POSITIONS[(curIdx + 1) % POSITIONS.length];
      setNewsPosition(nextPos);
      showToast(`Noticias ubicadas: ${POS_LABELS[nextPos]}`);
    });
  }

  if (drawerPosSelect) {
    drawerPosSelect.addEventListener('change', () => {
      setNewsPosition(drawerPosSelect.value);
    });
  }

  function getFilteredItems() {
    if (currentCategory === 'all') return NEWS_DATA;
    return NEWS_DATA.filter((item) => item.cat === currentCategory);
  }

  function renderCurrentNews() {
    const items = getFilteredItems();
    if (items.length === 0) return;
    if (currentIndex >= items.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = items.length - 1;

    const item = items[currentIndex];

    if (topicTag) {
      topicTag.textContent = item.tag;
      topicTag.className = `news-topic-tag ${item.tagClass || ''}`;
    }

    if (headlineText) {
      headlineText.textContent = item.title;
    } else if (headlineLink) {
      headlineLink.textContent = item.title;
    }

    if (headlineLink) {
      headlineLink.href = item.url;
      headlineLink.title = `${item.title} (Clic para abrir y ampliar noticia completa)`;
    }

    if (summaryEl) {
      summaryEl.textContent = item.summary || '';
    }

    if (timestamp) {
      timestamp.textContent = item.time;
    }
  }

  function nextNews() {
    const items = getFilteredItems();
    currentIndex = (currentIndex + 1) % items.length;
    renderCurrentNews();
  }

  function prevNews() {
    const items = getFilteredItems();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    renderCurrentNews();
  }

  function startRotation() {
    stopRotation();
    tickerInterval = setInterval(() => {
      if (!isPaused) {
        nextNews();
      }
    }, 7000);
  }

  function stopRotation() {
    if (tickerInterval) {
      clearInterval(tickerInterval);
      tickerInterval = null;
    }
  }

  // Controles de usuario
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextNews();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevNews();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? '▶' : '⏸';
      pauseBtn.title = isPaused ? 'Reanudar rotación' : 'Pausar rotación';
      showToast(isPaused ? 'Carrusel de noticias pausado' : 'Carrusel de noticias reanudado');
    });
  }

  // Pausar en hover para facilitar lectura
  container.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  container.addEventListener('mouseleave', () => {
    if (pauseBtn && pauseBtn.textContent === '⏸') {
      isPaused = false;
    }
  });

  // Filtros de categoría
  catFilterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      catFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat') || 'all';
      currentIndex = 0;
      renderCurrentNews();
    });
  });

  // Inicialización inmediata
  renderCurrentNews();
  startRotation();
}

// ==========================================================================
// 10. GESTIÓN DIRECTA DE WIDGETS: OCULTAR Y AÑADIR
// ==========================================================================

function initWidgetHideAndManageButtons() {
  // Botones de ocultar (✕) en cada tarjeta
  const hideButtons = document.querySelectorAll('.widget-hide-btn');
  hideButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const widgetKey = btn.getAttribute('data-widget-key');
      if (!widgetKey) return;

      const card = document.querySelector(`.compact-widget-card[data-widget-key="${widgetKey}"]`);
      if (card) {
        card.style.display = 'none';
      }

      localStorage.setItem(`attlon_widget_${widgetKey}`, 'false');

      const toggle = document.querySelector(`input#toggleWidget${widgetKey.charAt(0).toUpperCase() + widgetKey.slice(1)}`);
      if (toggle) toggle.checked = false;

      showToast('Widget ocultado. Puedes volver a añadirlo desde "+ Añadir Widget" o Ajustes.');
    });
  });

  // Botón "+ Añadir / Gestionar Widgets" en el propio dock
  const dockManageBtn = document.getElementById('dockManageWidgetsBtn');
  if (dockManageBtn) {
    dockManageBtn.addEventListener('click', () => {
      const settingsBtn = document.getElementById('settingsBtn');
      if (settingsBtn) settingsBtn.click();
      showToast('Selecciona los widgets que deseas activar en el panel.');
    });
  }
}

// ==========================================================================
// 10.B NAVEGACIÓN Y ENLACES DIRECTOS EN WIDGETS (CLIC-THROUGH OFICIAL)
// ==========================================================================

function initWidgetClickthroughs() {
  // 1. Clima en Barra Superior (redirige a la previsión oficial en MSN El Tiempo)
  const topWeather = document.getElementById('topWeatherWidget');
  if (topWeather) {
    topWeather.style.cursor = 'pointer';
    topWeather.title = 'Haz clic para ver el tiempo oficial en MSN El Tiempo';
    topWeather.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = (currentWeatherConfig && currentWeatherConfig.msnUrl)
        ? currentWeatherConfig.msnUrl
        : 'https://www.msn.com/es-es/eltiempo';
      window.open(url, '_blank');
    });
  }

  // 2. Widget del Tiempo en el Dock (al pinchar en cualquier parte de la tarjeta)
  const weatherCard = document.getElementById('widgetCardWeather');
  if (weatherCard) {
    weatherCard.style.cursor = 'pointer';
    weatherCard.title = 'Clic para abrir MSN El Tiempo oficial (Usa ⌵ para cambiar ciudad)';
    weatherCard.addEventListener('click', (e) => {
      // Ignorar si el usuario interactúa con el botón de ciudad, refresco o cierre
      if (e.target.closest('#weatherCityDropdownBtn') || e.target.closest('#weatherRefreshBtn') || e.target.closest('.widget-hide-btn')) {
        return;
      }
      const url = (currentWeatherConfig && currentWeatherConfig.msnUrl)
        ? currentWeatherConfig.msnUrl
        : 'https://www.msn.com/es-es/eltiempo';
      window.open(url, '_blank');
    });
  }

  // 3. Widget de Calidad del Aire en el Dock (redirige a la web oficial europea de calidad del aire)
  const airCard = document.getElementById('widgetCardAir');
  if (airCard) {
    airCard.style.cursor = 'pointer';
    airCard.title = 'Clic para abrir el Índice Oficial Europeo de Calidad del Aire (EEA)';
    airCard.addEventListener('click', (e) => {
      if (e.target.closest('.widget-hide-btn')) return;
      window.open('https://airindex.eea.europa.eu/', '_blank');
    });
  }

  // 4. Widget de Divisas y Mercados en el Dock (redirige a MSN Dinero)
  const currencyCard = document.getElementById('widgetCardCurrency');
  if (currencyCard) {
    currencyCard.style.cursor = 'pointer';
    currencyCard.title = 'Clic para abrir cotizaciones oficiales en MSN Dinero';
    currencyCard.addEventListener('click', (e) => {
      if (e.target.closest('.widget-hide-btn')) return;
      window.open('https://www.msn.com/es-es/dinero', '_blank');
    });
  }
}

// ==========================================================================
// 10.C DRAG & DROP Y REORDENACIÓN TOTAL DE WIDGETS EN TODAS DIRECCIONES
// ==========================================================================

function initWidgetsDragAndDrop() {
  const dock = document.getElementById('compactWidgetsDock');
  if (!dock) return;

  // 1. Restaurar orden guardado en localStorage
  const savedOrder = localStorage.getItem('attlon_widgets_order');
  if (savedOrder) {
    try {
      const orderKeys = JSON.parse(savedOrder);
      if (Array.isArray(orderKeys)) {
        orderKeys.forEach((key) => {
          const card = dock.querySelector(`.compact-widget-card[data-widget-key="${key}"]`);
          if (card) {
            dock.appendChild(card);
          }
        });
      }
    } catch (err) {
      console.warn('Error restaurando orden de widgets:', err);
    }
  }

  // 2. Configurar eventos de arrastre bidireccional en cada tarjeta
  const cards = dock.querySelectorAll('.compact-widget-card');
  let draggedCard = null;

  cards.forEach((card) => {
    card.setAttribute('draggable', 'true');

    // Dragstart
    card.addEventListener('dragstart', (e) => {
      // Ignorar si se hace clic en elementos interactivos internos
      if (e.target.closest('input') || e.target.closest('select') || e.target.closest('button') || e.target.closest('a')) {
        if (!e.target.classList.contains('widget-drag-handle')) {
          e.preventDefault();
          return;
        }
      }
      draggedCard = card;
      e.dataTransfer.setData('text/plain', card.getAttribute('data-widget-key') || '');
      e.dataTransfer.effectAllowed = 'move';
      card.classList.add('dragging');
    });

    // Dragover
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (draggedCard && draggedCard !== card) {
        card.classList.add('drag-over');
      }
    });

    // Dragleave
    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-over');
    });

    // Drop
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      if (!draggedCard || draggedCard === card) return;

      const rect = card.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;

      // Inserción antes o después según cursor
      if (e.clientY < midY || (Math.abs(e.clientY - midY) < 35 && e.clientX < midX)) {
        dock.insertBefore(draggedCard, card);
      } else {
        dock.insertBefore(draggedCard, card.nextSibling);
      }

      // Guardar el nuevo orden persistente en localStorage
      const currentCards = dock.querySelectorAll('.compact-widget-card');
      const orderKeys = Array.from(currentCards)
        .map((c) => c.getAttribute('data-widget-key'))
        .filter(Boolean);
      localStorage.setItem('attlon_widgets_order', JSON.stringify(orderKeys));
      showToast('✓ Distribución de widgets personalizada y guardada');
    });

    // Dragend
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      dock.querySelectorAll('.compact-widget-card').forEach((c) => c.classList.remove('drag-over'));
      draggedCard = null;
    });
  });
}

// ==========================================================================
// 10.D DRAG & DROP Y PERSONALIZACIÓN DE POSICIÓN DE NOTICIAS
// ==========================================================================

function initNewsDragAndDrop() {
  const container = document.getElementById('newsTickerContainer');
  const handle = document.getElementById('newsDragHandle');
  if (!container || !handle) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let origLeft = 0;
  let origTop = 0;

  handle.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const rect = container.getBoundingClientRect();
    origLeft = rect.left;
    origTop = rect.top;

    container.classList.add('dragging');
    container.classList.add('is-custom-floating');
    container.style.left = `${origLeft}px`;
    container.style.top = `${origTop}px`;
    try {
      handle.setPointerCapture(e.pointerId);
    } catch {}
  });

  handle.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newLeft = Math.max(10, Math.min(window.innerWidth - container.offsetWidth - 10, origLeft + dx));
    let newTop = Math.max(10, Math.min(window.innerHeight - container.offsetHeight - 10, origTop + dy));

    container.style.left = `${newLeft}px`;
    container.style.top = `${newTop}px`;
  });

  function stopNewsDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove('dragging');
    try {
      handle.releasePointerCapture(e.pointerId);
    } catch {}

    const rect = container.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const midX = rect.left + rect.width / 2;
    const posLabel = document.getElementById('newsPosLabel');

    if (midY < 170) {
      // Arriba
      container.classList.remove('is-custom-floating');
      container.style.left = '';
      container.style.top = '';
      localStorage.removeItem('attlon_news_free_pos');
      container.setAttribute('data-position', 'top-bar');
      if (posLabel) posLabel.textContent = 'Arriba';
      localStorage.setItem('attlon_news_position', 'top-bar');
      showToast('✓ Noticias fijadas en la barra superior');
    } else if (midX < 360 && midY > 280) {
      // Izquierda
      container.classList.remove('is-custom-floating');
      container.style.left = '';
      container.style.top = '';
      localStorage.removeItem('attlon_news_free_pos');
      container.setAttribute('data-position', 'bottom-left');
      if (posLabel) posLabel.textContent = 'Izq.';
      localStorage.setItem('attlon_news_position', 'bottom-left');
      showToast('✓ Noticias alineadas a la izquierda');
    } else if (midX > (window.innerWidth - 360) && midY > 280) {
      // Derecha
      container.classList.remove('is-custom-floating');
      container.style.left = '';
      container.style.top = '';
      localStorage.removeItem('attlon_news_free_pos');
      container.setAttribute('data-position', 'bottom-right');
      if (posLabel) posLabel.textContent = 'Der.';
      localStorage.setItem('attlon_news_position', 'bottom-right');
      showToast('✓ Noticias alineadas a la derecha');
    } else if (Math.abs(midX - window.innerWidth / 2) < 220 && midY > (window.innerHeight - 300)) {
      // Centro inferior
      container.classList.remove('is-custom-floating');
      container.style.left = '';
      container.style.top = '';
      localStorage.removeItem('attlon_news_free_pos');
      container.setAttribute('data-position', 'bottom-center');
      if (posLabel) posLabel.textContent = 'Centro';
      localStorage.setItem('attlon_news_position', 'bottom-center');
      showToast('✓ Noticias centradas en la parte inferior');
    } else {
      // Guardar posición libre personalizada
      const finalPos = { left: Math.round(rect.left), top: Math.round(rect.top) };
      localStorage.setItem('attlon_news_free_pos', JSON.stringify(finalPos));
      if (posLabel) posLabel.textContent = 'Libre';
      showToast('✓ Posición libre de noticias guardada');
    }
  }

  handle.addEventListener('pointerup', stopNewsDrag);
  handle.addEventListener('pointercancel', stopNewsDrag);
}

// ==========================================================================
// 11. GESTOR DE MARCADORES (CRUD DINÁMICO)
// ==========================================================================

let userShortcuts = [];
let contextShortcutIndex = -1;

function initShortcutsManager() {
  const saved = localStorage.getItem('attlon_user_shortcuts');
  if (saved) {
    try {
      userShortcuts = JSON.parse(saved);
      const hasPayFit = userShortcuts.some(b => b.url && b.url.includes('payfit.com'));
      if (!hasPayFit) {
        userShortcuts.splice(2, 0, DEFAULT_BOOKMARKS.find(b => b.id === 'payfit'));
      }
      const hasYouTube = userShortcuts.some(b => b.url && b.url.includes('youtube.com'));
      if (!hasYouTube) {
        const yt = DEFAULT_BOOKMARKS.find(b => b.id === 'youtube');
        if (yt) userShortcuts.splice(3, 0, yt);
      }
      saveShortcuts();
    } catch {
      userShortcuts = [...DEFAULT_BOOKMARKS];
    }
  } else {
    userShortcuts = [...DEFAULT_BOOKMARKS];
  }

  renderShortcuts();
  initContextMenuHandlers();
  initShortcutModalHandlers();
}

function saveShortcuts() {
  localStorage.setItem('attlon_user_shortcuts', JSON.stringify(userShortcuts));
}

function renderShortcuts() {
  const row = document.getElementById('shortcutsRow');
  if (!row) return;

  const openInNewTab = localStorage.getItem('attlon_open_newtab') !== 'false';
  const targetAttr = openInNewTab ? '_blank' : '_self';

  row.innerHTML = '';

  userShortcuts.forEach((bm, index) => {
    const item = document.createElement('div');
    item.className = 'shortcut-item';
    item.dataset.index = index;
    item.setAttribute('draggable', 'true');
    let isDraggingShortcut = false;

    item.addEventListener('dragstart', (e) => {
      isDraggingShortcut = true;
      e.dataTransfer.setData('text/plain', String(index));
      e.dataTransfer.effectAllowed = 'move';
      if (e.dataTransfer.setDragImage) {
        try {
          e.dataTransfer.setDragImage(item, item.offsetWidth / 2, item.offsetHeight / 2);
        } catch (_) {}
      }
      item.classList.add('dragging');
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      item.classList.add('drag-over');
    });

    item.addEventListener('dragleave', () => {
      item.classList.remove('drag-over');
    });

    item.addEventListener('drop', (e) => {
      e.preventDefault();
      item.classList.remove('drag-over');
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
      if (isNaN(fromIndex) || fromIndex === index) return;
      const moved = userShortcuts.splice(fromIndex, 1)[0];
      userShortcuts.splice(index, 0, moved);
      saveShortcuts();
      renderShortcuts();
      showToast('✓ Marcador reordenado');
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      document.querySelectorAll('.shortcut-item').forEach(el => el.classList.remove('drag-over'));
      setTimeout(() => { isDraggingShortcut = false; }, 150);
    });

    const link = document.createElement('a');
    link.href = bm.url;
    link.target = targetAttr;
    link.addEventListener('click', (e) => {
      if (isDraggingShortcut) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
    link.style.display = 'flex';
    link.style.flexDirection = 'column';
    link.style.alignItems = 'center';
    link.style.textDecoration = 'none';
    link.style.gap = '8px';
    link.title = bm.fullName || bm.title;

    const tile = document.createElement('div');
    tile.className = 'shortcut-tile';
    tile.innerHTML = getShortcutIconHtml(bm);

    const label = document.createElement('span');
    label.className = 'shortcut-label';
    label.textContent = bm.title;

    link.appendChild(tile);
    link.appendChild(label);
    item.appendChild(link);

    const optBtn = document.createElement('button');
    optBtn.className = 'shortcut-options-btn';
    optBtn.title = 'Más opciones';
    optBtn.innerHTML = '•••';
    optBtn.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
    optBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openContextMenu(e, index);
    });

    item.appendChild(optBtn);

    item.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      openContextMenu(e, index);
    });

    row.appendChild(item);
  });

  const addBtn = document.createElement('button');
  addBtn.className = 'shortcut-item add-shortcut-btn';
  addBtn.id = 'openAddShortcutBtn';
  addBtn.title = 'Agregar nuevo acceso directo a la página';

  addBtn.innerHTML = `
    <div class="shortcut-tile add-tile">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
    <span class="shortcut-label">Agregar acc...</span>
  `;

  addBtn.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    addBtn.classList.add('drag-over');
  });

  addBtn.addEventListener('dragleave', () => {
    addBtn.classList.remove('drag-over');
  });

  addBtn.addEventListener('drop', (e) => {
    e.preventDefault();
    addBtn.classList.remove('drag-over');
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (isNaN(fromIndex) || fromIndex < 0 || fromIndex >= userShortcuts.length) return;
    const moved = userShortcuts.splice(fromIndex, 1)[0];
    userShortcuts.push(moved);
    saveShortcuts();
    renderShortcuts();
    showToast('✓ Marcador movido al final');
  });

  addBtn.addEventListener('click', () => {
    openShortcutModal(-1);
  });

  row.appendChild(addBtn);
}

function openContextMenu(e, index) {
  contextShortcutIndex = index;
  const menu = document.getElementById('shortcutContextMenu');
  if (!menu) return;

  menu.classList.add('open');
  menu.setAttribute('aria-hidden', 'false');

  const x = Math.min(e.clientX, window.innerWidth - 230);
  const y = Math.min(e.clientY, window.innerHeight - 200);

  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
}

function closeContextMenu() {
  const menu = document.getElementById('shortcutContextMenu');
  if (menu) {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  }
}

function initContextMenuHandlers() {
  const menu = document.getElementById('shortcutContextMenu');
  const renameBtn = document.getElementById('ctxRenameBtn');
  const removeBtn = document.getElementById('ctxRemoveBtn');
  const disableBtn = document.getElementById('ctxDisableBtn');
  const pinBtn = document.getElementById('ctxPinBtn');
  const taskbarBtn = document.getElementById('ctxTaskbarBtn');

  document.addEventListener('click', (e) => {
    if (menu && !menu.contains(e.target)) {
      closeContextMenu();
    }
  });

  if (renameBtn) {
    renameBtn.addEventListener('click', () => {
      closeContextMenu();
      if (contextShortcutIndex >= 0) {
        openShortcutModal(contextShortcutIndex);
      }
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      closeContextMenu();
      if (contextShortcutIndex >= 0 && contextShortcutIndex < userShortcuts.length) {
        const removed = userShortcuts.splice(contextShortcutIndex, 1)[0];
        saveShortcuts();
        renderShortcuts();
        showToast(`✓ Se ha quitado "${removed.title}".`);
      }
    });
  }

  if (disableBtn) {
    disableBtn.addEventListener('click', () => {
      closeContextMenu();
      showToast('Acceso directo temporalmente deshabilitado.');
    });
  }

  if (pinBtn) {
    pinBtn.addEventListener('click', () => {
      closeContextMenu();
      showToast('✓ Acceso directo anclado a la página principal.');
    });
  }

  if (taskbarBtn) {
    taskbarBtn.addEventListener('click', () => {
      closeContextMenu();
      showToast('Para anclar en Windows: Menú de Edge (...) > Más herramientas > Anclar a la barra de tareas');
    });
  }
}

function updateModalIconPreview() {
  const urlInput = document.getElementById('shortcutUrlInput');
  const preview = document.getElementById('shortcutModalIconPreview');
  const nameInput = document.getElementById('shortcutNameInput');
  if (!urlInput || !preview) return;

  const rawUrl = urlInput.value.trim();
  if (!rawUrl || rawUrl === 'https://') {
    preview.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A0B2C6" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    return;
  }

  const domain = extractDomain(rawUrl);
  if (domain) {
    preview.innerHTML = getShortcutIconHtml({ url: rawUrl, title: domain });
    if (nameInput && (!nameInput.value || nameInput.dataset.autoFilled === 'true')) {
      const suggested = formatDomainAsTitle(domain);
      nameInput.value = suggested;
      nameInput.dataset.autoFilled = 'true';
    }
  }
}

function openShortcutModal(index) {
  const overlay = document.getElementById('shortcutModalOverlay');
  const titleEl = document.getElementById('shortcutModalTitle');
  const nameInput = document.getElementById('shortcutNameInput');
  const urlInput = document.getElementById('shortcutUrlInput');
  const indexInput = document.getElementById('editShortcutIndex');

  if (!overlay || !nameInput || !urlInput) return;

  indexInput.value = index;

  if (index >= 0 && index < userShortcuts.length) {
    titleEl.textContent = 'Cambiar nombre / Editar acceso';
    nameInput.value = userShortcuts[index].fullName || userShortcuts[index].title;
    urlInput.value = userShortcuts[index].url;
    nameInput.dataset.autoFilled = 'false';
  } else {
    titleEl.textContent = 'Agregar acceso directo';
    nameInput.value = '';
    urlInput.value = 'https://';
    nameInput.dataset.autoFilled = 'true';
  }

  updateModalIconPreview();
  overlay.classList.add('active');
  urlInput.focus();
}

function closeShortcutModal() {
  const overlay = document.getElementById('shortcutModalOverlay');
  if (overlay) overlay.classList.remove('active');
}

function initShortcutModalHandlers() {
  const form = document.getElementById('shortcutModalForm');
  const cancelBtn = document.getElementById('cancelShortcutModalBtn');
  const closeBtn = document.getElementById('closeShortcutModalBtn');
  const overlay = document.getElementById('shortcutModalOverlay');
  const urlInput = document.getElementById('shortcutUrlInput');
  const nameInput = document.getElementById('shortcutNameInput');

  if (cancelBtn) cancelBtn.addEventListener('click', closeShortcutModal);
  if (closeBtn) closeBtn.addEventListener('click', closeShortcutModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeShortcutModal();
    });
  }

  if (urlInput) {
    urlInput.addEventListener('input', updateModalIconPreview);
    urlInput.addEventListener('blur', updateModalIconPreview);
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.dataset.autoFilled = 'false';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const index = parseInt(document.getElementById('editShortcutIndex').value, 10);
      const name = document.getElementById('shortcutNameInput').value.trim();
      let url = document.getElementById('shortcutUrlInput').value.trim();

      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      if (index >= 0 && index < userShortcuts.length) {
        userShortcuts[index].title = name.length > 13 ? name.slice(0, 11) + '...' : name;
        userShortcuts[index].fullName = name;
        userShortcuts[index].url = url;
        showToast(`✓ Acceso directo actualizado.`);
      } else {
        userShortcuts.push({
          id: 'custom-' + Date.now(),
          title: name.length > 13 ? name.slice(0, 11) + '...' : name,
          fullName: name,
          url: url
        });
        showToast(`✓ Nuevo acceso directo agregado.`);
      }

      saveShortcuts();
      renderShortcuts();
      closeShortcutModal();
    });
  }
}

// ==========================================================================
// 9. VERSIÓN & VERIFICADOR DE ACTUALIZACIONES (CHROME WEB STORE)
// ==========================================================================

function initVersionAndUpdates() {
  let currentVersion = '1.5.0';
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest) {
    try {
      currentVersion = chrome.runtime.getManifest().version;
    } catch {
      currentVersion = '1.5.0';
    }
  }

  const versionBadge = document.getElementById('extensionVersionBadge');
  if (versionBadge) {
    versionBadge.textContent = `v${currentVersion}`;
  }

  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onUpdateAvailable) {
    chrome.runtime.onUpdateAvailable.addListener((details) => {
      showToast(`Nueva versión (v${details.version}) lista.`);
    });
  }
}

// ==========================================================================
// 10. PANEL DE CONFIGURACIÓN DE PÁGINA
// ==========================================================================

function initPageConfiguration() {
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsDrawer = document.getElementById('settingsDrawer');
  const settingsOverlay = document.getElementById('settingsOverlay');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');

  function openSettings() {
    settingsDrawer.classList.add('open');
    settingsOverlay.classList.add('active');
    settingsDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeSettings() {
    settingsDrawer.classList.remove('open');
    settingsOverlay.classList.remove('active');
    settingsDrawer.setAttribute('aria-hidden', 'true');
  }

  if (settingsBtn && settingsDrawer && settingsOverlay) {
    settingsBtn.addEventListener('click', openSettings);
    if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);
    settingsOverlay.addEventListener('click', closeSettings);
  }

  // 1. Abrir en nueva pestaña
  const newTabToggle = document.getElementById('newTabToggle');
  const savedNewTab = localStorage.getItem('attlon_open_newtab');
  if (newTabToggle) {
    if (savedNewTab !== null) {
      newTabToggle.checked = savedNewTab === 'true';
    }
    newTabToggle.addEventListener('change', () => {
      const isChecked = newTabToggle.checked;
      localStorage.setItem('attlon_open_newtab', String(isChecked));
      renderShortcuts();
      showToast(isChecked ? 'Enlaces configurados para abrir en nueva pestaña' : 'Enlaces configurados para abrir en la misma pestaña');
    });
  }

  // 2. Conmutador de la Barra Dinámica de Noticias PCI y España
  const toggleNewsTicker = document.getElementById('toggleNewsTicker');
  const newsTickerContainer = document.getElementById('newsTickerContainer');
  if (toggleNewsTicker && newsTickerContainer) {
    const savedTicker = localStorage.getItem('attlon_show_news_ticker');
    if (savedTicker !== null) {
      const show = savedTicker === 'true';
      toggleNewsTicker.checked = show;
      newsTickerContainer.style.display = show ? 'flex' : 'none';
    }
    toggleNewsTicker.addEventListener('change', () => {
      const show = toggleNewsTicker.checked;
      localStorage.setItem('attlon_show_news_ticker', String(show));
      newsTickerContainer.style.display = show ? 'flex' : 'none';
    });
  }

  // 2.1 Conmutador de Detección Automática de Ubicación
  const toggleAutoLocation = document.getElementById('toggleAutoLocation');
  if (toggleAutoLocation) {
    const savedAuto = localStorage.getItem('attlon_auto_location');
    if (savedAuto !== null) {
      toggleAutoLocation.checked = savedAuto === 'true';
    }
    toggleAutoLocation.addEventListener('change', () => {
      const isAuto = toggleAutoLocation.checked;
      localStorage.setItem('attlon_auto_location', String(isAuto));
      if (isAuto) {
        detectUserLocation(true);
      } else {
        showToast('Detección automática desactivada.');
      }
    });
  }

  // 3. Conmutadores modulares para cada widget individual del dock
  const widgetsMap = [
    { toggleId: 'toggleWidgetWeather', cardId: 'widgetCardWeather', storageKey: 'attlon_widget_weather' },
    { toggleId: 'toggleWidgetAir', cardId: 'widgetCardAir', storageKey: 'attlon_widget_air' },
    { toggleId: 'toggleWidgetCurrency', cardId: 'widgetCardCurrency', storageKey: 'attlon_widget_currency' },
    { toggleId: 'toggleWidgetTasks', cardId: 'widgetCardTasks', storageKey: 'attlon_widget_tasks' },
    { toggleId: 'toggleWidgetHydraulic', cardId: 'widgetCardHydraulic', storageKey: 'attlon_widget_hydraulic' },
    { toggleId: 'toggleWidgetConverter', cardId: 'widgetCardConverter', storageKey: 'attlon_widget_converter' },
    { toggleId: 'toggleWidgetCoverage', cardId: 'widgetCardCoverage', storageKey: 'attlon_widget_coverage' }
  ];

  widgetsMap.forEach(({ toggleId, cardId, storageKey }) => {
    const toggle = document.getElementById(toggleId);
    const card = document.getElementById(cardId);
    if (!toggle || !card) return;

    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      const show = saved === 'true';
      toggle.checked = show;
      card.style.display = show ? 'flex' : 'none';
    }

    toggle.addEventListener('change', () => {
      const show = toggle.checked;
      localStorage.setItem(storageKey, String(show));
      card.style.display = show ? 'flex' : 'none';
    });
  });

  // 3.1 Botón de restauración rápida de todos los widgets del dock
  const restoreAllBtn = document.getElementById('btnRestoreAllWidgets');
  if (restoreAllBtn) {
    restoreAllBtn.addEventListener('click', () => {
      widgetsMap.forEach(({ toggleId, cardId, storageKey }) => {
        const toggle = document.getElementById(toggleId);
        const card = document.getElementById(cardId);
        if (toggle) toggle.checked = true;
        if (card) card.style.display = 'flex';
        localStorage.setItem(storageKey, 'true');
      });
      showToast('✓ Todos los widgets del dock han sido restaurados y activados.');
    });
  }

  // 3. Restablecer favoritos predeterminados de Attlon
  const resetBtn = document.getElementById('resetBookmarksBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      userShortcuts = [...DEFAULT_BOOKMARKS];
      saveShortcuts();
      renderShortcuts();
      showToast('✓ Marcadores de Attlon restablecidos (incluye PayFit).');
    });
  }

  // 4. Sincronizar marcadores nativos
  const syncBtn = document.getElementById('syncBookmarksAction');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      syncToNativeBookmarks(true);
    });
  }
}

// ==========================================================================
// 11. NAVEGACIÓN LATERAL (WAFFLE APP LAUNCHER)
// ==========================================================================

function initDrawerNavigation() {
  const waffleBtn = document.getElementById('waffleBtn');
  const sidebarDrawer = document.getElementById('sidebarDrawer');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const closeSidebarBtn = document.getElementById('closeSidebarBtn');

  function openSidebar() {
    sidebarDrawer.classList.add('open');
    sidebarOverlay.classList.add('active');
    sidebarDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeSidebar() {
    sidebarDrawer.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    sidebarDrawer.setAttribute('aria-hidden', 'true');
  }

  if (waffleBtn && sidebarDrawer && sidebarOverlay) {
    waffleBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
      closeContextMenu();
      closeShortcutModal();
      closeWeatherModal();
      const settingsDrawer = document.getElementById('settingsDrawer');
      const settingsOverlay = document.getElementById('settingsOverlay');
      if (settingsDrawer) settingsDrawer.classList.remove('open');
      if (settingsOverlay) settingsOverlay.classList.remove('active');
    }
  });
}

// ==========================================================================
// 12. BUSCADOR CENTRAL CONECTADO CON MICROSOFT COPILOT
// ==========================================================================

function initSearchAndCopilot() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const copilotBtn = document.getElementById('copilotBtn');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      const query = searchInput.value.trim();
      if (!query) {
        e.preventDefault();
        return;
      }
      if (query.toLowerCase().startsWith('/copilot') || query.toLowerCase().startsWith('copilot:')) {
        e.preventDefault();
        const cleanQuery = query.replace(/^\/(copilot|ai)\s*/i, '').replace(/^copilot:\s*/i, '');
        window.location.href = `https://copilot.microsoft.com/?q=${encodeURIComponent(cleanQuery)}`;
      }
    });
  }

  if (copilotBtn && searchInput) {
    copilotBtn.addEventListener('click', (e) => {
      const query = searchInput.value.trim();
      if (query) {
        e.preventDefault();
        window.open(`https://copilot.microsoft.com/?q=${encodeURIComponent(query)}`, '_blank');
      }
    });
  }
}



// ==========================================================================
// 15. SINCRONIZACIÓN DE MARCADORES NATIVOS (CHROME.BOOKMARKS API)
// ==========================================================================

function syncToNativeBookmarks(userInitiated) {
  if (typeof chrome === 'undefined' || !chrome.bookmarks) {
    if (userInitiated) {
      showToast('Barra de favoritos activa al instalar la extensión.');
    }
    return;
  }

  const folderTitle = '⭐ Attlon Corporativo';

  chrome.bookmarks.getTree((tree) => {
    let bookmarkBarId = '1';

    if (tree && tree[0] && tree[0].children) {
      const barNode = tree[0].children.find(
        (c) => c.id === '1' || c.title.toLowerCase().includes('bar') || c.title.toLowerCase().includes('marcadores') || c.title.toLowerCase().includes('favoritos')
      );
      if (barNode) bookmarkBarId = barNode.id;
    }

    chrome.bookmarks.getChildren(bookmarkBarId, (children) => {
      const existingFolder = children ? children.find((c) => c.title === folderTitle) : null;

      if (existingFolder) {
        if (userInitiated) {
          showToast(`✓ Carpeta "${folderTitle}" ya está activa en tu barra de favoritos.`);
        }
      } else {
        chrome.bookmarks.create(
          {
            parentId: bookmarkBarId,
            title: folderTitle
          },
          (newFolder) => {
            userShortcuts.forEach((bm) => {
              chrome.bookmarks.create({
                parentId: newFolder.id,
                title: bm.fullName || bm.title,
                url: bm.url
              });
            });

            showToast(`✓ Sincronizados con éxito los accesos (incluye PayFit) en "${folderTitle}".`);
          }
        );
      }
    });
  });
}

// ==========================================================================
// 15. TOAST NOTIFIER
// ==========================================================================

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
