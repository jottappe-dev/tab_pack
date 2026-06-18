// TabPack — Popup Script

let allTabs = [];
let allGroups = [];
let selectedTabIds = new Set();
let currentWindowId = null;
let activeTabId = null;

function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (d > 0) return t('daysAgo', d);
  if (h > 0) return t('hoursAgo', h);
  if (m > 0) return t('minutesAgo', m);
  return t('now');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function renderTabs(tabs, activeTabId, isFiltering) {
  const section = document.getElementById('tabsSection');

  if (tabs.length === 0) {
    section.innerHTML = isFiltering
      ? '<div class="no-results"><div class="no-results-icon">🔍</div>' + t('noTabsFound') + '</div>'
      : '<div class="empty-tabs">' + t('noTabsAvailable') + '</div>';
    return;
  }

  const label = document.createElement('div');
  label.className = 'section-label';
  label.textContent = isFiltering
    ? t('tabsFiltered', tabs.length, allTabs.length)
    : t('openTabs', tabs.length);
  section.innerHTML = '';
  section.appendChild(label);

  tabs.forEach(tab => {
    const item = document.createElement('div');
    item.className = 'tab-item' + (selectedTabIds.has(tab.id) ? ' selected' : '');
    item.dataset.tabId = tab.id;

    // Checkbox
    const checkbox = document.createElement('div');
    checkbox.className = 'tab-checkbox';
    const check = document.createElement('span');
    check.className = 'tab-checkbox-check';
    check.textContent = '✓';
    checkbox.appendChild(check);

    // Favicon
    let faviconEl;
    if (tab.favIconUrl && tab.favIconUrl.startsWith('http')) {
      faviconEl = document.createElement('img');
      faviconEl.className = 'tab-favicon';
      faviconEl.src = tab.favIconUrl;
      faviconEl.onerror = () => {
        const fb = document.createElement('div');
        fb.className = 'tab-favicon-fallback';
        fb.textContent = '🌐';
        faviconEl.replaceWith(fb);
      };
    } else {
      faviconEl = document.createElement('div');
      faviconEl.className = 'tab-favicon-fallback';
      faviconEl.textContent = '🌐';
    }

    // Info
    const info = document.createElement('div');
    info.className = 'tab-info';
    const title = document.createElement('div');
    title.className = 'tab-title';
    title.textContent = tab.title || t('untitled');
    const url = document.createElement('div');
    url.className = 'tab-url';
    url.textContent = getDomain(tab.url || '');
    info.appendChild(title);
    info.appendChild(url);

    item.appendChild(checkbox);
    item.appendChild(faviconEl);
    item.appendChild(info);

    if (tab.id === activeTabId) {
      const badge = document.createElement('span');
      badge.className = 'tab-active-badge';
      badge.textContent = t('active');
      item.appendChild(badge);
    }

    item.addEventListener('click', () => toggleTab(tab.id));
    section.appendChild(item);
  });
}

function toggleTab(tabId) {
  if (selectedTabIds.has(tabId)) {
    selectedTabIds.delete(tabId);
  } else {
    selectedTabIds.add(tabId);
  }
  updateSelection();
}

function updateSelection() {
  const count = selectedTabIds.size;

  // Update visual state
  document.querySelectorAll('.tab-item').forEach(item => {
    const id = parseInt(item.dataset.tabId);
    if (selectedTabIds.has(id)) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });

  // Update button
  const btn = document.getElementById('btnCompact');
  const countEl = document.getElementById('selectedCount');

  if (count > 0) {
    btn.disabled = false;
    btn.textContent = t('compactSelected', count, count > 1 ? 's' : '');
    countEl.style.display = 'block';
    countEl.innerHTML = t('tabsSelectedLabel', '<span id="countNum">' + count + '</span>');
  } else {
    btn.disabled = true;
    btn.textContent = t('compactNone');
    countEl.style.display = 'none';
  }

  // Update select-all button
  const btnAll = document.getElementById('btnSelectAll');
  const allSelected = allTabs.length > 0 && allTabs.every(t => selectedTabIds.has(t.id));
  btnAll.textContent = allSelected ? t('deselectAll') : t('selectAll');
}

