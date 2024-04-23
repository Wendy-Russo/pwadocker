import React from "react";
// Dans service-worker.js

self.addEventListener('push', function(event) {
    const payload = event.data ? event.data.text() : 'No payload';
    event.waitUntil(
      self.registration.showNotification('Notification Title', {
        body: payload,
        icon: 'images/icon.png'
      })
    );
  });
export default Notification;  