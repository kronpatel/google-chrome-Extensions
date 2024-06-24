document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('saveTabs').addEventListener('click', saveTabs);
<<<<<<< HEAD
  document.getElementById('openTabs').addEventListener('click', openLastSavedTabs);
  document.getElementById('listTabs').addEventListener('click', listSavedTabs);
});

function saveTabs() {
  const sessionName = prompt("Enter a name for this tab session:");
  if (!sessionName) {
      alert('Session name is required to save tabs.');
      return;
  }

  chrome.tabs.query({}, function(tabs) {
      const tabUrls = tabs.map(tab => tab.url);
      chrome.storage.local.get(['savedTabs'], function(result) {
          const savedTabs = result.savedTabs || [];
          savedTabs.push({ name: sessionName, tabs: tabUrls });
          chrome.storage.local.set({ 'savedTabs': savedTabs }, function() {
              alert('Tabs saved!');
          });
      });
  });
}

function openLastSavedTabs() {
  chrome.storage.local.get(['savedTabs'], function(result) {
      const savedTabs = result.savedTabs || [];
      if (savedTabs.length > 0) {
          const lastSavedTabs = savedTabs[savedTabs.length - 1].tabs;
          for (const url of lastSavedTabs) {
              chrome.tabs.create({ url: url });
          }
      }
  });
}

function listSavedTabs() {
  chrome.storage.local.get(['savedTabs'], function(result) {
      const savedTabs = result.savedTabs || [];
      const listContainer = document.getElementById('savedTabsList');
      listContainer.innerHTML = '';  // Clear existing list

      if (savedTabs.length === 0) {
          listContainer.textContent = 'No tabs saved.';
          return;
      }

      const ul = document.createElement('ul');
      savedTabs.forEach((session, index) => {
          const li = document.createElement('li');
          li.textContent = `${session.name} - ${session.tabs.length} tabs`;
          li.addEventListener('dblclick', function() {
              for (const url of session.tabs) {
                  chrome.tabs.create({ url: url });
              }
          });
          ul.appendChild(li);
      });
      listContainer.appendChild(ul);
=======
  document.getElementById('openTabs').addEventListener('click', openTabs);
});

function saveTabs() {
  const season = document.getElementById('seasonSelect').value;
  chrome.tabs.query({}, function(tabs) {
    const tabUrls = tabs.map(tab => tab.url);
    chrome.storage.local.get(['savedTabs'], function(result) {
      let savedTabs = result.savedTabs || {};
      savedTabs[season] = tabUrls;
      chrome.storage.local.set({ 'savedTabs': savedTabs }, function() {
        alert('Tabs saved for ' + season + '!');
      });
    });
  });
}

function openTabs() {
  const season = document.getElementById('seasonSelect').value;
  chrome.storage.local.get(['savedTabs'], function(result) {
    const savedTabs = result.savedTabs || {};
    const tabsToOpen = savedTabs[season] || [];
    for (const url of tabsToOpen) {
      chrome.tabs.create({ url: url });
    }
    alert('Tabs from ' + season + ' opened!');
>>>>>>> 4f86721 (Update all Program)
  });
}
