<#
.SYNOPSIS
    Script de despliegue automatizado de la directiva corporativa de Attlon Industrial Safety.
.DESCRIPTION
    Aplica en el Registro de Windows la instalación forzada silenciosa de la extensión de Attlon
    tanto para Microsoft Edge como para Google Chrome, junto con los marcadores corporativos gestionados.
.NOTES
    Requiere ejecutarse con privilegios de Administrador.
#>

# 1. Verificar privilegios de Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Warning "AVISO: Este script debe ejecutarse como Administrador para modificar las directivas HKEY_LOCAL_MACHINE."
    Write-Host "Ejecuta PowerShell con 'Ejecutar como administrador'." -ForegroundColor Yellow
    exit 1
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   ATTLON INDUSTRIAL SAFETY - DESPLIEGUE DE DIRECTIVAS    " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$extensionId = "hicaopniefkebbhmaaklcejlplmpbako"
$chromeUpdateUrl = "https://clients2.google.com/service/update2/crx"
$edgeUpdateUrl = "https://edge.microsoft.com/extensionwebstorebase/v1/crx"

# 2. Configurar Directivas de Google Chrome
Write-Host "`n[1/3] Configurando directivas para Google Chrome..." -ForegroundColor Green
$chromePolicyPath = "HKLM:\SOFTWARE\Policies\Google\Chrome"
$chromeForceListPath = "$chromePolicyPath\ExtensionInstallForcelist"

if (-not (Test-Path $chromePolicyPath)) { New-Item -Path $chromePolicyPath -Force | Out-Null }
if (-not (Test-Path $chromeForceListPath)) { New-Item -Path $chromeForceListPath -Force | Out-Null }

Set-ItemProperty -Path $chromeForceListPath -Name "1" -Value "$extensionId;$chromeUpdateUrl" -Force
Write-Host "  -> Instalación forzada en Chrome configurada (ID: $extensionId)" -ForegroundColor Gray

# 3. Configurar Directivas de Microsoft Edge
Write-Host "`n[2/3] Configurando directivas para Microsoft Edge..." -ForegroundColor Green
$edgePolicyPath = "HKLM:\SOFTWARE\Policies\Microsoft\Edge"
$edgeForceListPath = "$edgePolicyPath\ExtensionInstallForcelist"

if (-not (Test-Path $edgePolicyPath)) { New-Item -Path $edgePolicyPath -Force | Out-Null }
if (-not (Test-Path $edgeForceListPath)) { New-Item -Path $edgeForceListPath -Force | Out-Null }

Set-ItemProperty -Path $edgeForceListPath -Name "1" -Value "$extensionId;$edgeUpdateUrl" -Force
Write-Host "  -> Instalación forzada en Edge configurada (ID: $extensionId)" -ForegroundColor Gray

# 4. Inyectar Marcadores Gestionados (Managed Bookmarks)
Write-Host "`n[3/3] Inyectando marcadores corporativos gestionados..." -ForegroundColor Green
$bookmarksJson = @'
[{"toplevel_name":"⭐ Attlon Corporativo"},{"name":"Cottes Admin","url":"https://admin.cloudcottes.com/login"},{"name":"Autodesk Forma","url":"https://acc.autodesk.eu/projects"},{"name":"PayFit","url":"https://login.payfit.com/"},{"name":"Attlon · GitHub","url":"https://github.com/attlon"},{"name":"PERSONAL COTTES 2026.xlsx","url":"https://cottesgroup.sharepoint.com/:x:/r/sites/GlobalCotts/_layouts/15/doc2.aspx?action=edit&sourcedoc=%7B40c743a7-bc02-4fba-aad7-eeccbd1fca0b%7D&wdExp=TEAMS-TREATMENT&web=1"},{"name":"Attlon · LinkedIn","url":"https://www.linkedin.com/company/attlon/"},{"name":"Cottés Group","url":"https://www.cottesgroup.com/"},{"name":"Electro Alavesa","url":"https://www.electroalavesa.es/"},{"name":"SVC Seguridad","url":"https://www.svcseguridad.com/"},{"name":"📚 Normativa & Fuentes PCI","children":[{"name":"CTE DB-SI Interactivo","url":"https://www.codigotecnico.org/DocumentosCTE/SeguridadEnCasoDeIncendio.html"},{"name":"Guía Técnica RIPCI (RD 513/2017)","url":"https://www.boe.es/buscar/act.php?id=BOE-A-2017-6642"},{"name":"RSCIEI (Seguridad Industrial)","url":"https://www.boe.es/buscar/act.php?id=BOE-A-2004-20707"},{"name":"TECNIFUEGO","url":"https://www.tecnifuego.org/"},{"name":"CEPREVEN","url":"https://www.cepreven.com/"},{"name":"NFPA LiNK","url":"https://link.nfpa.org/"}]}]
'@

Set-ItemProperty -Path $chromePolicyPath -Name "ManagedBookmarks" -Value $bookmarksJson -Force
Set-ItemProperty -Path $edgePolicyPath -Name "ManagedBookmarks" -Value $bookmarksJson -Force
Write-Host "  -> Marcadores corporativos fijados en Chrome y Edge." -ForegroundColor Gray

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  DIRECTIVAS APLICADAS CON EXITO EN ESTE EQUIPO!           " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Para comprobarlo ahora mismo:" -ForegroundColor Yellow
Write-Host "1. Abre Microsoft Edge y ve a: edge://policy" -ForegroundColor White
Write-Host "2. Pulsa en 'Recargar directivas'." -ForegroundColor White
Write-Host "3. Abre Google Chrome y ve a: chrome://policy" -ForegroundColor White
