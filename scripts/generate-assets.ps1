Add-Type -AssemblyName System.Drawing

$base = "c:\Users\Carlos\OneDrive\Documentos\identidad visual\attlon-browser-theme\src\assets"
$iconsDir = Join-Path $base "icons"
$bgDir = Join-Path $base "backgrounds"
$logoDir = Join-Path $base "logo"

[System.IO.Directory]::CreateDirectory($iconsDir) | Out-Null
[System.IO.Directory]::CreateDirectory($bgDir) | Out-Null
[System.IO.Directory]::CreateDirectory($logoDir) | Out-Null

Write-Host "Rendering Attlon Corporate Icons..."

# Helper to draw Attlon 3-segment symbol on a Graphics context
function Draw-AttlonSymbol {
    param(
        [System.Drawing.Graphics]$g,
        [float]$x,
        [float]$y,
        [float]$size,
        [System.Drawing.Color]$color
    )
    $brush = New-Object System.Drawing.SolidBrush($color)
    $scale = [float]($size / 24.0)

    # Path 1: Right segment
    $p1 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pts1 = [System.Drawing.PointF[]]@(
        [System.Drawing.PointF]::new([float]($x + 20.316 * $scale), [float]($y + 20.183 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 15.384 * $scale), [float]($y + 15.536 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 13.311 * $scale), [float]($y + 10.320 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 15.365 * $scale), [float]($y + 8.364 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 20.271 * $scale), [float]($y + 3.689 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 23.019 * $scale), [float]($y + 8.291 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 16.589 * $scale), [float]($y + 10.908 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 16.611 * $scale), [float]($y + 13.082 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 23.045 * $scale), [float]($y + 15.554 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 21.988 * $scale), [float]($y + 17.942 * $scale))
    )
    $p1.AddPolygon($pts1)
    $g.FillPath($brush, $p1)
    $p1.Dispose()

    # Path 2: Top left segment
    $p2 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pts2 = [System.Drawing.PointF[]]@(
        [System.Drawing.PointF]::new([float]($x + 14.313 * $scale), [float]($y + 0.321 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 12.739 * $scale), [float]($y + 6.902 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 6.516 * $scale),  [float]($y + 10.505 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 0.0 * $scale),    [float]($y + 8.608 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 2.626 * $scale),  [float]($y + 3.935 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 8.116 * $scale),  [float]($y + 8.176 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 9.994 * $scale),  [float]($y + 7.070 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 8.925 * $scale),  [float]($y + 0.281 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 11.530 * $scale), [float]($y + 0.0 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 14.314 * $scale), [float]($y + 0.322 * $scale))
    )
    $p2.AddPolygon($pts2)
    $g.FillPath($brush, $p2)
    $p2.Dispose()

    # Path 3: Bottom left segment
    $p3 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pts3 = [System.Drawing.PointF[]]@(
        [System.Drawing.PointF]::new([float]($x + 0.005 * $scale),  [float]($y + 15.361 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 6.511 * $scale),  [float]($y + 13.430 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 12.754 * $scale), [float]($y + 16.998 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 14.364 * $scale), [float]($y + 23.570 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 8.990 * $scale),  [float]($y + 23.640 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 9.931 * $scale),  [float]($y + 16.782 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 8.030 * $scale),  [float]($y + 15.714 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 2.664 * $scale),  [float]($y + 20.031 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 1.116 * $scale),  [float]($y + 17.924 * $scale)),
        [System.Drawing.PointF]::new([float]($x + 0.005 * $scale),  [float]($y + 15.361 * $scale))
    )
    $p3.AddPolygon($pts3)
    $g.FillPath($brush, $p3)
    $p3.Dispose()

    $brush.Dispose()
}

