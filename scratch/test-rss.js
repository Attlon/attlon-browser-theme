function formatRelativeTime(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'En directo';
    const diffMs = Date.now() - d.getTime();
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin < 5) return 'Ahora mismo';
    if (diffMin < 60) return `Hace ${diffMin}m`;
    const diffH = Math.round(diffMin / 60);
    if (diffH < 24) return `Hace ${diffH}h`;
    const diffDays = Math.round(diffH / 24);
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  } catch {
    return 'Reciente';
  }
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

async function testFull() {
  const pciUrl = 'https://news.google.com/rss/search?q=incendios+OR+tecnifuego+OR+"seguridad+industrial"+OR+"proteccion+contra+incendios"&hl=es&gl=ES&ceid=ES:es';
  const epUrl = 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada';
  const tmUrl = 'https://www.20minutos.es/rss/';

  const [resPci, resEp, resTm] = await Promise.allSettled([
    fetch(pciUrl).then(r => r.text()),
    fetch(epUrl).then(r => r.text()),
    fetch(tmUrl).then(r => r.text())
  ]);

  const pciArticles = [];
  if (resPci.status === 'fulfilled') {
    const xml = resPci.value;
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
    for (const [_, item] of items) {
      let title = (item.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
      const link = (item.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
      const source = (item.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || '';
      const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
      let desc = (item.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';

      title = stripHtml(title);
      desc = stripHtml(desc);
      let cleanSource = source ? stripHtml(source) : 'PCI';
      let cleanTitle = title;
      const lastDash = title.lastIndexOf(' - ');
      if (lastDash > 20) {
        cleanTitle = title.substring(0, lastDash).trim();
        if (!source) cleanSource = title.substring(lastDash + 3).trim();
      }

      if (link && cleanTitle) {
        pciArticles.push({
          cat: 'pci',
          tag: `PCI · ${cleanSource}`,
          tagClass: 'cat-pci',
          title: cleanTitle,
          summary: desc && desc !== cleanTitle ? desc : `Noticia técnica y de seguridad industrial reportada por ${cleanSource}. Clic para leer el artículo original completo.`,
          url: link.trim(),
          time: formatRelativeTime(pubDate),
          source: cleanSource
        });
      }
    }
  }

  const spainArticles = [];
  if (resEp.status === 'fulfilled') {
    const xml = resEp.value;
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 8);
    for (const [_, item] of items) {
      let title = (item.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
      const link = (item.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
      const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
      let desc = (item.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';
      title = stripHtml(title);
      desc = stripHtml(desc);

      if (link && title) {
        spainArticles.push({
          cat: 'spain',
          tag: 'España · El País',
          tagClass: 'cat-spain',
          title,
          summary: desc && desc !== title ? desc : 'Actualidad informativa nacional en directo. Clic para ampliar la noticia completa en El País.',
          url: link.trim(),
          time: formatRelativeTime(pubDate),
          source: 'El País'
        });
      }
    }
  }

  if (resTm.status === 'fulfilled') {
    const xml = resTm.value;
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 8);
    for (const [_, item] of items) {
      let title = (item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || '';
      const link = (item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/) || [])[1] || '';
      const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
      let desc = (item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/) || [])[1] || '';
      title = stripHtml(title);
      desc = stripHtml(desc);

      if (link && title) {
        spainArticles.push({
          cat: 'spain',
          tag: 'España · 20Minutos',
          tagClass: 'cat-spain',
          title,
          summary: desc && desc !== title ? desc : 'Última hora informativa de España. Clic para ver la cobertura completa en 20Minutos.',
          url: link.trim(),
          time: formatRelativeTime(pubDate),
          source: '20Minutos'
        });
      }
    }
  }

  console.log(`Extracted: ${pciArticles.length} PCI articles, ${spainArticles.length} Spain articles.`);
  console.log("\nSample Combined Item 1:");
  console.log(pciArticles[0]);
  console.log("\nSample Combined Item 2:");
  console.log(spainArticles[0]);
}

testFull();
