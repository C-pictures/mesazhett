// CPictures — Firebase Messaging Service Worker
// Ky skedar DUHET te jete ne root te faqes (same folder me index_mobile.html)

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAE2hpDlkfLkIEGDOviPX64PJVY1-kfJIY",
  authDomain: "cpictures-44339.firebaseapp.com",
  projectId: "cpictures-44339",
  storageBucket: "cpictures-44339.firebasestorage.app",
  messagingSenderId: "1086138474106",
  appId: "1:1086138474106:web:5835bc5a3a04000c5b65c3"
});

const messaging = firebase.messaging();

// Notification kur app eshte i mbyllur (background)
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background message:', payload);
  const data = payload.data || {};
  const notifTitle = data.title || '💬 CPictures';
  const notifOptions = {
    body: data.body || 'Mesazh i ri',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'cpictures-msg',
    renotify: true,
    vibrate: [200, 100, 200],
    data: { url: self.location.origin }
  };
  self.registration.showNotification(notifTitle, notifOptions);
});

// Klik mbi notification — hap app-in
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.focus) { client.focus(); return; }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url || '/');
      }
    })
  );
});
