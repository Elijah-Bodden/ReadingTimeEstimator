chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "readingTimeEstimator",
        title: "Estimate Reading Time",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "readingTimeEstimator") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: showReadingTime
        });
    }
});

// Function to calculate and display the reading time in a styled pop-up
function showReadingTime() {
    const selectedText = window.getSelection().toString();
    const wordCount = selectedText.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    const popupId = 'reading-time-popup';

    // Remove existing popup if present
    const existingPopup = document.getElementById(popupId);
    if (existingPopup) existingPopup.remove();

    // Create new popup element
    const popup = document.createElement('div');
    popup.id = popupId;
    popup.style.all = 'initial'; // Resets any inherited styles
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = '#ffffff';
    popup.style.color = '#333333';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    popup.style.zIndex = '9999';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.fontSize = '16px';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.boxSizing = 'border-box';
    popup.innerText = `Estimated reading time: ${readingTimeMinutes} minute(s)`;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Optional: Fade in animation
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s';
    setTimeout(() => popup.style.opacity = '1', 10);

    // Optional: Auto-remove popup after a few seconds
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.addEventListener('transitionend', () => popup.remove());
    }, 5000);
}

// Ensure this function is called appropriately in your background.js logic