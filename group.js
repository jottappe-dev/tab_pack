// TabPack — Group Page Script

const params = new URLSearchParams(window.location.search);
const groupId = params.get('id');

let currentGroup = null;

function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

// ─── Smart Categorization ──────────────────────────────────────────

function categorizeUrl(url) {
  const domain = getDomain(url);
  const u = url.toLowerCase();

  // Video platforms
  if (domain.includes('youtube.com') || domain.includes('youtu.be'))
    return { key: 'youtube', icon: '▶️', name: 'YouTube' };
  if (domain.includes('vimeo.com'))
    return { key: 'vimeo', icon: '🎬', name: 'Vimeo' };
  if (domain.includes('twitch.tv'))
    return { key: 'twitch', icon: '🎮', name: 'Twitch' };
  if (domain.includes('netflix.com'))
    return { key: 'netflix', icon: '🎥', name: 'Netflix' };

  // Dev & Code
  if (domain.includes('github.com'))
    return { key: 'github', icon: '🐙', name: 'GitHub' };
  if (domain.includes('gitlab.com'))
    return { key: 'gitlab', icon: '🦊', name: 'GitLab' };
  if (domain.includes('stackoverflow.com'))
    return { key: 'stackoverflow', icon: '📚', name: 'Stack Overflow' };
  if (domain.includes('npmjs.com'))
    return { key: 'npm', icon: '📦', name: 'npm' };
  if (domain.includes('dev.to'))
    return { key: 'devto', icon: '📝', name: 'DEV Community' };
  if (domain.includes('medium.com'))
    return { key: 'medium', icon: '✍️', name: 'Medium' };
  if (domain.includes('codepen.io'))
    return { key: 'codepen', icon: '🎨', name: 'CodePen' };
  if (domain.includes('codesandbox.io'))
    return { key: 'codesandbox', icon: '📦', name: 'CodeSandbox' };
  if (domain.includes('replit.com'))
    return { key: 'replit', icon: '🔄', name: 'Replit' };

  // AI / LLMs
  if (u.includes('chatgpt.com') || u.includes('chat.openai.com'))
    return { key: 'ai-chatgpt', icon: '🤖', name: 'IA — ChatGPT' };
  if (u.includes('claude.ai'))
    return { key: 'ai-claude', icon: '🧠', name: 'IA — Claude' };
  if (u.includes('gemini.google.com') || u.includes('gemini'))
    return { key: 'ai-gemini', icon: '✨', name: 'IA — Gemini' };
  if (u.includes('huggingface.co'))
    return { key: 'ai-hf', icon: '🤗', name: 'IA — Hugging Face' };
  if (u.includes('perplexity.ai'))
    return { key: 'ai-perplexity', icon: '🔎', name: 'IA — Perplexity' };
  if (u.includes('deepseek'))
    return { key: 'ai-deepseek', icon: '🧠', name: 'IA — DeepSeek' };
  if (u.includes('copilot') || u.includes('github.com/features/copilot'))
    return { key: 'ai-copilot', icon: '🤖', name: 'IA — Copilot' };
  if (u.includes('poe.com'))
    return { key: 'ai-poe', icon: '🤖', name: 'IA — Poe' };
  if (u.includes('openai.com'))
    return { key: 'ai-openai', icon: '🤖', name: 'IA — OpenAI' };
  if (u.includes('bard.google.com'))
    return { key: 'ai-bard', icon: '✨', name: 'IA — Bard' };

  // Google services
  if (domain.includes('docs.google.com'))
    return { key: 'google-docs', icon: '📄', name: 'Google Docs' };
  if (domain.includes('sheets.google.com'))
    return { key: 'google-sheets', icon: '📊', name: 'Google Sheets' };
  if (domain.includes('slides.google.com'))
    return { key: 'google-slides', icon: '📽️', name: 'Google Slides' };
  if (domain.includes('drive.google.com'))
    return { key: 'google-drive', icon: '💾', name: 'Google Drive' };
  if (domain.includes('mail.google.com'))
    return { key: 'gmail', icon: '📧', name: 'Gmail' };
  if (domain.includes('calendar.google.com'))
    return { key: 'google-cal', icon: '📅', name: 'Google Calendar' };
  if (domain.includes('meet.google.com'))
    return { key: 'google-meet', icon: '📹', name: 'Google Meet' };
  if (domain.includes('photos.google.com'))
    return { key: 'google-photos', icon: '📷', name: 'Google Photos' };
  if (domain.includes('google.com'))
    return { key: 'google', icon: '🔍', name: 'Google' };

  // Microsoft
  if (domain.includes('outlook.com') || domain.includes('outlook.office.com'))
    return { key: 'outlook', icon: '📧', name: 'Outlook' };
  if (domain.includes('office.com') || domain.includes('microsoft365.com'))
    return { key: 'office', icon: '📎', name: 'Microsoft 365' };
  if (domain.includes('teams.microsoft.com'))
    return { key: 'teams', icon: '💬', name: 'Microsoft Teams' };

  // Social media
  if (domain.includes('twitter.com') || domain.includes('x.com'))
    return { key: 'twitter', icon: '🐦', name: 'X / Twitter' };
  if (domain.includes('reddit.com'))
    return { key: 'reddit', icon: '👽', name: 'Reddit' };
  if (domain.includes('linkedin.com'))
    return { key: 'linkedin', icon: '💼', name: 'LinkedIn' };
  if (domain.includes('instagram.com'))
    return { key: 'instagram', icon: '📷', name: 'Instagram' };
  if (domain.includes('facebook.com'))
    return { key: 'facebook', icon: '👤', name: 'Facebook' };
  if (domain.includes('tiktok.com'))
    return { key: 'tiktok', icon: '🎵', name: 'TikTok' };
  if (domain.includes('discord.com'))
    return { key: 'discord', icon: '🎧', name: 'Discord' };
  if (domain.includes('telegram.org') || domain.includes('t.me'))
    return { key: 'telegram', icon: '✈️', name: 'Telegram' };
  if (domain.includes('whatsapp.com'))
    return { key: 'whatsapp', icon: '💬', name: 'WhatsApp' };

  // News
  if (domain.includes('news.google.com'))
    return { key: 'gnews', icon: '📰', name: 'Google News' };
  if (domain.includes('cnn.com') || domain.includes('cnnbrasil.com.br'))
    return { key: 'cnn', icon: '📰', name: 'CNN' };
  if (domain.includes('bbc.com'))
    return { key: 'bbc', icon: '📰', name: 'BBC' };
  if (domain.includes('g1.globo.com'))
    return { key: 'g1', icon: '📰', name: 'G1' };
  if (domain.includes('uol.com.br'))
    return { key: 'uol', icon: '📰', name: 'UOL' };

  // Shopping
  if (domain.includes('amazon.com') || domain.includes('amazon.com.br'))
    return { key: 'amazon', icon: '🛒', name: 'Amazon' };
  if (domain.includes('mercadolivre.com.br'))
    return { key: 'mercadolivre', icon: '🛒', name: 'Mercado Livre' };
  if (domain.includes('aliexpress.com'))
    return { key: 'aliexpress', icon: '🛒', name: 'AliExpress' };
  if (domain.includes('shopee.com.br'))
    return { key: 'shopee', icon: '🛒', name: 'Shopee' };

  // Docs / Wiki / Learning
  if (domain.includes('wikipedia.org'))
    return { key: 'wikipedia', icon: '📖', name: 'Wikipedia' };
  if (domain.includes('developer.mozilla.org') || domain.includes('mdn.io'))
    return { key: 'mdn', icon: '📘', name: 'MDN Web Docs' };
  if (domain.includes('docs.python.org'))
    return { key: 'pydocs', icon: '🐍', name: 'Python Docs' };
  if (domain.includes('udemy.com'))
    return { key: 'udemy', icon: '🎓', name: 'Udemy' };
  if (domain.includes('coursera.org'))
    return { key: 'coursera', icon: '🎓', name: 'Coursera' };
  if (domain.includes('notion.so'))
    return { key: 'notion', icon: '📝', name: 'Notion' };
  if (domain.includes('figma.com'))
    return { key: 'figma', icon: '🎨', name: 'Figma' };
  if (domain.includes('canva.com'))
    return { key: 'canva', icon: '🎨', name: 'Canva' };
  if (domain.includes('trello.com'))
    return { key: 'trello', icon: '📋', name: 'Trello' };

  // Streaming / Music
  if (domain.includes('spotify.com'))
    return { key: 'spotify', icon: '🎵', name: 'Spotify' };
  if (domain.includes('deezer.com'))
    return { key: 'deezer', icon: '🎵', name: 'Deezer' };
  if (domain.includes('soundcloud.com'))
    return { key: 'soundcloud', icon: '☁️', name: 'SoundCloud' };

  // Email providers (non-Google/Microsoft)
  if (domain.includes('proton.me') || domain.includes('protonmail.com'))
    return { key: 'protonmail', icon: '🔐', name: 'Proton Mail' };
  if (domain.includes('mail.yahoo.com'))
    return { key: 'yahoomail', icon: '📧', name: 'Yahoo Mail' };

  // Localhost / dev
  if (domain.includes('localhost') || domain.includes('127.0.0.1'))
    return { key: 'localhost', icon: '🏠', name: 'Localhost' };

  // Other well-known
  if (domain.includes('cloudflare.com'))
    return { key: 'cloudflare', icon: '☁️', name: 'Cloudflare' };
  if (domain.includes('vercel.com'))
    return { key: 'vercel', icon: '▲', name: 'Vercel' };
  if (domain.includes('netlify.com'))
    return { key: 'netlify', icon: '⚡', name: 'Netlify' };
  if (domain.includes('heroku.com'))
    return { key: 'heroku', icon: '💜', name: 'Heroku' };
  if (domain.includes('docker.com') || domain.includes('hub.docker.com'))
    return { key: 'docker', icon: '🐳', name: 'Docker' };

  // Default: group by domain
  return { key: 'domain:' + domain, icon: '🌐', name: domain };
}

