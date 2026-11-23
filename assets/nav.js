(function () {
  const mount = document.getElementById('site-nav');
  if (!mount) return;

  const base = mount.dataset.base || './';
  const style = mount.dataset.style || 'card'; // 'full' | 'card'
  const widthClass = mount.dataset.width || 'max-w-6xl';

  // Detect current relative file path for active highlighting
  const path = window.location.pathname.replace(/\\/g, '/');
  const fileName = path.split('/').pop() || 'index.html';

  const menu = [
    {
      type: 'link',
      label: 'Início',
      href: 'index.html',
      match: ['index.html', '']
    },
    {
      type: 'dropdown',
      id: 'dd-sistemas',
      label: 'Sistemas Completos',
      items: [
        { label: '🐟 Tilápias + Horta — V1 (Rede + Calculadora)', href: 'plantas/modelo_tilapia_playlist.html', file: 'modelo_tilapia_playlist.html' },
        { label: '☀️ Tilápias + Horta — V2 (Solar 24h + Eólico)', href: 'plantas/modelo_tilapia_solar_eolico.html', file: 'modelo_tilapia_solar_eolico.html' },
        { label: '🧊 Modelo 3D Interativo (360° — Versão Eólica/Solar)', href: 'plantas/modelo_3d_tilapia_eolico.html', file: 'modelo_3d_tilapia_eolico.html' },
        { label: '🧱 Filtro Solar Duplo — Alvenaria (2×100 L)', href: 'plantas/planta_filtro_solar_alvenaria.html', file: 'planta_filtro_solar_alvenaria.html' },
        { label: '🔄 Aquaponia CHOP2 — 2×3.000 L + Sump', href: 'plantas/planta_aquaponia_6000l.html', file: 'planta_aquaponia_6000l.html' }
      ]
    },
    {
      type: 'dropdown',
      id: 'dd-aeradores',
      label: 'Aeradores',
      items: [
        { label: '⚡ Projeto 1 — Aerador Solar 12V (24h)', href: 'plantas/planta_aerador_solar_12v.html', file: 'planta_aerador_solar_12v.html' },
        { label: '💨 Projeto 2A — Eólico Savonius (1.000–3.000 L)', href: 'plantas/planta_aerador_eolico_mecanico.html', file: 'planta_aerador_eolico_mecanico.html' },
        { label: '🌀 Projeto 2B — Eólico Savonius (5.000 L)', href: 'plantas/planta_aerador_eolico_5000l.html', file: 'planta_aerador_eolico_5000l.html' }
      ]
    },
    {
      type: 'dropdown',
      id: 'dd-pecas',
      label: 'Peças & 3D',
      items: [
        { label: '💧 Bomba de Diafragma para Água', href: 'componentes/bomba_diafragma_agua.html', file: 'bomba_diafragma_agua.html' },
        { label: '🫧 Câmara de Ar / Amortecedor', href: 'componentes/camara_de_ar.html', file: 'camara_de_ar.html' },
        { label: '🌀 Rotor Savonius 1,80×0,95 m (Lista Completa)', href: 'componentes/rotor_savonius.html', file: 'rotor_savonius.html' },
        { label: '⚙️ Excêntrico + Dupla Biela (3 Ângulos)', href: 'plantas/detalhe_excentrico_duplo.html', file: 'detalhe_excentrico_duplo.html' },
        { label: '⬇ Baixar Modelo 3D OpenSCAD (.scad)', href: '3d/excentrico_duplo_5000l.scad', file: 'excentrico_duplo_5000l.scad', download: true }
      ]
    },
    {
      type: 'link',
      label: '📖 Manual Tilápia',
      href: 'manual_tilapia_aquaponia.html',
      match: ['manual_tilapia_aquaponia.html']
    },
    {
      type: 'link',
      label: '📄 Documentação',
      href: 'documentacao.html',
      match: ['documentacao.html']
    }
  ];

  // Inject minimal dropdown styling once
  if (!document.getElementById('site-nav-styles')) {
    const st = document.createElement('style');
    st.id = 'site-nav-styles';
    st.textContent = `
      .snav-dd-menu { display: none; }
      .snav-dd.open > .snav-dd-menu { display: block; }
      @media (hover: hover) {
        .snav-dd:hover > .snav-dd-menu { display: block; }
      }
      @media print {
        #site-nav { display: none !important; }
      }
    `;
    document.head.appendChild(st);
  }

  function buildItem(item) {
    if (item.type === 'link') {
      const isActive = item.match.includes(fileName);
      const cls = isActive
        ? 'px-2.5 py-1.5 rounded-lg bg-[var(--primary)] text-white font-semibold'
        : 'px-2.5 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-[var(--primary)] font-medium transition';
      return `<a href="${base}${item.href}" class="${cls}">${item.label}</a>`;
    }

    const hasActiveChild = item.items.some(sub => sub.file === fileName);
    const btnCls = hasActiveChild
      ? 'px-2.5 py-1.5 rounded-lg bg-[var(--primary)] text-white font-semibold inline-flex items-center gap-1 cursor-pointer'
      : 'px-2.5 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-[var(--primary)] font-medium inline-flex items-center gap-1 cursor-pointer transition';

    const subLinks = item.items.map(sub => {
      const activeSub = sub.file === fileName;
      const subCls = activeSub
        ? 'block px-3 py-2 text-xs font-bold bg-[var(--primary)]/15 text-[var(--primary)] rounded-md'
        : 'block px-3 py-2 text-xs text-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--primary)] rounded-md transition';
      const dlAttr = sub.download ? ' download' : '';
      return `<a href="${base}${sub.href}"${dlAttr} class="${subCls}">${sub.label}</a>`;
    }).join('');

    return `
      <div class="snav-dd relative" data-dd="${item.id}">
        <button type="button" class="${btnCls}" aria-expanded="false">
          <span>${item.label}</span>
          <span class="text-[10px] opacity-80">▾</span>
        </button>
        <div class="snav-dd-menu absolute left-0 top-full pt-1.5 z-50 min-w-[270px]">
          <div class="bg-[var(--card)] border border-[var(--card-border)] rounded-xl shadow-lg p-1.5 space-y-0.5">
            ${subLinks}
          </div>
        </div>
      </div>
    `;
  }

  const navItemsHtml = menu.map(buildItem).join('');

  if (style === 'full') {
    mount.innerHTML = `
      <nav class="sticky top-0 z-40 bg-[var(--card)]/95 backdrop-blur border-b border-[var(--card-border)]">
        <div class="${widthClass} mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <a href="${base}index.html" class="font-extrabold text-[var(--primary)] tracking-tight flex items-center gap-1.5">
            <span>🌊 Aquaponia &amp; Aeradores</span>
          </a>
          <div class="flex flex-wrap items-center gap-1.5">
            ${navItemsHtml}
          </div>
        </div>
      </nav>
    `;
  } else {
    mount.innerHTML = `
      <nav class="${widthClass} mx-auto mb-4 bg-[var(--card)] border border-[var(--card-border)] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs shadow-sm relative z-40">
        <a href="${base}index.html" class="font-extrabold text-[var(--primary)] tracking-tight flex items-center gap-1.5">
          <span>🌊 Aquaponia &amp; Aeradores</span>
        </a>
        <div class="flex flex-wrap items-center gap-1.5">
          ${navItemsHtml}
        </div>
      </nav>
    `;
  }

  // Click support (mobile + desktop click toggle) & click-outside close
  const dropdowns = mount.querySelectorAll('.snav-dd');
  dropdowns.forEach(dd => {
    const btn = dd.querySelector('button');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const wasOpen = dd.classList.contains('open');
      dropdowns.forEach(other => {
        other.classList.remove('open');
        other.querySelector('button').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        dd.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach(dd => {
      dd.classList.remove('open');
      dd.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  });
})();
