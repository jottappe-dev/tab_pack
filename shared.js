// TabPack — Shared: Theme + i18n
// Must be loaded before popup.js / group.js

const I18N = {
  pt: {
    // ── Popup static ──
    selectAll: 'Selecionar todas',
    deselectAll: 'Desmarcar todas',
    filterTabsGroups: 'Filtrar abas e grupos…',
    groupNamePlaceholder: 'Nome do grupo (ex: Pesquisa, Trabalho…)',
    savedGroups: 'Grupos salvos',
    savedGroupsCount: 'Grupos salvos ({0})',
    groupsFiltered: 'Grupos ({0} de {1})',
    noGroupsYet: 'Nenhum grupo ainda',
    exportBackup: '⬇ Exportar',
    importBackup: '⬆ Importar',
    exportTitle: 'Exportar backup',
    importTitle: 'Importar backup',

    // ── Popup dynamic ──
    loadingTabs: 'Carregando abas…',
    noTabsAvailable: 'Nenhuma aba disponível',
    noTabsFound: 'Nenhuma aba encontrada',
    openTabs: 'Abas abertas ({0})',
    tabsFiltered: 'Abas ({0} de {1})',
    noGroupsFound: 'Nenhum grupo encontrado',
    active: 'ativa',
    compactSelected: '📦 Compactar {0} aba{1} selecionada{1}',
    compactNone: '📦 Compactar abas selecionadas',
    compacting: '⏳ Compactando…',
    tabsSelected: '{0} abas selecionadas',
    tabsSelectedLabel: '<span id="countNum">{0}</span> abas selecionadas',
    deleteGroupConfirmPopup: 'Excluir o grupo "{1}"?\nAs {0} abas serão descartadas.',
    groupsExported: '✅ {0} grupo{1} exportado{1}',
    noGroupsToExport: 'Nenhum grupo para exportar',
    groupsImported: '✅ {0} grupo{1} importado{1}',
    noGroupsInFile: '⚠️ Arquivo sem grupos para importar',
    invalidFormat: 'Formato inválido: esperado "groups" (array)',
    maxGroupsImport: 'Máximo de 100 grupos por importação',
    noValidGroups: 'Nenhum grupo válido encontrado no arquivo',
    groupDeleted: 'Grupo excluído',
    errorUnknown: 'Erro desconhecido',

    // ── Time ago ──
    now: 'agora',
    minutesAgo: '{0}m atrás',
    hoursAgo: '{0}h atrás',
    daysAgo: '{0}d atrás',

    // ── Group page static ──
    loadingGroup: 'Carregando grupo…',
    loading: 'Carregando…',
    searchTabsPlaceholder: 'Buscar abas por título ou URL…',
    clear: '✕ Limpar',
    deleteGroupConfirmTitle: 'Excluir este grupo?',
    deleteGroupConfirmText: 'As abas serão descartadas permanentemente.',
    cancel: 'Cancelar',
    delete: 'Excluir',

    // ── Group page dynamic ──
    hibernatedTabs: '🌙 Abas hibernadas',
    savedOn: 'Salvo em',
    tabsUnit: 'aba',
    tabsUnitPlural: 'abas',
    categoriesUnit: 'categoria',
    categoriesUnitPlural: 'categorias',
    duplicateUnit: 'duplicada',
    duplicateUnitPlural: 'duplicadas',
    categorizedInfo: 'Abas organizadas por <strong>categoria</strong>. Expanda para ver os detalhes.',
    expandAll: '📂 Expandir todas',
    collapseAll: '📁 Recolher todas',
    searchBadge: '🔍 Busca',
    noTabsFoundGroup: 'Nenhuma aba encontrada',
    searchResultsInfo: '{0} aba{1} encontrada{1} para "{2}" · {3} total',
    noTabsMatch: 'Nenhuma aba corresponde a "{0}" neste grupo.',
    groupDeletedTitle: 'Grupo excluído',
    groupDeletedDesc: 'Este grupo foi excluído e as abas foram descartadas.',
    groupNotFound: 'Grupo não encontrado',
    linkOutdated: 'Este link pode estar desatualizado.',
    deleteGroupBtn: '🗑️ Excluir grupo',
    restoreAllBtn: '✨ Restaurar todas as {0} abas',
    restoring: '⏳ Restaurando…',
    restoreAllFallback: '✨ Restaurar todas',
    errorOpeningTab: 'Erro ao abrir aba',
    duplicateLabel: '⚠️ Duplicada',
    openThisTab: '↗ Abrir esta aba',
    untitled: 'Sem título',
    categoryMeta: '{0} aba{1}{2}',
    categoryMetaDups: ' · {0} duplicada{1}',
    heroSubCategorized: 'Salvo em {0} · {1} aba{2} · {3} categoria{4}{5}',
    heroSubDups: ' · ⚠️ {0} duplicada{1}',
    deleteGroupConfirm: 'As {0} abas do grupo "{1}" serão descartadas permanentemente.',
    allCategories: '{0} categoria{1}',

    // ── Theme / Lang toggles ──
    themeDark: 'Modo escuro',
    themeLight: 'Modo claro',
    langLabel: 'Idioma',
  },

  en: {
    // ── Popup static ──
    selectAll: 'Select all',
    deselectAll: 'Deselect all',
    filterTabsGroups: 'Filter tabs and groups…',
    groupNamePlaceholder: 'Group name (e.g.: Research, Work…)',
    savedGroups: 'Saved groups',
    savedGroupsCount: 'Saved groups ({0})',
    groupsFiltered: 'Groups ({0} of {1})',
    noGroupsYet: 'No groups yet',
    exportBackup: '⬇ Export',
    importBackup: '⬆ Import',
    exportTitle: 'Export backup',
    importTitle: 'Import backup',

    // ── Popup dynamic ──
    loadingTabs: 'Loading tabs…',
    noTabsAvailable: 'No tabs available',
    noTabsFound: 'No tabs found',
    openTabs: 'Open tabs ({0})',
    tabsFiltered: 'Tabs ({0} of {1})',
    noGroupsFound: 'No groups found',
    active: 'active',
    compactSelected: '📦 Compact {0} selected tab{1}',
    compactNone: '📦 Compact selected tabs',
    compacting: '⏳ Compacting…',
    tabsSelected: '{0} tabs selected',
    tabsSelectedLabel: '<span id="countNum">{0}</span> tabs selected',
    deleteGroupConfirmPopup: 'Delete group "{1}"?\nThe {0} tabs will be discarded.',
    groupsExported: '✅ {0} group{1} exported',
    noGroupsToExport: 'No groups to export',
    groupsImported: '✅ {0} group{1} imported',
    noGroupsInFile: '⚠️ No groups to import in file',
    invalidFormat: 'Invalid format: expected "groups" (array)',
    maxGroupsImport: 'Maximum 100 groups per import',
    noValidGroups: 'No valid groups found in file',
    groupDeleted: 'Group deleted',
    errorUnknown: 'Unknown error',

    // ── Time ago ──
    now: 'now',
    minutesAgo: '{0}m ago',
    hoursAgo: '{0}h ago',
    daysAgo: '{0}d ago',

    // ── Group page static ──
    loadingGroup: 'Loading group…',
    loading: 'Loading…',
    searchTabsPlaceholder: 'Search tabs by title or URL…',
    clear: '✕ Clear',
    deleteGroupConfirmTitle: 'Delete this group?',
    deleteGroupConfirmText: 'Tabs will be permanently discarded.',
    cancel: 'Cancel',
    delete: 'Delete',

    // ── Group page dynamic ──
    hibernatedTabs: '🌙 Hibernated tabs',
    savedOn: 'Saved on',
    tabsUnit: 'tab',
    tabsUnitPlural: 'tabs',
    categoriesUnit: 'category',
    categoriesUnitPlural: 'categories',
    duplicateUnit: 'duplicate',
    duplicateUnitPlural: 'duplicates',
    categorizedInfo: 'Tabs organized by <strong>category</strong>. Expand to see details.',
    expandAll: '📂 Expand all',
    collapseAll: '📁 Collapse all',
    searchBadge: '🔍 Search',
    noTabsFoundGroup: 'No tabs found',
    searchResultsInfo: '{0} tab{1} found for "{2}" · {3} total',
    noTabsMatch: 'No tabs match "{0}" in this group.',
    groupDeletedTitle: 'Group deleted',
    groupDeletedDesc: 'This group was deleted and its tabs were discarded.',
    groupNotFound: 'Group not found',
    linkOutdated: 'This link may be outdated.',
    deleteGroupBtn: '🗑️ Delete group',
    restoreAllBtn: '✨ Restore all {0} tabs',
    restoring: '⏳ Restoring…',
    restoreAllFallback: '✨ Restore all',
    errorOpeningTab: 'Error opening tab',
    duplicateLabel: '⚠️ Duplicate',
    openThisTab: '↗ Open this tab',
    untitled: 'Untitled',
    categoryMeta: '{0} tab{1}{2}',
    categoryMetaDups: ' · {0} duplicate{1}',
    heroSubCategorized: 'Saved on {0} · {1} tab{2} · {3} categor{4}{5}',
    heroSubDups: ' · ⚠️ {0} duplicate{1}',
    deleteGroupConfirm: 'The {0} tabs in group "{1}" will be permanently discarded.',
    allCategories: '{0} categor{1}',

    // ── Theme / Lang toggles ──
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
    langLabel: 'Language',
  }
};

