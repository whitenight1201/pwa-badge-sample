import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';


function App() {
  const [unreadMessages, setUnreadMessages] = useState(0);
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
  // Simulate fetching unread messages from backend
  const fetchUnreadMessages = () => {
    // Replace with actual fetch logic to fetch unread messages from backend
    // For demo purposes, increment unreadMessages by 1 every 5 seconds
    setInterval(() => {
      setUnreadMessages(prevCount => prevCount + 1);
    }, 5000);
  };

  useEffect(() => {
    // Fetch unread messages when component mounts
    fetchUnreadMessages();
  }, []);

  useEffect(() => {
    // Update document title with unread messages count
    document.title = unreadMessages > 0 ? `(${unreadMessages}) PWA Badge` : `PWA Badge`;
  }, [unreadMessages]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the PWA Badge Sample!
        </p>
        <p>
          Unread Messages: {unreadMessages}
        </p>
      </header>
    </div>
  );
}

export default App;