function findDuplicates(tabs) {
  const seen = new Map();
  const duplicates = new Set();

  tabs.forEach(tab => {
    const url = (tab.url || '').trim().toLowerCase();
    if (!url) return;
    if (seen.has(url)) {
      duplicates.add(url);
    } else {
      seen.set(url, true);
    }
  });

  return duplicates;
}

function categorizeTabs(tabs) {
  const map = new Map();
  const duplicateUrls = findDuplicates(tabs);

  tabs.forEach((tab, originalIndex) => {
    const cat = categorizeUrl(tab.url || '');
    if (!map.has(cat.key)) {
      map.set(cat.key, {
        key: cat.key,
        icon: cat.icon,
        name: cat.name,
        tabs: [],
        duplicateUrls: new Set()
      });
    }
    const entry = map.get(cat.key);
    entry.tabs.push({ ...tab, _originalIndex: originalIndex });

    const url = (tab.url || '').trim().toLowerCase();
    if (duplicateUrls.has(url)) {
      entry.duplicateUrls.add(url);
    }
  });

  // Sort categories: by tab count desc, then by name
  const sorted = Array.from(map.entries())
    .sort((a, b) => {
      if (b[1].tabs.length !== a[1].tabs.length)
        return b[1].tabs.length - a[1].tabs.length;
      return a[1].name.localeCompare(b[1].name);
    });

  return sorted;
}

