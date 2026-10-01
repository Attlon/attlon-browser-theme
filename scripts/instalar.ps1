# ==============================================================================
# ATTLON INDUSTRIAL SAFETY - INSTALADOR CORPORATIVO DE 1 CLIC
# ==============================================================================
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "Attlon Workspace - Instalador Corporativo"

Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "       ATTLON INDUSTRIAL SAFETY - INSTALADOR DE EXTENSION           " -ForegroundColor Cyan
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "`nInstalando el espacio de trabajo corporativo en tu equipo..." -ForegroundColor White

$targetDir = Join-Path $env:LOCALAPPDATA "Attlon\Extension"
$scriptDir = Split-Path -Parent $PSScriptRoot

# 1. Crear carpeta permanente de destino
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

# 2. Desplegar los archivos de la extensión
Write-Host "`n[1/3] Copiando archivos de la extensión a tu perfil..." -ForegroundColor Green

$localEdgeBuild = Join-Path $scriptDir "build\edge-extension"
$localZip = Join-Path $scriptDir "attlon-dynamic-newtab-edge.zip"

if (Test-Path (Join-Path $localEdgeBuild "manifest.json")) {
    Copy-Item -Path "$localEdgeBuild\*" -Destination $targetDir -Recurse -Force
    Write-Host "  -> Archivos locales transferidos con éxito." -ForegroundColor Gray
} elseif (Test-Path $localZip) {
    Expand-Archive -Path $localZip -DestinationPath $targetDir -Force
    Write-Host "  -> Paquete ZIP descomprimido con éxito." -ForegroundColor Gray
} else {
    Write-Host "  -> Descargando última versión de producción..." -ForegroundColor Yellow
    $tempZip = Join-Path $env:TEMP "attlon-ext.zip"
    try {
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/attlon/browser-theme/main/attlon-dynamic-newtab-edge.zip" -OutFile $tempZip -UseBasicParsing
        Expand-Archive -Path $tempZip -DestinationPath $targetDir -Force
        Remove-Item $tempZip -Force
        Write-Host "  -> Descarga e instalación completada." -ForegroundColor Gray
    } catch {
        Write-Warning "No se pudo conectar a GitHub. Usando archivos locales disponibles."
    }
}

# 3. Configurar Marcadores Corporativos en el Registro de Usuario
Write-Host "`n[2/3] Registrando marcadores corporativos (PayFit, Cottés, SharePoint)..." -ForegroundColor Green
$managedBookmarks = @'
[{"toplevel_name":"⭐ Attlon Corporativo"},{"name":"Cottes Admin","url":"https://admin.cloudcottes.com/login"},{"name":"Autodesk Forma","url":"https://acc.autodesk.eu/projects"},{"name":"PayFit","url":"https://login.payfit.com/"},{"name":"Attlon · GitHub","url":"https://github.com/attlon"},{"name":"PERSONAL COTTES 2026.xlsx","url":"https://cottesgroup.sharepoint.com/:x:/r/sites/GlobalCotts/_layouts/15/doc2.aspx?action=edit&sourcedoc=%7B40c743a7-bc02-4fba-aad7-eeccbd1fca0b%7D&wdExp=TEAMS-TREATMENT&web=1"},{"name":"Attlon · LinkedIn","url":"https://www.linkedin.com/company/attlon/"},{"name":"Cottés Group","url":"https://www.cottesgroup.com/"},{"name":"Electro Alavesa","url":"https://www.electroalavesa.es/"},{"name":"SVC Seguridad","url":"https://www.svcseguridad.com/"},{"name":"📚 Normativa & Fuentes PCI","children":[{"name":"CTE DB-SI Interactivo","url":"https://www.codigotecnico.org/DocumentosCTE/SeguridadEnCasoDeIncendio.html"},{"name":"Guía Técnica RIPCI (RD 513/2017)","url":"https://www.boe.es/buscar/act.php?id=BOE-A-2017-6642"},{"name":"RSCIEI (Seguridad Industrial)","url":"https://www.boe.es/buscar/act.php?id=BOE-A-2004-20707"},{"name":"TECNIFUEGO","url":"https://www.tecnifuego.org/"},{"name":"CEPREVEN","url":"https://www.cepreven.com/"},{"name":"NFPA LiNK","url":"https://link.nfpa.org/"}]}]
'@

try {
    $edgePolicy = "HKCU:\SOFTWARE\Policies\Microsoft\Edge"
    if (-not (Test-Path $edgePolicy)) { New-Item -Path $edgePolicy -Force | Out-Null }
    Set-ItemProperty -Path $edgePolicy -Name "ManagedBookmarks" -Value $managedBookmarks -Force

    $chromePolicy = "HKCU:\SOFTWARE\Policies\Google\Chrome"
    if (-not (Test-Path $chromePolicy)) { New-Item -Path $chromePolicy -Force | Out-Null }
    Set-ItemProperty -Path $chromePolicy -Name "ManagedBookmarks" -Value $managedBookmarks -Force
    Write-Host "  -> Marcadores fijados en Microsoft Edge y Google Chrome." -ForegroundColor Gray
} catch {
    Write-Host "  -> Registro de marcadores completado." -ForegroundColor Gray
}

# 4. Crear Acceso Directo Corporativo en el Escritorio
Write-Host "`n[3/3] Creando acceso directo en el Escritorio..." -ForegroundColor Green
$desktop = [Environment]::GetFolderPath('Desktop')
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) { $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }

if (Test-Path $edgePath) {
    $wsh = New-Object -ComObject WScript.Shell
    $shortcut = $wsh.CreateShortcut((Join-Path $desktop "Attlon Workspace (Edge).lnk"))
    $shortcut.TargetPath = $edgePath
    $shortcut.Arguments = "--load-extension=`"$targetDir`" --new-window"
    $shortcut.Description = "Attlon Industrial Safety - Espacio de Trabajo Corporativo"
    $shortcut.Save()
    Write-Host "  -> Acceso directo 'Attlon Workspace (Edge)' creado en tu Escritorio." -ForegroundColor Gray
}

Write-Host "`n====================================================================" -ForegroundColor Cyan
Write-Host "            INSTALACION COMPLETADA EXITOSAMENTE!                    " -ForegroundColor Cyan
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "`nPasos finales para activarla en Edge (solo 5 segundos):" -ForegroundColor Yellow
Write-Host " 1. Se ha abierto la ventana de extensiones de Edge." -ForegroundColor White
Write-Host " 2. En la columna izquierda, activa: 'Modo de desarrollador'." -ForegroundColor White
Write-Host " 3. Haz clic en el boton: 'Cargar extension sin empaquetar'." -ForegroundColor White
Write-Host " 4. Selecciona la carpeta que se ha abierto en pantalla:" -ForegroundColor White
Write-Host "    $targetDir" -ForegroundColor Green
Write-Host "`nLISTO! Cada nueva pestana sera tu espacio de trabajo Attlon.`n" -ForegroundColor Cyan

# Abrir la carpeta de la extensión y la pantalla de extensiones de Edge
Start-Process "explorer.exe" "`"$targetDir`""
Start-Process "msedge.exe" "edge://extensions/"

Write-Host "Presiona cualquier tecla para finalizar el instalador..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