# 1. Render Icons (16, 32, 48, 128)
$iconSizes = @(16, 32, 48, 128)
$cEmerald = [System.Drawing.Color]::FromArgb(255, 9, 227, 111)
$cNavy = [System.Drawing.Color]::FromArgb(255, 0, 19, 43)
$cBorder = [System.Drawing.Color]::FromArgb(255, 30, 53, 80)

foreach ($s in $iconSizes) {
    $bmp = New-Object System.Drawing.Bitmap($s, $s, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    # Rounded background badge
    $radius = [Math]::Max(2, [int]($s * 0.22))
    $rect = New-Object System.Drawing.Rectangle(0, 0, ($s - 1), ($s - 1))
    
    $bgBrush = New-Object System.Drawing.SolidBrush($cNavy)
    $borderPen = New-Object System.Drawing.Pen($cBorder, 1)

    # Draw rounded rectangle
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $radius * 2
    $path.AddArc($rect.X, $rect.Y, $diameter, $diameter, 180, 90)
    $path.AddArc(($rect.Right - $diameter), $rect.Y, $diameter, $diameter, 270, 90)
    $path.AddArc(($rect.Right - $diameter), ($rect.Bottom - $diameter), $diameter, $diameter, 0, 90)
    $path.AddArc($rect.X, ($rect.Bottom - $diameter), $diameter, $diameter, 90, 90)
    $path.CloseFigure()

    $g.FillPath($bgBrush, $path)
    $g.DrawPath($borderPen, $path)
    $path.Dispose()
    $bgBrush.Dispose()
    $borderPen.Dispose()

    # Draw symbol centered
    $padding = [float]($s * 0.16)
    $symSize = [float]($s - ($padding * 2))
    Draw-AttlonSymbol -g $g -x $padding -y $padding -size $symSize -color $cEmerald

    $g.Dispose()
    $iconPath = Join-Path $iconsDir "icon$s.png"
    $bmp.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created $iconPath"
}

# 2. Render Frame Background (theme_frame.png) - Inspired Architectural CAD Engineering
Write-Host "Rendering High-Definition Inspired Frame Background (1920x140)..."
$frameW = 1920
$frameH = 140
$bmpFrame = New-Object System.Drawing.Bitmap($frameW, $frameH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gFrame = [System.Drawing.Graphics]::FromImage($bmpFrame)
$gFrame.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Corporate deep navy gradient
$cFrameTop = [System.Drawing.Color]::FromArgb(255, 0, 11, 26)
$cFrameBottom = [System.Drawing.Color]::FromArgb(255, 0, 19, 43)
$gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, $frameH)),
    $cFrameTop,
    $cFrameBottom
)
$gFrame.FillRectangle($gradBrush, 0, 0, $frameW, $frameH)
$gradBrush.Dispose()

# Inspired architectural grid lines (engineering blueprint aesthetic)
$gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(18, 9, 227, 111), 1)
$subGridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(12, 160, 178, 198), 1)

# Horizontal lines
for ($y = 20; $y -lt $frameH; $y += 20) {
    $p = if ($y % 40 -eq 0) { $gridPen } else { $subGridPen }
    $gFrame.DrawLine($p, 0, $y, $frameW, $y)
}

# Vertical & Isometric guide lines across header
for ($x = 40; $x -lt $frameW; $x += 40) {
    $p = if ($x % 120 -eq 0) { $gridPen } else { $subGridPen }
    $gFrame.DrawLine($p, $x, 0, $x, $frameH)
}

# Technical crosshair nodes and subtle engineering coordinates on right side
$nodePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(50, 9, 227, 111), 1)
for ($x = 1200; $x -lt $frameW; $x += 120) {
    for ($y = 40; $y -lt $frameH; $y += 40) {
        $gFrame.DrawLine($nodePen, ($x - 4), $y, ($x + 4), $y)
        $gFrame.DrawLine($nodePen, $x, ($y - 4), $x, ($y + 4))
    }
}
$nodePen.Dispose()
$gridPen.Dispose()
$subGridPen.Dispose()

