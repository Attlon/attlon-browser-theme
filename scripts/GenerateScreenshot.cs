using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

class ScreenshotGenerator
{
    static void Main()
    {
        string outDir = Path.Combine(Directory.GetCurrentDirectory(), "store-assets");
        if (!Directory.Exists(outDir)) Directory.CreateDirectory(outDir);

        int width = 1280;
        int height = 800;

        // Bitmap de 24 bits (no alfa, requerido estrictamente por Chrome Web Store)
        using (Bitmap bmp = new Bitmap(width, height, PixelFormat.Format24bppRgb))
        using (Graphics g = Graphics.FromImage(bmp))
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;

            // 1. Fondo base azul oscuro
            using (SolidBrush darkBg = new SolidBrush(Color.FromArgb(0, 13, 29)))
            {
                g.FillRectangle(darkBg, 0, 0, width, height);
            }

            // 2. Dibujar imagen de fondo arquitectónico
            string bgPath = Path.Combine(Directory.GetCurrentDirectory(), @"src\assets\backgrounds\theme_ntp_background.jpg");
            if (File.Exists(bgPath))
            {
                using (Image bgImg = Image.FromFile(bgPath))
                {
                    g.DrawImage(bgImg, new Rectangle(0, 0, width, height));
                }
            }

            // 3. Capa de oscurecimiento / viñeta para legibilidad
            using (SolidBrush overlay = new SolidBrush(Color.FromArgb(160, 0, 10, 24)))
            {
                g.FillRectangle(overlay, 0, 0, width, height);
            }

            // 4. Barra Superior (Top Bar)
            // Botón Waffle a la izquierda
            using (SolidBrush btnBg = new SolidBrush(Color.FromArgb(200, 0, 19, 43)))
            using (Pen borderPen = new Pen(Color.FromArgb(60, 255, 255, 255)))
            {
                g.FillRectangle(btnBg, 24, 20, 38, 38);
                g.DrawRectangle(borderPen, 24, 20, 38, 38);
                // 9 puntitos waffle
                using (SolidBrush dotBrush = new SolidBrush(Color.FromArgb(9, 227, 111)))
                {
                    for (int r = 0; r < 3; r++)
                    {
                        for (int c = 0; c < 3; c++)
                        {
                            g.FillEllipse(dotBrush, 32 + c * 8, 28 + r * 8, 4, 4);
                        }
                    }
                }
            }

            // Botón El Tiempo a la derecha
            using (SolidBrush btnBg = new SolidBrush(Color.FromArgb(200, 0, 19, 43)))
            using (Pen borderPen = new Pen(Color.FromArgb(50, 9, 227, 111)))
            using (Font pillFont = new Font("Segoe UI", 9.5f, FontStyle.Bold))
            using (SolidBrush textBrush = new SolidBrush(Color.White))
            {
                g.FillRectangle(btnBg, width - 210, 20, 186, 38);
                g.DrawRectangle(borderPen, width - 210, 20, 186, 38);
                g.DrawString("⛅ Valencia · 21°C", pillFont, textBrush, width - 195, 29);
            }

            // 5. Logotipo Central Attlon
            string logoPath = Path.Combine(Directory.GetCurrentDirectory(), @"src\assets\logo\attlon-logo-dark.png");
            if (File.Exists(logoPath))
            {
                using (Image logoImg = Image.FromFile(logoPath))
                {
                    int logoW = 280;
                    int logoH = (int)(logoImg.Height * ((float)logoW / logoImg.Width));
                    int logoX = (width - logoW) / 2;
                    int logoY = 190;
                    g.DrawImage(logoImg, new Rectangle(logoX, logoY, logoW, logoH));
                }
            }

            // 6. Buscador Central Microsoft Copilot
            int searchW = 640;
            int searchH = 50;
            int searchX = (width - searchW) / 2;
            int searchY = 275;

            using (GraphicsPath searchPath = new GraphicsPath())
            {
                searchPath.AddArc(searchX, searchY, 24, 24, 180, 90);
                searchPath.AddArc(searchX + searchW - 24, searchY, 24, 24, 270, 90);
                searchPath.AddArc(searchX + searchW - 24, searchY + searchH - 24, 24, 24, 0, 90);
                searchPath.AddArc(searchX, searchY + searchH - 24, 24, 24, 90, 90);
                searchPath.CloseFigure();

                using (SolidBrush searchBg = new SolidBrush(Color.FromArgb(235, 0, 19, 43)))
                using (Pen searchBorder = new Pen(Color.FromArgb(120, 9, 227, 111), 1.5f))
                {
                    g.FillPath(searchBg, searchPath);
                    g.DrawPath(searchBorder, searchPath);
                }

                using (Font sFont = new Font("Segoe UI", 11, FontStyle.Regular))
                using (SolidBrush sBrush = new SolidBrush(Color.FromArgb(180, 255, 255, 255)))
                {
                    g.DrawString("Buscar en la web o consultar a Microsoft Copilot...", sFont, sBrush, searchX + 22, searchY + 14);
                }

                // Botón Copilot a la derecha
                using (Font cFont = new Font("Segoe UI", 9.5f, FontStyle.Bold))
                using (SolidBrush cBrush = new SolidBrush(Color.FromArgb(9, 227, 111)))
                {
                    g.DrawString("✨ Copilot", cFont, cBrush, searchX + searchW - 90, searchY + 15);
                }
            }

            // 7. Fila de Accesos Directos (Shortcuts)
            string[] shortcutNames = new string[] { "PayFit", "Cottés Admin", "Autodesk", "SharePoint", "Normativa PCI", "LinkedIn" };
            int scCount = shortcutNames.Length;
            int tileW = 86;
            int tileH = 76;
            int gap = 16;
            int totalShortcutsW = scCount * tileW + (scCount - 1) * gap;
            int startX = (width - totalShortcutsW) / 2;
            int startY = 360;

            for (int i = 0; i < scCount; i++)
            {
                int x = startX + i * (tileW + gap);
                using (SolidBrush tileBg = new SolidBrush(Color.FromArgb(200, 0, 19, 43)))
                using (Pen tileBorder = new Pen(Color.FromArgb(40, 255, 255, 255)))
                using (Font nameFont = new Font("Segoe UI", 8.5f, FontStyle.Regular))
                using (SolidBrush nameBrush = new SolidBrush(Color.White))
                {
                    g.FillRectangle(tileBg, x, startY, tileW, tileH);
                    g.DrawRectangle(tileBorder, x, startY, tileW, tileH);

                    // Icono circular
                    using (SolidBrush circleBg = new SolidBrush(Color.FromArgb(40, 9, 227, 111)))
                    using (Pen circleBorder = new Pen(Color.FromArgb(9, 227, 111)))
                    {
                        g.FillEllipse(circleBg, x + 25, startY + 12, 36, 36);
                        g.DrawEllipse(circleBorder, x + 25, startY + 12, 36, 36);
                    }

                    // Letra o símbolo
                    using (Font charFont = new Font("Segoe UI", 12, FontStyle.Bold))
                    using (SolidBrush charBrush = new SolidBrush(Color.FromArgb(9, 227, 111)))
                    {
                        string initial = shortcutNames[i].Substring(0, 1);
                        g.DrawString(initial, charFont, charBrush, x + 35, startY + 18);
                    }

                    // Nombre centrado
                    SizeF sz = g.MeasureString(shortcutNames[i], nameFont);
                    g.DrawString(shortcutNames[i], nameFont, nameBrush, x + (tileW - sz.Width) / 2, startY + 54);
                }
            }

            // 8. Barra Dinámica de Noticias PCI & Actualidad
            int tickerW = 760;
            int tickerH = 44;
            int tickerX = (width - tickerW) / 2;
            int tickerY = 475;

            using (SolidBrush tickBg = new SolidBrush(Color.FromArgb(220, 0, 19, 43)))
            using (Pen tickBorder = new Pen(Color.FromArgb(80, 255, 75, 75)))
            {
                g.FillRectangle(tickBg, tickerX, tickerY, tickerW, tickerH);
                g.DrawRectangle(tickBorder, tickerX, tickerY, tickerW, tickerH);

                // Badge rojo
                using (SolidBrush badgeBg = new SolidBrush(Color.FromArgb(230, 20, 50)))
                using (Font badgeFont = new Font("Segoe UI", 8, FontStyle.Bold))
                using (SolidBrush badgeText = new SolidBrush(Color.White))
                {
                    g.FillRectangle(badgeBg, tickerX + 10, tickerY + 10, 120, 24);
                    g.DrawString("🔴 PCI & ACTUALIDAD", badgeFont, badgeText, tickerX + 16, tickerY + 15);
                }

                // Titular
                using (Font newsFont = new Font("Segoe UI", 9.5f, FontStyle.Regular))
                using (SolidBrush newsText = new SolidBrush(Color.FromArgb(230, 235, 245)))
                {
                    g.DrawString("Tecnifuego analiza las novedades y exigencias en la revisión del RIPCI y CTE DB-SI", newsFont, newsText, tickerX + 140, tickerY + 13);
                }
            }

            // 9. Dock de Herramientas Técnicas al Pie
            int dockW = 860;
            int dockH = 64;
            int dockX = (width - dockW) / 2;
            int dockY = 705;

            using (SolidBrush dockBg = new SolidBrush(Color.FromArgb(230, 0, 19, 43)))
            using (Pen dockBorder = new Pen(Color.FromArgb(50, 9, 227, 111)))
            {
                g.FillRectangle(dockBg, dockX, dockY, dockW, dockH);
                g.DrawRectangle(dockBorder, dockX, dockY, dockW, dockH);

                string[] dockItems = new string[] { "🌡️ Clima Vivo", "🍃 Calidad Aire", "💱 Divisas", "💧 Hidráulica PCI", "📏 Conversor PCI", "🎯 Cobertura PCI" };
                for (int d = 0; d < dockItems.Length; d++)
                {
                    using (Font dFont = new Font("Segoe UI", 9, FontStyle.Bold))
                    using (SolidBrush dText = new SolidBrush(Color.FromArgb(220, 230, 240)))
                    {
                        g.DrawString(dockItems[d], dFont, dText, dockX + 25 + d * 140, dockY + 23);
                    }
                }
            }

            // Guardar en formato JPEG y PNG de 24 bits (sin canal alfa)
            string outJpg = Path.Combine(outDir, "screenshot-1280x800.jpg");
            string outPng = Path.Combine(outDir, "screenshot-1280x800.png");

            ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);
            EncoderParameters encParams = new EncoderParameters(1);
            encParams.Param[0] = new EncoderParameter(Encoder.Quality, 95L);

            bmp.Save(outJpg, jpgEncoder, encParams);
            bmp.Save(outPng, ImageFormat.Png);

            Console.WriteLine("Captura de pantalla 1280x800 generada con éxito (24 bits sin alfa).");
        }
    }

    private static ImageCodecInfo GetEncoder(ImageFormat format)
    {
        ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();
        foreach (ImageCodecInfo codec in codecs)
        {
            if (codec.FormatID == format.Guid)
            {
                return codec;
            }
        }
        return null;
    }
}
