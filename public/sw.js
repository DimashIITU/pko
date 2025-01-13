self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      image: data.image || undefined, // Добавляем изображение
      badge: '/badge.png', // Маленькая иконка на значке уведомления
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

// Генератор случайного текста уведомлений
function generateRandomNotification() {
  // Случайная ставка от 1.5 до 5.0 (с шагом 0.1)
  const rate = (Math.random() * (5.0 - 1.5) + 1.5).toFixed(1);

  // Случайный процент от 10 до 30
  const percentage = Math.floor(Math.random() * (30 - 10 + 1) + 10);

  // Время сдвига от 1 до 10 минут
  const timeShiftMinutes = Math.floor(Math.random() * 10 + 1);

  // Форматирование времени
  const currentTime = new Date();
  const notificationTime = new Date(currentTime.getTime() + timeShiftMinutes * 60 * 1000);
  const formattedTime = notificationTime.toTimeString().split(' ')[0].slice(0, 5); // HH:MM формат

  // Шаблон текста
  return `Ставка: ${rate}х. ${percentage}% от денег на счету в ${formattedTime}`;
}

// Отправка уведомления каждый час с рандомным текстом
function sendHourlyNotification() {
  const title = 'Новое уведомление!';
  const body = generateRandomNotification();
  const options = {
    body,
    icon: '/iconw.png',
    badge: '/badge.png',
    vibrate: [100, 50, 100],
    requireInteraction: true,
    data: {
      url: '/',
      dateOfArrival: Date.now(),
      primaryKey: 'hourly-notification-key',
    },
  };

  self.registration.showNotification(title, options);
}

// Таймер для уведомлений
setInterval(() => {
  sendHourlyNotification();
}, 3 * 60 * 60 * 1000); // 60 минут в миллисекундах