function formatDate(ts) {
  return new Date(ts).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function renderGroup(group, searchTerm) {
  currentGroup = group;
  const term = (searchTerm || '').toLowerCase().trim();

  document.title = `TabPack — ${group.name}`;
  document.getElementById('navGroupName').textContent = group.name;
  document.getElementById('navCount').textContent = group.tabs.length;

  // Update plural unit in nav pill
  const navPillLabel = document.getElementById('navPill').querySelector('[data-i18n]');
  if (navPillLabel) {
    navPillLabel.textContent = group.tabs.length !== 1 ? t('tabsUnitPlural') : t('tabsUnit');
  }

  // Update search result count
  const countEl = document.getElementById('navSearchCount');
  const clearBtn = document.getElementById('groupSearchClear');
  if (term) {
    clearBtn.style.display = 'inline-block';
  } else {
    clearBtn.style.display = 'none';
  }

  const content = document.getElementById('content');
  content.innerHTML = '';

  // ── Search mode: flat filtered results ──
  if (term) {
    const filtered = group.tabs
      .map((tab, i) => ({ ...tab, _originalIndex: i }))
      .filter(tab =>
        (tab.title || '').toLowerCase().includes(term) ||
        (tab.url || '').toLowerCase().includes(term)
      );

    countEl.style.display = filtered.length !== group.tabs.length ? 'inline' : 'none';
    countEl.textContent = `${filtered.length} de ${group.tabs.length}`;

    // Hero simplified
    const hero = document.createElement('div');
    hero.className = 'hero';
    const s = filtered.length !== 1 ? 's' : '';
    hero.innerHTML = `
      <div class="hero-badge">${t('searchBadge')}</div>
      <h1 class="hero-title">${escapeHtml(group.name)}</h1>
      <p class="hero-sub">${t('searchResultsInfo', filtered.length, s, escapeHtml(term), group.tabs.length)}</p>
    `;
    content.appendChild(hero);

    if (filtered.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'not-found';
      noResults.innerHTML = `
        <div class="not-found-icon">🔍</div>
        <h2>${t('noTabsFoundGroup')}</h2>
        <p>${t('noTabsMatch', escapeHtml(term))}</p>
      `;
      content.appendChild(noResults);
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'tabs-grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(260px, 1fr))';

    filtered.forEach((tab, idx) => {
      const card = createTabCard(tab, tab._originalIndex, false);
      card.style.animationDelay = `${idx * 30}ms`;
      grid.appendChild(card);
    });

    content.appendChild(grid);
    return;
  }

  // ── Normal mode: categorized view ──
  countEl.style.display = 'none';

  const categorized = categorizeTabs(group.tabs);
  const totalDuplicates = categorized.reduce((sum, [, cat]) => sum + cat.duplicateUrls.size, 0);

  // Hero
  const hero = document.createElement('div');
  hero.className = 'hero';
  const catCount = categorized.length;
  const dupsSuffix = totalDuplicates > 0 ? ' · ⚠️ ' + totalDuplicates + ' ' + (totalDuplicates !== 1 ? t('duplicateUnitPlural') : t('duplicateUnit')) : '';
  const heroSubText = t('savedOn') + ' ' + formatDate(group.createdAt) + ' · ' +
    group.tabs.length + ' ' + (group.tabs.length !== 1 ? t('tabsUnitPlural') : t('tabsUnit')) + ' · ' +
    catCount + ' ' + (catCount !== 1 ? t('categoriesUnitPlural') : t('categoriesUnit')) +
    dupsSuffix;
  hero.innerHTML = `
    <div class="hero-badge">🌙 ${catCount} ${catCount !== 1 ? t('categoriesUnitPlural') : t('categoriesUnit')}</div>
    <h1 class="hero-title">${escapeHtml(group.name)}</h1>
    <p class="hero-sub">${heroSubText}</p>
  `;
  content.appendChild(hero);

  // Action bar
  const actionBar = document.createElement('div');
  actionBar.className = 'action-bar';
  actionBar.innerHTML = `
    <div class="action-info">
      ${t('categorizedInfo')}
    </div>
    <div class="action-buttons">
      <button class="btn btn-danger" id="btnDelete">${t('deleteGroupBtn')}</button>
      <button class="btn btn-primary" id="btnRestoreAll">${t('restoreAllBtn', group.tabs.length)}</button>
    </div>
  `;
  content.appendChild(actionBar);

  // Expand/Collapse all
  const expandBar = document.createElement('div');
  expandBar.className = 'expand-all-bar';
  expandBar.innerHTML = `
    <button class="btn-expand active" id="btnExpandAll">${t('expandAll')}</button>
    <button class="btn-expand" id="btnCollapseAll">${t('collapseAll')}</button>
  `;
  content.appendChild(expandBar);

  // Render categories
  categorized.forEach(([catKey, catData]) => {
    const section = createCategorySection(catKey, catData);
    content.appendChild(section);
  });

  // Bind action buttons
  document.getElementById('btnRestoreAll').addEventListener('click', handleRestoreAll);
  document.getElementById('btnDelete').addEventListener('click', () => showConfirm(
    t('deleteGroupConfirm', group.tabs.length, group.name),
    handleDelete
  ));

  // Expand/Collapse all
  let allOpen = true;
  document.getElementById('btnExpandAll').addEventListener('click', () => {
    content.querySelectorAll('.category-section').forEach(s => s.classList.add('open'));
    allOpen = true;
    updateExpandButtons();
  });
  document.getElementById('btnCollapseAll').addEventListener('click', () => {
    content.querySelectorAll('.category-section').forEach(s => s.classList.remove('open'));
    allOpen = false;
    updateExpandButtons();
  });

  function updateExpandButtons() {
    const btnE = document.getElementById('btnExpandAll');
    const btnC = document.getElementById('btnCollapseAll');
    if (btnE) btnE.classList.toggle('active', allOpen);
    if (btnC) btnC.classList.toggle('active', !allOpen);
  }

  // Toggle individual category
  content.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('open');
    });
  });

  // All categories start collapsed
  const sections = content.querySelectorAll('.category-section');
  sections.forEach((s) => s.classList.remove('open'));
  allOpen = false;
  updateExpandButtons();
}

