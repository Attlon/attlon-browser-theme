using System;
using System.Drawing;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Win32;

namespace AttlonInstaller
{
    public class InstallerForm : Form
    {
        private Label lblTitle;
        private Label lblStatus;
        private ProgressBar progressBar;
        private System.Windows.Forms.Timer timer;
        private int step = 0;
        private string targetDir;

        public InstallerForm()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            this.Text = "Attlon Industrial Safety - Instalador Corporativo";
            this.Size = new Size(520, 220);
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.StartPosition = FormStartPosition.CenterScreen;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.BackColor = Color.FromArgb(0, 19, 43); // Dark Navy Attlon

            lblTitle = new Label();
            lblTitle.Text = "ATTLON WORKSPACE & SUITE";
            lblTitle.Font = new Font("Segoe UI", 14, FontStyle.Bold);
            lblTitle.ForeColor = Color.FromArgb(9, 227, 111); // Neon Emerald Attlon
            lblTitle.Location = new Point(30, 25);
            lblTitle.AutoSize = true;

            lblStatus = new Label();
            lblStatus.Text = "Iniciando instalación en Google Chrome y Microsoft Edge...";
            lblStatus.Font = new Font("Segoe UI", 9.5f, FontStyle.Regular);
            lblStatus.ForeColor = Color.FromArgb(249, 246, 230); // Ivory
            lblStatus.Location = new Point(30, 65);
            lblStatus.Size = new Size(450, 25);

            progressBar = new ProgressBar();
            progressBar.Location = new Point(30, 100);
            progressBar.Size = new Size(445, 24);
            progressBar.Style = ProgressBarStyle.Continuous;
            progressBar.Value = 10;

            this.Controls.Add(lblTitle);
            this.Controls.Add(lblStatus);
            this.Controls.Add(progressBar);

            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            targetDir = Path.Combine(localAppData, "Attlon", "Extension");

            timer = new System.Windows.Forms.Timer();
            timer.Interval = 400;
            timer.Tick += Timer_Tick;
        }

        protected override void OnShown(EventArgs e)
        {
            base.OnShown(e);
            timer.Start();
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            step++;
            switch (step)
            {
                case 1:
                    lblStatus.Text = "1/4 Desplegando archivos de la extensión corporativa...";
                    progressBar.Value = 35;
                    DeployExtensionFiles();
                    break;

                case 2:
                    lblStatus.Text = "2/4 Configurando políticas y marcadores (PayFit, Cottés, PCI)...";
                    progressBar.Value = 65;
                    ConfigurePoliciesAndBookmarks();
                    break;

                case 3:
                    lblStatus.Text = "3/4 Creando accesos directos para Chrome y Edge...";
                    progressBar.Value = 90;
                    CreateShortcuts();
                    break;

                case 4:
                    lblStatus.Text = "✓ ¡Instalación completada! Abriendo navegadores...";
                    progressBar.Value = 100;
                    LaunchBrowsers();
                    break;

                case 6:
                    timer.Stop();
                    this.Close();
                    Application.Exit();
                    break;
            }
        }

        private void DeployExtensionFiles()
        {
            try
            {
                if (!Directory.Exists(targetDir))
                {
                    Directory.CreateDirectory(targetDir);
                }

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
            }
            catch { }
        }