# Subtle bottom border line with emerald accent
$penLine = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 9, 227, 111), 1)
$gFrame.DrawLine($penLine, 0, ($frameH - 1), $frameW, ($frameH - 1))
$penLine.Dispose()
$gFrame.Dispose()
$bmpFrame.Save((Join-Path $bgDir "theme_frame.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpFrame.Dispose()

# 3. Render Inactive Frame Background (theme_frame_inactive.png)
Write-Host "Rendering Inactive Frame Background (1920x140)..."
$bmpFrameIn = New-Object System.Drawing.Bitmap($frameW, $frameH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gFrameIn = [System.Drawing.Graphics]::FromImage($bmpFrameIn)
$cInTop = [System.Drawing.Color]::FromArgb(255, 0, 7, 18)
$cInBottom = [System.Drawing.Color]::FromArgb(255, 0, 13, 29)
$gradIn = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, $frameH)),
    $cInTop,
    $cInBottom
)
$gFrameIn.FillRectangle($gradIn, 0, 0, $frameW, $frameH)
$gradIn.Dispose()

$subGridPenIn = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(8, 160, 178, 198), 1)
for ($y = 20; $y -lt $frameH; $y += 20) {
    $gFrameIn.DrawLine($subGridPenIn, 0, $y, $frameW, $y)
}
for ($x = 60; $x -lt $frameW; $x += 60) {
    $gFrameIn.DrawLine($subGridPenIn, $x, 0, $x, $frameH)
}
$subGridPenIn.Dispose()

$penLineIn = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 30, 53, 80), 1)
$gFrameIn.DrawLine($penLineIn, 0, ($frameH - 1), $frameW, ($frameH - 1))
$penLineIn.Dispose()
$gFrameIn.Dispose()
$bmpFrameIn.Save((Join-Path $bgDir "theme_frame_inactive.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpFrameIn.Dispose()

# 4. Render Toolbar Background (theme_toolbar.png) - 1920x90
Write-Host "Rendering Toolbar Background (1920x90)..."
$tbW = 1920
$tbH = 90
$bmpToolbar = New-Object System.Drawing.Bitmap($tbW, $tbH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gToolbar = [System.Drawing.Graphics]::FromImage($bmpToolbar)
$cToolbarTop = [System.Drawing.Color]::FromArgb(255, 0, 24, 55)
$cToolbarBottom = [System.Drawing.Color]::FromArgb(255, 0, 27, 62)
$gradTb = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, $tbH)),
    $cToolbarTop,
    $cToolbarBottom
)
$gToolbar.FillRectangle($gradTb, 0, 0, $tbW, $tbH)
$gradTb.Dispose()

# Subtle top and bottom borders
$penTbTop = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 40, 70, 105), 1)
$gToolbar.DrawLine($penTbTop, 0, 0, $tbW, 0)
$penTbTop.Dispose()

$penTbBottom = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 9, 227, 111), 1)
$gToolbar.DrawLine($penTbBottom, 0, ($tbH - 1), $tbW, ($tbH - 1))
$penTbBottom.Dispose()

$gToolbar.Dispose()
$bmpToolbar.Save((Join-Path $bgDir "theme_toolbar.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpToolbar.Dispose()

# 5. Render NTP Attribution Badge (theme_ntp_attribution.png)
Write-Host "Rendering NTP Attribution Badge..."
$attrW = 160
$attrH = 34
$bmpAttr = New-Object System.Drawing.Bitmap($attrW, $attrH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gAttr = [System.Drawing.Graphics]::FromImage($bmpAttr)
$gAttr.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gAttr.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$gAttr.Clear([System.Drawing.Color]::Transparent)

# Glass container pill
$attrRect = New-Object System.Drawing.Rectangle(0, 0, ($attrW - 1), ($attrH - 1))
$pillPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$rPill = 6
$d = $rPill * 2
$pillPath.AddArc($attrRect.X, $attrRect.Y, $d, $d, 180, 90)
$pillPath.AddArc(($attrRect.Right - $d), $attrRect.Y, $d, $d, 270, 90)
$pillPath.AddArc(($attrRect.Right - $d), ($attrRect.Bottom - $d), $d, $d, 0, 90)
$pillPath.AddArc($attrRect.X, ($attrRect.Bottom - $d), $d, $d, 90, 90)
$pillPath.CloseFigure()

$bgAttrBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 0, 19, 43))
$borderAttrPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(150, 30, 53, 80), 1)
$gAttr.FillPath($bgAttrBrush, $pillPath)
$gAttr.DrawPath($borderAttrPen, $pillPath)
$pillPath.Dispose()
$bgAttrBrush.Dispose()
$borderAttrPen.Dispose()

