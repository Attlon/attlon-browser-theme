using System;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Windows.Forms;
using Microsoft.Win32;

namespace AttlonInstaller
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            try
            {
                string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                string targetDir = Path.Combine(localAppData, "Attlon", "Extension");

                // 1. Crear directorio permanente
                if (!Directory.Exists(targetDir))
                {
                    Directory.CreateDirectory(targetDir);
                }

                // 2. Extraer archivos embebidos de la extensión
                Assembly assembly = Assembly.GetExecutingAssembly();
                string resourceName = "attlon-dynamic-newtab-edge.zip";

                using (Stream stream = assembly.GetManifestResourceStream(resourceName))
                {
                    if (stream != null)
                    {
                        using (ZipArchive archive = new ZipArchive(stream))
                        {
                            foreach (ZipArchiveEntry entry in archive.Entries)
                            {
                                string destinationPath = Path.Combine(targetDir, entry.FullName);
                                string destinationDir = Path.GetDirectoryName(destinationPath);

                                if (!string.IsNullOrEmpty(destinationDir) && !Directory.Exists(destinationDir))
                                {
                                    Directory.CreateDirectory(destinationDir);
                                }

                                if (!string.IsNullOrEmpty(entry.Name))
                                {
                                    entry.ExtractToFile(destinationPath, true);
                                }
                            }
                        }
                    }
                }

                // 3. Inyectar Marcadores Gestionados (Managed Bookmarks) en Edge y Chrome
                string bookmarksJson = @"[{""toplevel_name"":""⭐ Attlon Corporativo""},{""name"":""Cottes Admin"",""url"":""https://admin.cloudcottes.com/login""},{""name"":""Autodesk Forma"",""url"":""https://acc.autodesk.eu/projects""},{""name"":""PayFit"",""url"":""https://login.payfit.com/""},{""name"":""Attlon · GitHub"",""url"":""https://github.com/attlon""},{""name"":""PERSONAL COTTES 2026.xlsx"",""url"":""https://cottesgroup.sharepoint.com/:x:/r/sites/GlobalCotts/_layouts/15/doc2.aspx?action=edit&sourcedoc=%7B40c743a7-bc02-4fba-aad7-eeccbd1fca0b%7D&wdExp=TEAMS-TREATMENT&web=1""},{""name"":""Attlon · LinkedIn"",""url"":""https://www.linkedin.com/company/attlon/""},{""name"":""Cottés Group"",""url"":""https://www.cottesgroup.com/""},{""name"":""Electro Alavesa"",""url"":""https://www.electroalavesa.es/""},{""name"":""SVC Seguridad"",""url"":""https://www.svcseguridad.com/""},{""name"":""📚 Normativa & Fuentes PCI"",""children"":[{""name"":""CTE DB-SI Interactivo"",""url"":""https://www.codigotecnico.org/DocumentosCTE/SeguridadEnCasoDeIncendio.html""},{""name"":""Guía Técnica RIPCI (RD 513/2017)"",""url"":""https://www.boe.es/buscar/act.php?id=BOE-A-2017-6642""},{""name"":""RSCIEI (Seguridad Industrial)"",""url"":""https://www.boe.es/buscar/act.php?id=BOE-A-2004-20707""},{""name"":""TECNIFUEGO"",""url"":""https://www.tecnifuego.org/""},{""name"":""CEPREVEN"",""url"":""https://www.cepreven.com/""},{""name"":""NFPA LiNK"",""url"":""https://link.nfpa.org/""}]}]";

                try
                {
                    using (RegistryKey edgeKey = Registry.CurrentUser.CreateSubKey(@"SOFTWARE\Policies\Microsoft\Edge"))
                    {
                        if (edgeKey != null) edgeKey.SetValue("ManagedBookmarks", bookmarksJson, RegistryValueKind.String);
                    }

                    using (RegistryKey chromeKey = Registry.CurrentUser.CreateSubKey(@"SOFTWARE\Policies\Google\Chrome"))
                    {
                        if (chromeKey != null) chromeKey.SetValue("ManagedBookmarks", bookmarksJson, RegistryValueKind.String);
                    }
                }
                catch { }

                // 4. Crear accesos directos en el Escritorio
                string desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
                Type shellType = Type.GetTypeFromProgID("WScript.Shell");
                if (shellType != null)
                {
                    dynamic shell = Activator.CreateInstance(shellType);

                    // Acceso directo Edge
                    string edgePath = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
                    if (!File.Exists(edgePath)) edgePath = @"C:\Program Files\Microsoft\Edge\Application\msedge.exe";
                    if (File.Exists(edgePath))
                    {
                        dynamic scEdge = shell.CreateShortcut(Path.Combine(desktop, "Attlon Workspace (Edge).lnk"));
                        scEdge.TargetPath = edgePath;
                        scEdge.Arguments = "--load-extension=\"" + targetDir + "\" --new-window";
                        scEdge.Description = "Attlon Industrial Safety - Espacio de Trabajo Edge";
                        scEdge.Save();
                    }

                    // Acceso directo Chrome
                    string chromePath = @"C:\Program Files\Google\Chrome\Application\chrome.exe";
                    if (!File.Exists(chromePath)) chromePath = @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
                    if (!File.Exists(chromePath))
                    {
                        string localChrome = Path.Combine(localAppData, @"Google\Chrome\Application\chrome.exe");
                        if (File.Exists(localChrome)) chromePath = localChrome;
                    }
                    if (File.Exists(chromePath))
                    {
                        dynamic scChrome = shell.CreateShortcut(Path.Combine(desktop, "Attlon Workspace (Chrome).lnk"));
                        scChrome.TargetPath = chromePath;
                        scChrome.Arguments = "--load-extension=\"" + targetDir + "\" --new-window";
                        scChrome.Description = "Attlon Industrial Safety - Espacio de Trabajo Chrome";
                        scChrome.Save();
                    }
                }

                // 5. Abrir carpeta y navegadores
                System.Diagnostics.Process.Start("explorer.exe", "\"" + targetDir + "\"");
                
                try { System.Diagnostics.Process.Start("msedge.exe", "edge://extensions/"); } catch { }
                try { System.Diagnostics.Process.Start("chrome.exe", "chrome://extensions/"); } catch { }

                MessageBox.Show(
                    "¡Espacio de Trabajo Attlon instalado con éxito!\n\n" +
                    "• Se han configurado Microsoft Edge y Google Chrome.\n" +
                    "• Se crearon los accesos directos en tu Escritorio.\n" +
                    "• Se añadieron los marcadores de PayFit, Cottés y fuentes PCI.\n\n" +
                    "Para activarla de forma permanente en la ventana abierta de extensiones:\n" +
                    "1. Activa el 'Modo de desarrollador'.\n" +
                    "2. Pulsa en 'Cargar extensión sin empaquetar'.\n" +
                    "3. Selecciona la carpeta abierta (" + targetDir + ").",
                    "Attlon Industrial Safety - Instalación Completa",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error durante la instalación: " + ex.Message, "Error - Attlon Installer", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                Application.Exit();
            }
        }
    }
}