function createCategorySection(catKey, catData) {
  const section = document.createElement('div');
  section.className = 'category-section';

  const dupCount = catData.duplicateUrls.size;

  const tabWord = catData.tabs.length !== 1 ? t('tabsUnitPlural') : t('tabsUnit');
  const dupWord = dupCount > 0 ? ' · ' + dupCount + ' ' + (dupCount !== 1 ? t('duplicateUnitPlural') : t('duplicateUnit')) : '';
  section.innerHTML = `
    <div class="category-header">
      <div class="category-icon">${catData.icon}</div>
      <div class="category-info">
        <div class="category-name">${escapeHtml(catData.name)}</div>
        <div class="category-meta">${catData.tabs.length} ${tabWord}${dupWord}</div>
      </div>
      <div class="category-badges">
        <span class="category-count">${catData.tabs.length}</span>
        ${dupCount > 0 ? `<span class="duplicate-badge">⚠️ ${dupCount}</span>` : ''}
      </div>
      <div class="category-arrow">▼</div>
    </div>
    <div class="category-tabs">
      <div class="tabs-grid"></div>
    </div>
  `;

  // Fill tabs
  const grid = section.querySelector('.tabs-grid');
  const duplicateUrls = catData.duplicateUrls;

  catData.tabs.forEach((tab, idx) => {
    const url = (tab.url || '').trim().toLowerCase();
    const isDup = duplicateUrls.has(url);
    const card = createTabCard(tab, tab._originalIndex, isDup);
    card.style.animationDelay = `${idx * 30}ms`;
    grid.appendChild(card);
  });

  return section;
}