// ── State ──
let currentLang = 'pt';

// ── t() ──
function t(key, ...args) {
  const dict = I18N[currentLang] || I18N.pt;
  let str = dict[key];
  if (str === undefined) return key;
  for (let i = 0; i < args.length; i++) {
    str = str.replace('{' + i + '}', args[i]);
  }
  return str;
}

// Plural helper: returns '' for singular, 's'-like suffix for plural
function plural(n) {
  return n !== 1 ? 's' : '';
}

// ── Init ──
function initShared() {
  chrome.storage.local.get(['tabpack_lang', 'tabpack_theme'], (data) => {
    // Language
    if (data.tabpack_lang && I18N[data.tabpack_lang]) {
      currentLang = data.tabpack_lang;
    }
    applyLanguage();

    // Theme
    const theme = data.tabpack_theme || 'dark';
    applyTheme(theme);

    updateToggleButtons();
  });
}

function applyLanguage() {
  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Update title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  updateToggleButtons();

  // Trigger custom event so page scripts can re-render
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
  updateToggleButtons();
}

function updateToggleButtons() {
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const isLight = document.body.classList.contains('light-mode');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    themeBtn.title = isLight ? t('themeDark') : t('themeLight');
  }
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.textContent = currentLang === 'pt' ? 'PT' : 'EN';
    langBtn.title = currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português';
  }
}

// ── Toggle functions (bound to buttons) ──
function toggleTheme() {
  const isLight = document.body.classList.contains('light-mode');
  const newTheme = isLight ? 'dark' : 'light';
  applyTheme(newTheme);
  chrome.storage.local.set({ tabpack_theme: newTheme });
}

function toggleLanguage() {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  chrome.storage.local.set({ tabpack_lang: currentLang });
  applyLanguage();

  // Re-render: reload the page to apply all translations
  // For popup: close and reopen. For group page: reload.
  if (window.location.protocol === 'chrome-extension:') {
    // Group page or popup — dispatch event for JS re-render
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
  }
}

// ── Wire up toggle buttons (CSP-safe, no inline onclick) ──
function wireToggles() {
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLanguage);
  }
}

// ── Bootstrap ──
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initShared();
    wireToggles();
  });
} else {
  initShared();
  wireToggles();
}