function renderGroups(groups, isFiltering) {
  const section = document.getElementById('groupsSection');
  const noGroups = document.getElementById('noGroups');
  const label = document.getElementById('groupsLabel');
  const searchTerm = document.getElementById('searchInput').value.trim();

  // Update toolbar label
  if (label) {
    label.textContent = searchTerm
      ? t('groupsFiltered', groups.length, allGroups.length)
      : t('savedGroupsCount', groups.length);
  }

  // Clear existing group items (keep label and noGroups)
  Array.from(section.querySelectorAll('.group-item')).forEach(el => el.remove());

  if (groups.length === 0) {
    noGroups.style.display = 'block';
    if (isFiltering && allGroups.length > 0) {
      noGroups.innerHTML = '<div class="no-results-icon" style="font-size:16px;margin-bottom:2px;opacity:0.5">🔍</div>' + t('noGroupsFound');
    } else {
      noGroups.textContent = t('noGroupsYet');
    }
    return;
  }

  noGroups.style.display = 'none';

  groups.forEach(group => {
    const item = document.createElement('div');
    item.className = 'group-item';

    const icon = document.createElement('div');
    icon.className = 'group-icon';
    icon.textContent = '📁';

    const info = document.createElement('div');
    info.className = 'group-info';
    const name = document.createElement('div');
    name.className = 'group-name';
    name.textContent = group.name;
    const meta = document.createElement('div');
    meta.className = 'group-meta';
    meta.innerHTML = `<span>${group.tabs.length} ${group.tabs.length !== 1 ? t('tabsUnitPlural') : t('tabsUnit')}</span> · ${timeAgo(group.createdAt)}`;
    info.appendChild(name);
    info.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'group-actions';

    const btnOpen = document.createElement('button');
    btnOpen.className = 'btn-icon';
    btnOpen.title = 'Abrir grupo';
    btnOpen.textContent = '↗';
    btnOpen.addEventListener('click', (e) => {
      e.stopPropagation();
      chrome.runtime.sendMessage({ action: 'openGroupTab', groupId: group.id });
      window.close();
    });

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-icon danger';
    btnDelete.title = 'Excluir grupo';
    btnDelete.textContent = '✕';
    btnDelete.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(t('deleteGroupConfirmPopup', group.tabs.length, group.name))) {
        await chrome.runtime.sendMessage({ action: 'deleteGroup', groupId: group.id });
        loadGroups();
        showToast(t('groupDeleted'));
      }
    });

    actions.appendChild(btnOpen);
    actions.appendChild(btnDelete);

    item.appendChild(icon);
    item.appendChild(info);
    item.appendChild(actions);

    item.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'openGroupTab', groupId: group.id });
      window.close();
    });

    section.appendChild(item);
  });
}

async function loadGroups() {
  const response = await chrome.runtime.sendMessage({ action: 'getGroups' });
  allGroups = response.groups || [];
  applyFilter();
}

function applyFilter() {
  const term = document.getElementById('searchInput').value.toLowerCase().trim();
  const clearBtn = document.getElementById('searchClear');

  // Show/hide clear button
  clearBtn.style.display = term ? 'block' : 'none';

  // Filter tabs
  let filteredTabs = allTabs;
  if (term) {
    filteredTabs = allTabs.filter(tab =>
      (tab.title || '').toLowerCase().includes(term) ||
      (tab.url || '').toLowerCase().includes(term)
    );
  }
  renderTabs(filteredTabs, activeTabId, !!term);

  // Filter groups
  let filteredGroups = allGroups;
  if (term) {
    filteredGroups = allGroups.filter(group =>
      (group.name || '').toLowerCase().includes(term)
    );
  }
  renderGroups(filteredGroups, !!term);
}

