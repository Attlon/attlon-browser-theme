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

# Helper to draw a radiant 4-pointed sparkle star
function Draw-StarSparkle {
    param(
        [System.Drawing.Graphics]$g,
        [float]$cx,
        [float]$cy,
        [float]$size,
        [int]$alpha,
        [bool]$isEmerald
    )
    $coreColor = [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255)
    $glowColor = if ($isEmerald) { [System.Drawing.Color]::FromArgb([int]($alpha * 0.75), 9, 227, 111) } else { [System.Drawing.Color]::FromArgb([int]($alpha * 0.65), 28, 255, 200) }
    
    # 1. Soft radial glow halo
    $haloPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $haloPath.AddEllipse([float]($cx - $size * 1.3), [float]($cy - $size * 1.3), [float]($size * 2.6), [float]($size * 2.6))
    $haloBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($haloPath)
    $haloBrush.CenterColor = $glowColor
    $haloBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 19, 43))
    $g.FillPath($haloBrush, $haloPath)
    $haloBrush.Dispose()
    $haloPath.Dispose()

    # 2. 4-point celestial diamond rays
    $pen = New-Object System.Drawing.Pen($coreColor, 1.2)
    $g.DrawLine($pen, [float]($cx - $size * 1.7), $cy, [float]($cx + $size * 1.7), $cy)
    $g.DrawLine($pen, $cx, [float]($cy - $size * 1.7), $cx, [float]($cy + $size * 1.7))
    $pen.Dispose()

    # 3. Bright white-hot core
    $coreBrush = New-Object System.Drawing.SolidBrush($coreColor)
    $g.FillEllipse($coreBrush, [float]($cx - 1.2), [float]($cy - 1.2), 2.4, 2.4)
    $coreBrush.Dispose()
}

# Helper to draw an undulating emerald aurora wave
function Draw-AuroraBand {
    param(
        [System.Drawing.Graphics]$g,
        [int]$width,
        [float]$centerY,
        [float]$height,
        [int]$alpha,
        [System.Drawing.Color]$color
    )
    $cloudCount = 14
    $step = $width / ($cloudCount - 1)
    for ($c = 0; $c -lt $cloudCount; $c++) {
        $x = $c * $step
        $w = $step * 2.4
        $yOffset = [Math]::Sin($c * 0.9) * 8
        $y = $centerY + $yOffset
        
        $p = New-Object System.Drawing.Drawing2D.GraphicsPath
        $p.AddEllipse([float]($x - $w / 2), [float]($y - $height / 2), [float]$w, [float]$height)
        $brush = New-Object System.Drawing.Drawing2D.PathGradientBrush($p)
        $brush.CenterColor = [System.Drawing.Color]::FromArgb($alpha, $color.R, $color.G, $color.B)
        $brush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 19, 43))
        $g.FillPath($brush, $p)
        $brush.Dispose()
        $p.Dispose()
    }
}

# 2. Render Frame Background (theme_frame.png) - Emerald Aura & Celestial Stars across the Tab Strip!
Write-Host "Rendering Emerald Aura & Stars Frame Background (1920x140)..."
$frameW = 1920
$frameH = 140
$bmpFrame = New-Object System.Drawing.Bitmap($frameW, $frameH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gFrame = [System.Drawing.Graphics]::FromImage($bmpFrame)
$gFrame.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Corporate deep navy gradient
$cFrameTop = [System.Drawing.Color]::FromArgb(255, 0, 9, 22)
$cFrameBottom = [System.Drawing.Color]::FromArgb(255, 0, 19, 43)
$gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, $frameH)),
    $cFrameTop,
    $cFrameBottom
)
$gFrame.FillRectangle($gradBrush, 0, 0, $frameW, $frameH)
$gradBrush.Dispose()

# VIBRANT EMERALD AURORA BANDS DIRECTLY IN THE TAB STRIP (Y: 2px to 45px)
$cEmeraldNeon = [System.Drawing.Color]::FromArgb(255, 9, 227, 111)
$cEmeraldCyan = [System.Drawing.Color]::FromArgb(255, 28, 255, 170)
$cAquaGlow    = [System.Drawing.Color]::FromArgb(255, 0, 235, 195)

# Layer 1: Core vibrant aurora ribbon
Draw-AuroraBand -g $gFrame -width $frameW -centerY 18 -height 44 -alpha 175 -color $cEmeraldNeon

