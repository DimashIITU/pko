self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      image: data.image || undefined, // Добавляем изображение
      badge: data.image, // Маленькая иконка на значке уведомления
      vibrate: data.vibrate || [100, 50, 100],
      actions: data.actions || [
        { action: 'view', title: 'Открыть', icon: '/check-icon.png' },
        { action: 'dismiss', title: 'Закрыть', icon: '/dismiss-icon.png' },
      ],
      data: {
        url: data.url || '/',
        dateOfArrival: Date.now(),
        primaryKey: 'notification-primary-key',
      },
      requireInteraction: true, // Уведомление будет отображаться до взаимодействия
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Обработчик кликов по уведомлению
self.addEventListener('notificationclick', function (event) {
  const urlToOpen = event.notification.data.url || '/';
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(clients.openWindow(urlToOpen));
  } else if (event.action === 'dismiss') {
    // Дополнительные действия при закрытии уведомления
    console.log('Уведомление закрыто');
  } else {
    event.waitUntil(clients.openWindow(urlToOpen));
  }
});