function createTabCard(tab, idx, isDuplicate) {
  const card = document.createElement('div');
  card.className = 'tab-card' + (isDuplicate ? ' duplicate' : '');
  card.dataset.index = idx;

  // Favicon
  let faviconHtml;
  if (tab.favIconUrl && tab.favIconUrl.startsWith('http')) {
    faviconHtml = `
      <div class="card-favicon">
        <img src="${escapeHtml(tab.favIconUrl)}" 
             onerror="this.parentElement.innerHTML='<span class=\\'fallback-icon\\'>🌐</span>'"
             alt="">
      </div>`;
  } else {
    faviconHtml = `<div class="card-favicon"><span class="fallback-icon">🌐</span></div>`;
  }

  card.innerHTML = `
    <div class="card-top">
      ${faviconHtml}
      <div class="card-title-block">
        <div class="card-title">${escapeHtml(tab.title || t('untitled'))}</div>
        <div class="card-domain">${escapeHtml(getDomain(tab.url || ''))}</div>
      </div>
    </div>
    <div class="card-url">${escapeHtml(truncateUrl(tab.url || ''))}</div>
    <button class="card-open-btn">
      ${t('openThisTab')}
    </button>
  `;

  card.querySelector('.card-open-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openTab(idx);
  });

  card.addEventListener('click', () => openTab(idx));

  return card;
}