# Layer 2: Luminous cyan undertone ribbon
Draw-AuroraBand -g $gFrame -width $frameW -centerY 26 -height 52 -alpha 135 -color $cEmeraldCyan

# Layer 3: High rim glow along top of tabs
Draw-AuroraBand -g $gFrame -width $frameW -centerY 8 -height 26 -alpha 150 -color $cAquaGlow

# SPARKLING 4-POINT CELESTIAL STARS ACROSS THE TAB BAR
$rnd = New-Object System.Random(777)
for ($s = 0; $s -lt 45; $s++) {
    $sx = $rnd.Next(15, ($frameW - 15))
    $sy = $rnd.Next(4, 46) # Directly where tabs sit!
    $size = [float]($rnd.Next(5, 10))
    $alpha = $rnd.Next(180, 255)
    $isEmerald = ($rnd.Next(0, 2) -eq 0)
    Draw-StarSparkle -g $gFrame -cx $sx -cy $sy -size $size -alpha $alpha -isEmerald $isEmerald
}

# DELICATE TWINKLING STAR DUST (points of light)
for ($i = 0; $i -lt 110; $i++) {
    $sx = $rnd.Next(8, ($frameW - 8))
    $sy = $rnd.Next(2, 65)
    $alpha = $rnd.Next(100, 240)
    $isEm = ($rnd.Next(0, 3) -eq 0)
    $sColor = if ($isEm) { [System.Drawing.Color]::FromArgb($alpha, 9, 227, 111) } else { [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255) }
    $sBrush = New-Object System.Drawing.SolidBrush($sColor)
    $rad = if ($rnd.Next(0, 4) -eq 0) { 2.0 } else { 1.2 }
    $gFrame.FillEllipse($sBrush, [float]($sx - $rad/2), [float]($sy - $rad/2), [float]$rad, [float]$rad)
    $sBrush.Dispose()
}

# Bottom border line with emerald accent
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
$cInTop = [System.Drawing.Color]::FromArgb(255, 0, 6, 16)
$cInBottom = [System.Drawing.Color]::FromArgb(255, 0, 13, 29)
$gradIn = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, $frameH)),
    $cInTop,
    $cInBottom
)
$gFrameIn.FillRectangle($gradIn, 0, 0, $frameW, $frameH)
$gradIn.Dispose()

# Inactive aurora (gentler)
Draw-AuroraBand -g $gFrameIn -width $frameW -centerY 18 -height 40 -alpha 100 -color $cEmeraldNeon

# Inactive sparkle stars
$rndIn = New-Object System.Random(888)
for ($s = 0; $s -lt 22; $s++) {
    $sx = $rndIn.Next(15, ($frameW - 15))
    $sy = $rndIn.Next(6, 44)
    $size = [float]($rndIn.Next(4, 7))
    $alpha = $rndIn.Next(110, 180)
    Draw-StarSparkle -g $gFrameIn -cx $sx -cy $sy -size $size -alpha $alpha -isEmerald $true
}

$penLineIn = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(50, 9, 227, 111), 1)
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
$cToolbarTop = [System.Drawing.Color]::FromArgb(255, 0, 22, 50)
$cToolbarBottom = [System.Drawing.Color]::FromArgb(255, 0, 27, 62)
$gradTb = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, $tbH)),
    $cToolbarTop,
    $cToolbarBottom
)
$gToolbar.FillRectangle($gradTb, 0, 0, $tbW, $tbH)
$gradTb.Dispose()

# Horizon emerald aura along the top where tabs connect
$penTbTop = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 9, 227, 111), 1.5)
$gToolbar.DrawLine($penTbTop, 0, 0, $tbW, 0)
$penTbTop.Dispose()

# Soft horizon glow band
$tbGlowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$tbGlowPath.AddRectangle((New-Object System.Drawing.Rectangle(0, 0, $tbW, 12)))
$tbGlowBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, 12)),
    [System.Drawing.Color]::FromArgb(70, 9, 227, 111),
    [System.Drawing.Color]::FromArgb(0, 0, 27, 62)
)
$gToolbar.FillPath($tbGlowBrush, $tbGlowPath)
$tbGlowBrush.Dispose()
$tbGlowPath.Dispose()

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
