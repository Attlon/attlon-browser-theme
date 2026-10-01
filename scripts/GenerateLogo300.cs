using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

class LogoGenerator
{
    static void Main()
    {
        string outDir = Path.Combine(Directory.GetCurrentDirectory(), "store-assets");
        if (!Directory.Exists(outDir)) Directory.CreateDirectory(outDir);

        // Generar 1: Fondo Oscuro Corporativo Attlon (Recomendado para Microsoft Store)
        using (Bitmap bmp = new Bitmap(300, 300, PixelFormat.Format32bppArgb))
        using (Graphics g = Graphics.FromImage(bmp))
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;

            // Fondo Azul Marino Attlon (#00132B)
            using (SolidBrush bg = new SolidBrush(Color.FromArgb(0, 19, 43)))
            {
                g.FillRectangle(bg, 0, 0, 300, 300);
            }

            // Suave resplandor radial esmeralda
            using (GraphicsPath glowPath = new GraphicsPath())
            {
                glowPath.AddEllipse(30, 30, 240, 240);
                using (PathGradientBrush pgb = new PathGradientBrush(glowPath))
                {
                    pgb.CenterColor = Color.FromArgb(45, 9, 227, 111);
                    pgb.SurroundColors = new Color[] { Color.FromArgb(0, 0, 19, 43) };
                    g.FillPath(pgb, glowPath);
                }
            }

            // Cargar o renderizar el símbolo Attlon
            string iconSrc = Path.Combine(Directory.GetCurrentDirectory(), @"src\assets\icons\icon128.png");
            if (File.Exists(iconSrc))
            {
                using (Image src = Image.FromFile(iconSrc))
                {
                    // Dibujar el icono centrado en 180x180 px
                    int size = 180;
                    int x = (300 - size) / 2;
                    int y = (300 - size) / 2;
                    g.DrawImage(src, new Rectangle(x, y, size, size));
                }
            }

            bmp.Save(Path.Combine(outDir, "attlon-logo-300x300.png"), ImageFormat.Png);
        }

        // Generar 2: Transparente (por si la tienda pide transparente)
        using (Bitmap bmpTrans = new Bitmap(300, 300, PixelFormat.Format32bppArgb))
        using (Graphics g = Graphics.FromImage(bmpTrans))
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;

            string iconSrc = Path.Combine(Directory.GetCurrentDirectory(), @"src\assets\icons\icon128.png");
            if (File.Exists(iconSrc))
            {
                using (Image src = Image.FromFile(iconSrc))
                {
                    int size = 220;
                    int x = (300 - size) / 2;
                    int y = (300 - size) / 2;
                    g.DrawImage(src, new Rectangle(x, y, size, size));
                }
            }

            bmpTrans.Save(Path.Combine(outDir, "attlon-logo-300x300-transparent.png"), ImageFormat.Png);
        }

        Console.WriteLine("Logos 300x300 generados con éxito en store-assets/");
    }
}
