// App.js
import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // if (isMobile) {
    let installPrompt = null;
    const installButton = document.querySelector("#install");

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      installPrompt = event;
      installButton.removeAttribute("hidden");
      // Show your custom install prompt here
    };

    const disableInAppInstallPrompt = () => {
      installPrompt = null;
      installButton.setAttribute("hidden", "");
      setInstalled(true);
    }

    window.addEventListener("appinstalled", () => {
      disableInAppInstallPrompt();
    });


    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    installButton.addEventListener("click", async () => {
      if (!installPrompt) {
        return;
      }
      const result = await installPrompt.prompt();
      console.log(`Install prompt was: ${result.outcome}`);
      disableInAppInstallPrompt();
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
    // }
  }, []);

  useEffect(() => {
    if (installed) {
      // Simulate fetching unread messages from backend
      const interval = setInterval(() => {
        // Replace this with actual fetch logic to get unread messages count
        const randomCount = Math.floor(Math.random() * 10); // Random number for demo
        setUnreadMessages(randomCount);
      }, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval);
    }
  }, [installed]);

  useEffect(() => {
    // Update document title with unread messages count
    document.title = unreadMessages > 0 ? `(${unreadMessages}) Unread Messages` : 'PWA Badge Sample';

    // Update badge count on the app icon (if supported)
    if ('setAppBadge' in navigator) {
      navigator.setAppBadge(unreadMessages);
    }
  }, [unreadMessages]);

  const handleBadgeClick = () => {
    // Handle click on badge (e.g., mark messages as read)
    setUnreadMessages(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the PWA Badge Sample!
        </p>
        <button id="install" hidden>Do you want to Install?</button>
        {installed ?
          <>
            <button onClick={handleBadgeClick}>Mark as Read</button>
            <p>
              Unread Messages: {unreadMessages}
            </p>
          </> :
          <></>}
      </header>
    </div >
  );
}

export default App;
