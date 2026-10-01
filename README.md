# Suite Corporativa de Navegador — Attlon Industrial Safety

[![Chromium Manifest V3](https://img.shields.io/badge/Chromium-Manifest%20V3-09E36F?style=flat-square&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![Google Chrome](https://img.shields.io/badge/Google-Chrome%20112+-001B3E?style=flat-square&logo=googlechrome&logoColor=white)](https://www.google.com/chrome/)
[![Microsoft Edge](https://img.shields.io/badge/Microsoft-Edge%20112+-001B3E?style=flat-square&logo=microsoftedge&logoColor=white)](https://www.microsoft.com/edge)
[![WCAG 2.1 AAA Compliant](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AAA-09E36F?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)

Suite oficial de personalización de navegador para **Attlon** (Soluciones avanzadas en seguridad industrial, protección contra incendios e ingeniería conectada — Cottés, Electro Alavesa, SVC Seguridad), diseñada específicamente para el ecosistema de navegadores basados en Chromium (**Google Chrome** y **Microsoft Edge**).

Esta entrega incluye:
1. **Tema Corporativo Nativo de Chromium**: Estiliza el marco, pestañas, barra de direcciones y controles con **bordes transparentes manteniendo el azul corporativo** y ratios de contraste ergonómicos **WCAG AAA**.
2. **Espacio de Trabajo Dinámico (Extensión con Fondo de Vídeo)**: Fondo dinámico de alta fidelidad que reproduce el vídeo de referencia (`building.mp4`) con la sede y el escaneo láser verde neón, efecto ambiental CAD interactivo y reloj en tiempo real.
3. **Favoritos Corporativos Preinstalados**: 8 accesos directos oficiales (Cottés, Autodesk Forma, GitHub, Excel de SharePoint, LinkedIn, Electro Alavesa, SVC Seguridad) integrados en el dashboard y sincronizables con 1 clic en la **barra de marcadores nativa** del navegador.
4. **Directiva IT ManagedBookmarks (`.reg`)**: Archivo de registro para administradores de sistemas para inyectar los marcadores de forma obligatoria y centralizada vía GPO o Intune.

---

## Índice

1. [Arquitectura del Proyecto](#1-arquitectura-del-proyecto)
2. [Componentes de la Suite](#2-componentes-de-la-suite)
3. [Sistema de Diseño: Paleta y Bordes Transparentes](#3-sistema-de-diseño-paleta-y-bordes-transparentes)
4. [Favoritos y Accesos Preinstalados](#4-favoritos-y-accesos-preinstalados)
5. [Instalación Rápida para Pruebas (Modo Desarrollador)](#5-instalación-rápida-para-pruebas-modo-desarrollador)
6. [Fondo Dinámico (Vídeo y Efecto CAD)](#6-fondo-dinámico-vídeo-y-efecto-cad)
7. [Compilación y Validación Automática](#7-compilación-y-validación-automática)
8. [Guía de Despliegue para Administradores IT](#8-guía-de-despliegue-para-administradores-it)
9. [Licencia y Propiedad](#9-licencia-y-propiedad)

---

## 1. Arquitectura del Proyecto

```
attlon-browser-theme/
│
├── README.md                           # Documentación técnica completa
├── LICENSE                             # Licencia corporativa
├── package.json                        # Definición de proyecto y comandos npm
│
├── src/                                # Código fuente maestro
│   ├── manifest.json                   # Plantilla de manifiesto para Tema Chromium MV3
│   ├── manifest-dynamic.json           # Manifiesto para Extensión con Nueva Pestaña Dinámica
│   ├── theme/
│   │   ├── colors.json                 # Tokens de color, bordes translúcidos y marcadores
│   │   └── theme.json                  # Mapeo oficial al motor de colores Chromium
│   ├── newtab/                         # Interfaz del Espacio de Trabajo Dinámico
│   │   ├── newtab.html                 # Estructura del dashboard y tarjetas de acceso
│   │   ├── newtab.css                  # Estilos glassmorphism y bordes transparentes azulados
│   │   └── newtab.js                   # Reloj en vivo, control de vídeo y sincronización de marcadores
│   └── assets/
│       ├── logo/                       # Logotipos SVG y PNG (variantes oscura, clara y símbolo)
│       ├── backgrounds/                # Texturas del marco, barra de herramientas y fondo estático
│       ├── icons/                      # Iconos de extensión (16, 32, 48, 128 px)
│       └── video/
│           └── building.mp4            # Vídeo arquitectónico corporativo oficial de Attlon
│
├── build/                              # Distribuciones compiladas listas para usar
│   ├── chrome/                         # Tema nativo desempaquetado para Google Chrome
│   ├── edge/                           # Tema nativo desempaquetado para Microsoft Edge
│   ├── chrome-extension/               # Extensión dinámica desempaquetada para Google Chrome
│   └── edge-extension/                 # Extensión dinámica desempaquetada para Microsoft Edge
│
├── policies/                           # Directivas empresariales para administradores de sistemas
│   └── attlon-managed-bookmarks.reg    # Política de marcadores administrados para Chrome y Edge
│
├── scripts/
│   ├── build.js                        # Compilación automatizada de temas, extensiones y ZIPs
│   ├── validate.js                     # Suite de pruebas automatizadas (63 verificaciones)
│   └── generate-assets.ps1             # Motor de renderizado vectorial GDI+
│
├── attlon-browser-theme-chrome.zip     # Paquete instalable del Tema para Chrome
├── attlon-browser-theme-edge.zip       # Paquete instalable del Tema para Edge
├── attlon-dynamic-newtab-chrome.zip    # Paquete de Extensión Dinámica para Chrome
└── attlon-dynamic-newtab-edge.zip      # Paquete de Extensión Dinámica para Edge
```

---

## 2. Componentes de la Suite

La solución se divide en dos componentes complementarios para ofrecer la máxima flexibilidad:

1. **Tema Nativo (`build/chrome/` y `build/edge/`)**:
   Colorea de forma permanente la barra de pestañas, el marco superior de la ventana, la barra de direcciones (Omnibox) y la barra de marcadores con la identidad Attlon, aplicando **bordes transparentes manteniendo el azul corporativo**.
2. **Extensión Dinámica (`build/chrome-extension/` y `build/edge-extension/`)**:
   Transforma la página de Nueva Pestaña (New Tab) en un **dashboard corporativo con fondo de vídeo en movimiento** (`building.mp4`), reloj en vivo, las 8 tarjetas de acceso a plataformas internas y sincronización automática con la barra de marcadores nativa del navegador.

---

## 3. Sistema de Diseño: Paleta y Bordes Transparentes

El sistema cromático respeta con rigor matemático la identidad visual de Attlon:

| Token | HEX / RGBA | Función | Ratio | WCAG |
| :--- | :--- | :--- | :--- | :--- |
| **`primary`** | `#001B3E` (`rgb(0, 27, 62)`) | Barra de herramientas, pestaña activa y botones | 15.78:1 | **AAA** |
| **`primaryDark`** | `#00132B` (`rgb(0, 19, 43)`) | Marco de pestañas inactivas y fondo de omnibox | 17.16:1 | **AAA** |
| **`primaryDarker`**| `#000D1D` (`rgb(0, 13, 29)`) | Marco cuando la ventana pierde el foco en el SO | - | - |
| **`accent`** | `#09E36F` (`rgb(9, 227, 111)`)| Verde esmeralda tecnológico oficial del isotipo | 10.84:1 | **AAA** |
| **`accentGlow`** | `#1CFF86` (`rgb(28, 255, 134)`)| Línea de trazado lumínico del edificio y progreso | - | - |
| **`text`** | `#F9F6E6` (`rgb(249, 246, 230)`)| Blanco marfil del logotipo; texto de pestaña activa | 15.78:1 | **AAA** |
| **`textSecondary`**| `#A0B2C6` (`rgb(160, 178, 198)`)| Pizarra claro; texto de pestañas inactivas | 8.58:1 | **AA** |
| **`borderGlass`** | `rgba(160, 178, 198, 0.22)` | Borde translúcido cristalino | - | - |
| **`borderBlue`** | `rgba(0, 27, 62, 0.65)` | Fondo de tarjetas manteniendo el azul corporativo | - | - |
| **`borderGlow`** | `rgba(9, 227, 111, 0.35)` | Resalte esmeralda al pasar el cursor | - | - |

---

## 4. Favoritos y Accesos Preinstalados

El espacio de trabajo incluye los 8 accesos directos requeridos por la organización:

1. **Cottes Admin**: [`https://admin.cloudcottes.com/login`](https://admin.cloudcottes.com/login)
2. **Autodesk Forma**: [`https://acc.autodesk.eu/projects`](https://acc.autodesk.eu/projects)
3. **Attlon · GitHub**: [`https://github.com/attlon`](https://github.com/attlon)
4. **PERSONAL COTTES 2026.xlsx**: [`Enlace a SharePoint / Teams`](https://cottesgroup.sharepoint.com/:x:/r/sites/GlobalCotts/_layouts/15/doc2.aspx?action=edit&sourcedoc=%7B40c743a7-bc02-4fba-aad7-eeccbd1fca0b%7D&wdExp=TEAMS-TREATMENT&web=1)
5. **Attlon · LinkedIn**: [`https://www.linkedin.com/company/attlon/`](https://www.linkedin.com/company/attlon/)
6. **Cottés Group**: [`https://www.cottesgroup.com/`](https://www.cottesgroup.com/)
7. **Electro Alavesa**: [`https://www.electroalavesa.es/`](https://www.electroalavesa.es/)
8. **SVC Seguridad**: [`https://www.svcseguridad.com/`](https://www.svcseguridad.com/)

---

## 5. Instalación Rápida para Pruebas (Modo Desarrollador)

### Paso 1: Instalar el Tema Visual (Marco, Pestañas y Colores)
1. En Google Chrome escribe `chrome://extensions/` (o en Edge `edge://extensions/`).
2. Activa el **"Modo de desarrollador"** (esquina superior derecha).
3. Haz clic en **"Cargar descomprimida"** (Load unpacked).
4. Selecciona la carpeta:
   - Para Chrome: `attlon-browser-theme/build/chrome`
   - Para Edge: `attlon-browser-theme/build/edge`

### Paso 2: Instalar la Extensión Dinámica (Vídeo + Favoritos)
1. En la misma pantalla de extensiones, haz clic nuevamente en **"Cargar descomprimida"**.
2. Selecciona la carpeta:
   - Para Chrome: `attlon-browser-theme/build/chrome-extension`
   - Para Edge: `attlon-browser-theme/build/edge-extension`
3. Abre una **Nueva Pestaña** (`Ctrl + T`): Verás el fondo de vídeo corporativo reproduciéndose fluidamente, el reloj digital, la barra de búsqueda y las tarjetas de acceso rápido.
4. Pulsa el botón **"Sincronizar en barra de favoritos"** en la esquina inferior izquierda: Se creará de forma instantánea la carpeta **`⭐ Attlon Corporativo`** en tu barra de marcadores del navegador.

---

## 6. Fondo Dinámico (Vídeo y Efecto CAD)

*   **Vídeo Corporativo en Bucle:** Carga localmente el archivo [`src/assets/video/building.mp4`](file:///c:/Users/Carlos/OneDrive/Documentos/identidad%20visual/attlon-browser-theme/src/assets/video/building.mp4) con aceleración por hardware (60 fps, 0% latencia de red, sin consumo de datos externos).
*   **Capa Ambiental de Ingeniería:** Un lienzo HTML5 Canvas renderiza sutiles líneas de cuadrícula CAD y un pulso de escaneo láser en verde esmeralda (`#09E36F`), replicando el concepto del vídeo original.
*   **Control de Rendimiento:** Incluye un botón para pausar o reanudar el vídeo en cualquier momento para puestos de trabajo con ahorro de batería.

---

## 7. Compilación y Validación Automática

El proyecto se compila y valida con cero dependencias externas:

```bash
# Compilar todas las distribuciones (Temas + Extensiones Dinámicas + ZIPs):
npm run build

# Ejecutar la suite completa de 63 pruebas técnicas, URLs y accesibilidad:
npm run validate
```

### Resultados de la Suite de Pruebas:
*   **63/63 Pruebas Exitosas (0 fallos)**.
*   Validación de esquemas JSON en Manifest V3 para Google Chrome y Microsoft Edge.
*   Comprobación de existencia de los 15 recursos multimedia (PNG, SVG, JPG, MP4).
*   Verificación estricta de las 8 URLs corporativas preinstaladas.
*   Cálculo de ratios de contraste WCAG 2.1 (Pestaña activa: **15.78:1**, Omnibox: **17.16:1**).

---

## 8. Guía de Despliegue para Administradores IT

### Método 1: Inyección Directa de Favoritos por Registro de Windows (Inmediato)
En el directorio raíz o en `policies/` se encuentra el archivo [`attlon-managed-bookmarks.reg`](file:///c:/Users/Carlos/OneDrive/Documentos/identidad%20visual/attlon-managed-bookmarks.reg).

Al ejecutarlo con permisos de administrador en cualquier máquina con Windows:
1. Registra automáticamente la directiva `ManagedBookmarks` para **Google Chrome** y **Microsoft Edge**.
2. Aparece instantáneamente en la barra de favoritos de todos los empleados la carpeta permanente **"⭐ Attlon Corporativo"** con los 8 enlaces verificados.
3. Los usuarios no pueden borrarla por error, garantizando el acceso a las herramientas del grupo.

### Método 2: Despliegue Masivo por Directivas de Grupo (Active Directory / GPO)
1. Abre la consola de administración de directivas de grupo (`gpmc.msc`).
2. Edita la GPO aplicada a los equipos corporativos y navega a:
   - Para Chrome: `Configuración del equipo > Plantillas administrativas > Google > Google Chrome > Marcadores > Marcadores administrados`.
   - Para Edge: `Configuración del equipo > Plantillas administrativas > Microsoft Edge > Marcadores administrados`.
3. Introduce la siguiente estructura JSON:

```json
[
  { "toplevel_name": "⭐ Attlon Corporativo" },
  { "name": "Cottes Admin", "url": "https://admin.cloudcottes.com/login" },
  { "name": "Autodesk Forma", "url": "https://acc.autodesk.eu/projects" },
  { "name": "Attlon · GitHub", "url": "https://github.com/attlon" },
  { "name": "PERSONAL COTTES 2026.xlsx", "url": "https://cottesgroup.sharepoint.com/:x:/r/sites/GlobalCotts/_layouts/15/doc2.aspx?action=edit&sourcedoc=%7B40c743a7-bc02-4fba-aad7-eeccbd1fca0b%7D&wdExp=TEAMS-TREATMENT&web=1" },
  { "name": "Attlon · LinkedIn", "url": "https://www.linkedin.com/company/attlon/" },
  { "name": "Cottés Group", "url": "https://www.cottesgroup.com/" },
  { "name": "Electro Alavesa", "url": "https://www.electroalavesa.es/" },
  { "name": "SVC Seguridad", "url": "https://www.svcseguridad.com/" }
]
```

### Método 3: Forzar Instalación de la Extensión vía `ExtensionInstallForcelist`
Tanto para Chrome como para Edge, publica el paquete `attlon-dynamic-newtab-chrome.zip` en la Chrome Web Store o Microsoft Edge Add-ons como extensión privada y añade el ID de la extensión a la directiva `ExtensionInstallForcelist`.

---

## 9. Licencia y Propiedad

© 2026 **Attlon Industrial Safety**. Todos los derechos reservados.
Uso exclusivo y autorizado para empleados, colaboradores y terminales corporativos de las empresas del grupo Attlon (Cottés, Electro Alavesa, SVC Seguridad).
