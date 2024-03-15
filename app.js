// Check if user is accessing from a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent the default install prompt
        event.preventDefault();

        // Show a custom install prompt to the user
        // For example, display a button or message to install the app
        const installButton = document.getElementById('install-button');
        installButton.style.display = 'block';

        // Handle user interaction with the install prompt
        installButton.addEventListener('click', () => {
            // Show the browser's install prompt
            event.prompt();

            // Wait for the user to interact with the install prompt
            event.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }

                // Hide the install button after user interaction
                installButton.style.display = 'none';
            });
        });
    });
}

// Function to fetch number of unread messages from backend
async function fetchUnreadMessages() {
    try {
        // const response = await fetch('/api/messages/unread');
        // const data = await response.json();
        // const unreadMessages = data.unreadMessages;
        const unreadMessages = 12;

        // Display unread message count as badge
        if (unreadMessages > 0) {
            // Use browser-specific badge API to display badge
            // For example, Chrome Badge API: chrome.browserAction.setBadgeText({text: unreadMessages.toString()});
            chrome.browserAction.setBadgeText({text: unreadMessages.toString()});
        }
    } catch (error) {
        console.error('Error fetching unread messages:', error);
    }
}

// Call fetchUnreadMessages function periodically
setInterval(fetchUnreadMessages, 6000); // Fetch every 30 seconds
