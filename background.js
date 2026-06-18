// TabPack — Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('tabpack_groups', (data) => {
    if (!data.tabpack_groups) {
      chrome.storage.local.set({ tabpack_groups: [] });
    }
  });
});

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'compactTabs') {
    handleCompactTabs(message.tabIds, message.groupName, message.windowId)
      .then(result => sendResponse({ success: true, groupId: result }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'getGroups') {
    chrome.storage.local.get('tabpack_groups', (data) => {
      sendResponse({ groups: data.tabpack_groups || [] });
    });
    return true;
  }

  if (message.action === 'deleteGroup') {
    deleteGroup(message.groupId)
      .then(() => sendResponse({ success: true }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'restoreGroup') {
    restoreGroup(message.groupId, sender.tab ? sender.tab.id : null)
      .then(() => sendResponse({ success: true }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'restoreTab') {
    restoreTab(message.groupId, message.tabIndex)
      .then(remaining => sendResponse({ success: true, remaining }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'getGroup') {
    chrome.storage.local.get('tabpack_groups', (data) => {
      const groups = data.tabpack_groups || [];
      const group = groups.find(g => g.id === message.groupId);
      sendResponse({ group: group || null });
    });
    return true;
  }

  if (message.action === 'openGroupTab') {
    openOrFocusGroupTab(message.groupId)
      .then(() => sendResponse({ success: true }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'importGroups') {
    importGroups(message.groups)
      .then(count => sendResponse({ success: true, count }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }
});

async function handleCompactTabs(tabIds, groupName, windowId) {
  const tabPromises = tabIds.map(id => chrome.tabs.get(id).catch(() => null));
  const tabs = (await Promise.all(tabPromises)).filter(Boolean);

  if (tabs.length === 0) throw new Error('Nenhuma aba válida selecionada');

  const groupId = generateId();
  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  const group = {
    id: groupId,
    name: groupName || `Grupo ${dateStr} ${timeStr}`,
    tabs: tabs.map(tab => ({
      url: tab.url || '',
      title: tab.title || tab.url || 'Sem título',
      favIconUrl: tab.favIconUrl || ''
    })),
    createdAt: Date.now(),
    groupTabId: null
  };

  // Save group to storage
  const data = await chrome.storage.local.get('tabpack_groups');
  const groups = data.tabpack_groups || [];
  groups.unshift(group);
  await chrome.storage.local.set({ tabpack_groups: groups });

  // Create the group tab
  const groupTab = await chrome.tabs.create({
    url: chrome.runtime.getURL(`group.html?id=${groupId}`),
    windowId: windowId,
    active: true
  });

  // Update group with the tab ID
  group.groupTabId = groupTab.id;
  const updatedGroups = groups.map(g => g.id === groupId ? group : g);
  await chrome.storage.local.set({ tabpack_groups: updatedGroups });

  // Small delay then close selected tabs
  await new Promise(resolve => setTimeout(resolve, 150));
  try {
    await chrome.tabs.remove(tabIds);
  } catch (e) {
    // Ignore – some tabs may already be closed
  }

  return groupId;
}

async function restoreGroup(groupId, senderTabId) {
  const data = await chrome.storage.local.get('tabpack_groups');
  const groups = data.tabpack_groups || [];
  const group = groups.find(g => g.id === groupId);

  if (!group) throw new Error('Grupo não encontrado');

  // Open all tabs
  for (let i = 0; i < group.tabs.length; i++) {
    const tab = group.tabs[i];
    await chrome.tabs.create({
      url: tab.url,
      active: i === 0
    });
  }

  // Remove group from storage
  const updatedGroups = groups.filter(g => g.id !== groupId);
  await chrome.storage.local.set({ tabpack_groups: updatedGroups });

  // Close the group tab
  const tabToClose = senderTabId || group.groupTabId;
  if (tabToClose) {
    try {
      await chrome.tabs.remove(tabToClose);
    } catch (e) {}
  }
}

async function restoreTab(groupId, tabIndex) {
  const data = await chrome.storage.local.get('tabpack_groups');
  const groups = data.tabpack_groups || [];
  const groupIdx = groups.findIndex(g => g.id === groupId);

  if (groupIdx === -1) throw new Error('Grupo não encontrado');

  const group = groups[groupIdx];
  const tab = group.tabs[tabIndex];
  if (!tab) throw new Error('Aba não encontrada');

  await chrome.tabs.create({ url: tab.url, active: true });

  group.tabs.splice(tabIndex, 1);

  if (group.tabs.length === 0) {
    groups.splice(groupIdx, 1);
    await chrome.storage.local.set({ tabpack_groups: groups });
    if (group.groupTabId) {
      try { await chrome.tabs.remove(group.groupTabId); } catch (e) {}
    }
    return 0;
  } else {
    groups[groupIdx] = group;
    await chrome.storage.local.set({ tabpack_groups: groups });
    return group.tabs.length;
  }
}

async function deleteGroup(groupId) {
  const data = await chrome.storage.local.get('tabpack_groups');
  const groups = data.tabpack_groups || [];
  const group = groups.find(g => g.id === groupId);

  if (group && group.groupTabId) {
    try { await chrome.tabs.remove(group.groupTabId); } catch (e) {}
  }

  const updatedGroups = groups.filter(g => g.id !== groupId);
  await chrome.storage.local.set({ tabpack_groups: updatedGroups });
}

async function openOrFocusGroupTab(groupId) {
  const data = await chrome.storage.local.get('tabpack_groups');
  const groups = data.tabpack_groups || [];
  const group = groups.find(g => g.id === groupId);

  if (!group) throw new Error('Grupo não encontrado');

  const url = chrome.runtime.getURL(`group.html?id=${groupId}`);

  if (group.groupTabId) {
    try {
      await chrome.tabs.update(group.groupTabId, { active: true });
      return;
    } catch (e) {}
  }

  // Create new group tab
  const newTab = await chrome.tabs.create({ url, active: true });
  group.groupTabId = newTab.id;
  const updatedGroups = groups.map(g => g.id === groupId ? group : g);
  await chrome.storage.local.set({ tabpack_groups: updatedGroups });
}

async function importGroups(importedGroups) {
  if (!Array.isArray(importedGroups) || importedGroups.length === 0) {
    throw new Error('Nenhum grupo para importar');
  }

  if (importedGroups.length > 100) {
    throw new Error('Máximo de 100 grupos por importação');
  }

  const data = await chrome.storage.local.get('tabpack_groups');
  const existingGroups = data.tabpack_groups || [];

  const newGroups = importedGroups.map(g => ({
    id: generateId(),
    name: String(g.name || 'Grupo importado').substring(0, 200),
    tabs: (g.tabs || []).map(tab => ({
      url: String(tab.url || '').substring(0, 2000),
      title: String(tab.title || tab.url || 'Sem título').substring(0, 300),
      favIconUrl: String(tab.favIconUrl || '')
    })),
    createdAt: typeof g.createdAt === 'number' ? g.createdAt : Date.now(),
    groupTabId: null
  }));

  const merged = [...newGroups, ...existingGroups];
  await chrome.storage.local.set({ tabpack_groups: merged });

  return newGroups.length;
}