# Draw Symbol in Attribution
Draw-AttlonSymbol -g $gAttr -x 8.0 -y 7.0 -size 20.0 -color $cEmerald

# Draw "ATTLON" text
$font = New-Object System.Drawing.Font("Arial", 8.5, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font("Arial", 6.0, [System.Drawing.FontStyle]::Regular)
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 249, 246, 230))
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 160, 178, 198))

$gAttr.DrawString("ATTLON", $font, $textBrush, 34, 4)
$gAttr.DrawString("INDUSTRIAL SAFETY", $fontSub, $subBrush, 35, 18)

$font.Dispose()
$fontSub.Dispose()
$textBrush.Dispose()
$subBrush.Dispose()
$gAttr.Dispose()
$bmpAttr.Save((Join-Path $bgDir "theme_ntp_attribution.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpAttr.Dispose()

# 6. NTP Wallpaper (theme_ntp_background.jpg)
$srcWallpaper = "c:\Users\Carlos\OneDrive\Documentos\identidad visual\attlon_ntp_wallpaper.jpg"
$destWallpaper = Join-Path $bgDir "theme_ntp_background.jpg"
if (Test-Path $srcWallpaper) {
    Copy-Item $srcWallpaper -Destination $destWallpaper -Force
    Write-Host "Optimized Wallpaper copied to $destWallpaper"
}

# 7. Render Raster Logos (attlon-logo-dark.png, attlon-logo-light.png)
Write-Host "Rendering Raster Logos..."
$logoW = 408
$logoH = 96
$bmpLogoDark = New-Object System.Drawing.Bitmap($logoW, $logoH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gLd = [System.Drawing.Graphics]::FromImage($bmpLogoDark)
$gLd.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gLd.Clear([System.Drawing.Color]::Transparent)
Draw-AttlonSymbol -g $gLd -x 0.0 -y 0.0 -size 96.0 -color $cEmerald
$fontLogo = New-Object System.Drawing.Font("Arial", 46, [System.Drawing.FontStyle]::Bold)
$brushDarkText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 249, 246, 230))
$gLd.DrawString("ATTLON", $fontLogo, $brushDarkText, 110, 16)
$gLd.Dispose()
$bmpLogoDark.Save((Join-Path $logoDir "attlon-logo-dark.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpLogoDark.Dispose()

$bmpLogoLight = New-Object System.Drawing.Bitmap($logoW, $logoH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gLl = [System.Drawing.Graphics]::FromImage($bmpLogoLight)
$gLl.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gLl.Clear([System.Drawing.Color]::Transparent)
Draw-AttlonSymbol -g $gLl -x 0.0 -y 0.0 -size 96.0 -color $cEmerald
$brushLightText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 27, 62))
$gLl.DrawString("ATTLON", $fontLogo, $brushLightText, 110, 16)
$fontLogo.Dispose()
$brushLightText.Dispose()
$brushDarkText.Dispose()
$gLl.Dispose()
$bmpLogoLight.Save((Join-Path $logoDir "attlon-logo-light.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpLogoLight.Dispose()

Write-Host "All assets generated successfully!"