async function openTab(tabIndex) {
  const card = document.querySelector(`[data-index="${tabIndex}"]`);
  if (card) {
    card.style.opacity = '0.4';
    card.style.pointerEvents = 'none';
  }

  const response = await chrome.runtime.sendMessage({
    action: 'restoreTab',
    groupId,
    tabIndex
  });

  if (response.success) {
    if (response.remaining === 0) {
      // All tabs restored, this page will be closed
      return;
    }
    // Reload to reflect updated state
    await loadGroup();
  } else {
    if (card) {
      card.style.opacity = '';
      card.style.pointerEvents = '';
    }
    alert(t('errorOpeningTab') + ': ' + (response.error || t('errorUnknown')));
  }
}

async function handleRestoreAll() {
  const btn = document.getElementById('btnRestoreAll');
  if (btn) {
    btn.disabled = true;
    btn.textContent = t('restoring');
  }

  const response = await chrome.runtime.sendMessage({
    action: 'restoreGroup',
    groupId
  });

  if (!response.success) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = t('restoreAllFallback');
    }
    alert('Erro: ' + (response.error || t('errorUnknown')));
  }
  // Page will be closed by background.js
}

async function handleDelete() {
  const response = await chrome.runtime.sendMessage({
    action: 'deleteGroup',
    groupId
  });

  if (response.success) {
    // Show empty state
    showNotFound(t('groupDeletedTitle'), t('groupDeletedDesc'));
  } else {
    alert('Erro: ' + (response.error || 'desconhecido'));
  }
}

function showConfirm(text, onConfirm) {
  const overlay = document.getElementById('confirmOverlay');
  document.getElementById('confirmText').textContent = text;
  overlay.classList.add('show');

  const cancelBtn = document.getElementById('confirmCancel');
  const okBtn = document.getElementById('confirmOk');

  const close = () => overlay.classList.remove('show');

  const handleOk = () => {
    close();
    onConfirm();
    okBtn.removeEventListener('click', handleOk);
    cancelBtn.removeEventListener('click', close);
  };

  okBtn.addEventListener('click', handleOk);
  cancelBtn.addEventListener('click', () => {
    close();
    cancelBtn.removeEventListener('click', close);
  });
}

function showNotFound(title, subtitle) {
  title = title || t('groupNotFound');
  subtitle = subtitle || t('linkOutdated');
  document.getElementById('navGroupName').textContent = 'TabPack';
  document.getElementById('content').innerHTML = `
    <div class="not-found">
      <div class="not-found-icon">📭</div>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(subtitle)}</p>
    </div>
  `;
}

async function loadGroup(searchTerm) {
  if (!groupId) {
    showNotFound();
    return;
  }

  const response = await chrome.runtime.sendMessage({
    action: 'getGroup',
    groupId
  });

  if (!response.group) {
    showNotFound();
    return;
  }

  renderGroup(response.group, searchTerm);
}

function setupSearch() {
  const searchInput = document.getElementById('groupSearchInput');
  const clearBtn = document.getElementById('groupSearchClear');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    loadGroup(searchInput.value);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    loadGroup('');
    searchInput.focus();
  });
}

function escapeHtml(str) {
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(String(str)));
  return el.innerHTML;
}

function truncateUrl(url, max = 55) {
  return url.length > max ? url.substring(0, max) + '…' : url;
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  loadGroup();
});

// Re-render on language change
document.addEventListener('languageChanged', () => {
  const searchInput = document.getElementById('groupSearchInput');
  loadGroup(searchInput ? searchInput.value : '');
});
