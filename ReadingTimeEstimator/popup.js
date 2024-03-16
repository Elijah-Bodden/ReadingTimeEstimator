document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Check stored mode on load and apply
    chrome.storage.sync.get('darkMode', data => {
        body.classList.toggle('dark-mode', data.darkMode);
    });

});