async function handleExport() {
  const response = await chrome.runtime.sendMessage({ action: 'getGroups' });
  const groups = response.groups || [];

  if (groups.length === 0) {
    showToast(t('noGroupsToExport'));
    return;
  }

  const backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    extension: 'TabPack',
    groups: groups.map(g => ({
      id: g.id,
      name: g.name,
      tabs: g.tabs,
      createdAt: g.createdAt
    }))
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const dateStr = new Date().toISOString().split('T')[0];

  const a = document.createElement('a');
  a.href = url;
  a.download = `tabpack-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(t('groupsExported', groups.length, groups.length > 1 ? 's' : ''));
}

function handleImport() {
  const fileInput = document.getElementById('importFileInput');
  fileInput.click();
  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate structure
      if (!data.groups || !Array.isArray(data.groups)) {
        throw new Error(t('invalidFormat'));
      }

      if (data.groups.length === 0) {
        showToast(t('noGroupsInFile'));
        return;
      }

      if (data.groups.length > 100) {
        throw new Error(t('maxGroupsImport'));
      }

      // Validate each group
      const validGroups = [];
      for (const group of data.groups) {
        if (!group.name || !group.tabs || !Array.isArray(group.tabs)) continue;

        const validTabs = group.tabs.filter(tab => tab && typeof tab.url === 'string' && tab.url.trim());
        if (validTabs.length === 0) continue;

        validGroups.push({
          name: String(group.name).substring(0, 200),
          tabs: validTabs.map(tab => ({
            url: String(tab.url).substring(0, 2000),
            title: String(tab.title || tab.url).substring(0, 300),
            favIconUrl: String(tab.favIconUrl || '')
          })),
          createdAt: typeof group.createdAt === 'number' ? group.createdAt : Date.now()
        });
      }

      if (validGroups.length === 0) {
        throw new Error(t('noValidGroups'));
      }

      const response = await chrome.runtime.sendMessage({
        action: 'importGroups',
        groups: validGroups
      });

      if (response.success) {
        showToast(t('groupsImported', response.count, response.count > 1 ? 's' : ''));
        await loadGroups();
      } else {
        throw new Error(response.error || t('errorUnknown'));
      }

    } catch (err) {
      showToast('❌ ' + (err.message || t('errorUnknown')));
    }

    // Reset file input
    fileInput.value = '';
  };
}

async function init() {
  // Load current tabs
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabs = await chrome.tabs.query({ currentWindow: true });
  currentWindowId = activeTab ? activeTab.windowId : undefined;

  // Filter out extension pages and the current popup tab
  allTabs = tabs.filter(t =>
    t.url &&
    !t.url.startsWith('chrome://') &&
    !t.url.startsWith('chrome-extension://') &&
    !t.url.startsWith('about:')
  );

  activeTabId = activeTab ? activeTab.id : null;
  applyFilter();
  await loadGroups();

  // Search input
  document.getElementById('searchInput').addEventListener('input', applyFilter);
  document.getElementById('searchClear').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    applyFilter();
    document.getElementById('searchInput').focus();
  });

  // Export / Import
  document.getElementById('btnExport').addEventListener('click', handleExport);
  document.getElementById('btnImport').addEventListener('click', handleImport);

  // Select all button
  document.getElementById('btnSelectAll').addEventListener('click', () => {
    const allSelected = allTabs.every(t => selectedTabIds.has(t.id));
    if (allSelected) {
      selectedTabIds.clear();
    } else {
      allTabs.forEach(t => selectedTabIds.add(t.id));
    }
    updateSelection();
  });

  // Compact button
  document.getElementById('btnCompact').addEventListener('click', async () => {
    if (selectedTabIds.size === 0) return;

    const btn = document.getElementById('btnCompact');
    btn.disabled = true;
    btn.textContent = t('compacting');

    const groupName = document.getElementById('groupNameInput').value.trim();
    const tabIds = Array.from(selectedTabIds);

    const response = await chrome.runtime.sendMessage({
      action: 'compactTabs',
      tabIds,
      groupName,
      windowId: currentWindowId
    });

    if (response.success) {
      window.close();
    } else {
      btn.disabled = false;
      btn.textContent = t('compactNone');
      alert('Erro: ' + (response.error || t('errorUnknown')));
    }
  });
}

document.addEventListener('DOMContentLoaded', init);

// Re-render on language change
document.addEventListener('languageChanged', () => {
  applyFilter();
  loadGroups();
});