        private void ConfigurePoliciesAndBookmarks()
        {
            string bookmarksJson = @"[{""toplevel_name"":""⭐ Attlon Corporativo""},{""name"":""Cottes Admin"",""url"":""https://admin.cloudcottes.com/login""},{""name"":""Autodesk Forma"",""url"":""https://acc.autodesk.eu/projects""},{""name"":""PayFit"",""url"":""https://login.payfit.com/""},{""name"":""Attlon · GitHub"",""url"":""https://github.com/attlon""},{""name"":""PERSONAL COTTES 2026.xlsx"",""url"":""https://cottesgroup.sharepoint.com/:x:/r/sites/GlobalCotts/_layouts/15/doc2.aspx?action=edit&sourcedoc=%7B40c743a7-bc02-4fba-aad7-eeccbd1fca0b%7D&wdExp=TEAMS-TREATMENT&web=1""},{""name"":""Attlon · LinkedIn"",""url"":""https://www.linkedin.com/company/attlon/""},{""name"":""Cottés Group"",""url"":""https://www.cottesgroup.com/""},{""name"":""Electro Alavesa"",""url"":""https://www.electroalavesa.es/""},{""name"":""SVC Seguridad"",""url"":""https://www.svcseguridad.com/""},{""name"":""📚 Normativa & Fuentes PCI"",""children"":[{""name"":""CTE DB-SI Interactivo"",""url"":""https://www.codigotecnico.org/DocumentosCTE/SeguridadEnCasoDeIncendio.html""},{""name"":""Guía Técnica RIPCI (RD 513/2017)"",""url"":""https://www.boe.es/buscar/act.php?id=BOE-A-2017-6642""},{""name"":""RSCIEI (Seguridad Industrial)"",""url"":""https://www.boe.es/buscar/act.php?id=BOE-A-2004-20707""},{""name"":""TECNIFUEGO"",""url"":""https://www.tecnifuego.org/""},{""name"":""CEPREVEN"",""url"":""https://www.cepreven.com/""},{""name"":""NFPA LiNK"",""url"":""https://link.nfpa.org/""}]}]";

            try
            {
                // Edge
                using (RegistryKey edgeKey = Registry.CurrentUser.CreateSubKey(@"SOFTWARE\Policies\Microsoft\Edge"))
                {
                    if (edgeKey != null)
                    {
                        edgeKey.SetValue("ManagedBookmarks", bookmarksJson, RegistryValueKind.String);
                    }
                }
                using (RegistryKey edgeForce = Registry.CurrentUser.CreateSubKey(@"SOFTWARE\Policies\Microsoft\Edge\ExtensionInstallForcelist"))
                {
                    if (edgeForce != null)
                    {
                        edgeForce.SetValue("1", "hicaopniefkebbhmaaklcejlplmpbako;https://edge.microsoft.com/extensionwebstorebase/v1/crx", RegistryValueKind.String);
                    }
                }

                // Chrome
                using (RegistryKey chromeKey = Registry.CurrentUser.CreateSubKey(@"SOFTWARE\Policies\Google\Chrome"))
                {
                    if (chromeKey != null)
                    {
                        chromeKey.SetValue("ManagedBookmarks", bookmarksJson, RegistryValueKind.String);
                    }
                }
                using (RegistryKey chromeForce = Registry.CurrentUser.CreateSubKey(@"SOFTWARE\Policies\Google\Chrome\ExtensionInstallForcelist"))
                {
                    if (chromeForce != null)
                    {
                        chromeForce.SetValue("1", "hicaopniefkebbhmaaklcejlplmpbako;https://clients2.google.com/service/update2/crx", RegistryValueKind.String);
                    }
                }
            }
            catch { }
        }

        private void CreateShortcuts()
        {
            try
            {
                string desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
                Type shellType = Type.GetTypeFromProgID("WScript.Shell");
                if (shellType != null)
                {
                    dynamic shell = Activator.CreateInstance(shellType);

                    // Edge
                    string edgePath = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
                    if (!File.Exists(edgePath)) edgePath = @"C:\Program Files\Microsoft\Edge\Application\msedge.exe";
                    if (File.Exists(edgePath))
                    {
                        dynamic scEdge = shell.CreateShortcut(Path.Combine(desktop, "Microsoft Edge (Attlon).lnk"));
                        scEdge.TargetPath = edgePath;
                        scEdge.Arguments = "--load-extension=\"" + targetDir + "\"";
                        scEdge.Description = "Microsoft Edge con espacio corporativo Attlon";
                        scEdge.Save();
                    }

                    // Chrome
                    string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                    string chromePath = @"C:\Program Files\Google\Chrome\Application\chrome.exe";
                    if (!File.Exists(chromePath)) chromePath = @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
                    if (!File.Exists(chromePath))
                    {
                        string localChrome = Path.Combine(localAppData, @"Google\Chrome\Application\chrome.exe");
                        if (File.Exists(localChrome)) chromePath = localChrome;
                    }
                    if (File.Exists(chromePath))
                    {
                        dynamic scChrome = shell.CreateShortcut(Path.Combine(desktop, "Google Chrome (Attlon).lnk"));
                        scChrome.TargetPath = chromePath;
                        scChrome.Arguments = "--load-extension=\"" + targetDir + "\"";
                        scChrome.Description = "Google Chrome con espacio corporativo Attlon";
                        scChrome.Save();
                    }
                }
            }
            catch { }
        }

        private void LaunchBrowsers()
        {
            try
            {
                // Iniciar Edge con la extensión ya cargada
                string edgePath = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
                if (!File.Exists(edgePath)) edgePath = @"C:\Program Files\Microsoft\Edge\Application\msedge.exe";
                if (File.Exists(edgePath))
                {
                    System.Diagnostics.Process.Start(edgePath, "--load-extension=\"" + targetDir + "\"");
                }
            }
            catch { }

            try
            {
                // Iniciar Chrome con la extensión ya cargada
                string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                string chromePath = @"C:\Program Files\Google\Chrome\Application\chrome.exe";
                if (!File.Exists(chromePath)) chromePath = @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
                if (!File.Exists(chromePath))
                {
                    string localChrome = Path.Combine(localAppData, @"Google\Chrome\Application\chrome.exe");
                    if (File.Exists(localChrome)) chromePath = localChrome;
                }
                if (File.Exists(chromePath))
                {
                    System.Diagnostics.Process.Start(chromePath, "--load-extension=\"" + targetDir + "\"");
                }
            }
            catch { }
        }
    }

    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new InstallerForm());
        }
    }
}
