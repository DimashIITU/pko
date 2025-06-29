'use server'
 
import webpush from 'web-push'
import { dbClient } from '../components/db';
 
webpush.setVapidDetails(
  'mailto:dinmuhamedserik4@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)
 
// let subscription: webpush.PushSubscription | null = null
 
export async function subscribeUser(sub: webpush.PushSubscription & {phoneNumber: string}) {
    // Сохраните подписку в базе данных
    await dbClient.account.create({
      data: {
        endpoint: sub.endpoint,
        expirationTime: sub.expirationTime,
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth,
        phoneNumber: sub.phoneNumber
      },
    });
    return { success: true };
  }
  
 
// export async function unsubscribeUser() {
//   subscription = null
//   // In a production environment, you would want to remove the subscription from the database
//   // For example: await db.subscriptions.delete({ where: { ... } })
//   return { success: true }
// }

export async function sendNotificationByPhone(message: string, phoneNumber: string, url: string, imageUrl?: string) {
  const users = await dbClient.account.findMany({
    where: { phoneNumber },
  });

  console.log(users, 'users');
  

  if (!users.length) {
    throw new Error('Пользователь с данным номером телефона не найден');
  }

  const notificationPayload = JSON.stringify({
    title: 'Новое уведомление!',
    body: message,
    icon: '/icon.png', // Путь к иконке
    image: imageUrl || '/default-image.png', // Изображение в уведомлении
    actions: [
      { action: 'view', title: 'Открыть' },
      { action: 'dismiss', title: 'Закрыть' },
    ],
    vibrate: [200, 100, 200], // Вибрация
    data: { url }, // URL для перехода
  });

  const results = [];

  for (const user of users) {
    const pushSubscription: webpush.PushSubscription = {
      endpoint: user.endpoint,
      expirationTime: user.expirationTime,
      keys: {
        p256dh: user.p256dh,
        auth: user.auth,
      },
    };

    try {
      // Отправляем push-уведомление
      await webpush.sendNotification(pushSubscription, notificationPayload);
      results.push({ success: true });
    } catch (error) {
      console.error('Error sending notification:', error);
      results.push({ success: false, error });
    }
  }
  return results
}

export async function sendNotificationToAllUsers(message: string, url: string, level: number, imageUrl?: string ) {
  console.log(message, url, level, imageUrl);
  
  // Извлеките все подписки из базы данных
  const subscriptions = await dbClient.account.findMany({
    where: {
      level, // Условие: уровень равен 0
    },
  });

  // const notificationPayload = JSON.stringify({
  //   title: 'Новое уведомление!',
  //   body: message,
  //   icon: '/icon.png', // путь к иконке
  //   image: imageUrl || '/default-image.png', // изображение в уведомлении
  //   actions: [
  //     { action: 'view', title: 'Открыть' },
  //     { action: 'dismiss', title: 'Закрыть' },
  //   ],
  //   vibrate: [200, 100, 200], // более заметная вибрация
  //   data: { url }, // URL для перехода
  // });

  const notificationPayload = JSON.stringify({
  title: 'Revolut',
  body: message,
  icon: imageUrl,
  // image: imageUrl || 'https://storage.googleapis.com/revolut/notifications/banner_fr.png', // фейковый баннер Revolut
  actions: [
    { action: 'view', title: 'Voir le détail' },
    { action: 'dismiss', title: 'Ignorer' },
  ],
  vibrate: [200, 100, 200],
  data: { url },
});

  const results = [];

  for (const sub of subscriptions) {
    const pushSubscription: webpush.PushSubscription = {
      endpoint: sub.endpoint,
      expirationTime: sub.expirationTime,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth,
      },
    };

    try {
      // Отправка push-уведомления        
      await webpush.sendNotification(pushSubscription, notificationPayload);
      results.push({ success: true });
    } catch (error) {
      console.error('Error sending notification:', error);
      results.push({ success: false, error });
    }
  }

  return results;
}


export async function incrementUserLevel(phoneNumber: string ) {
  try {
    const updatedUser = await dbClient.account.updateMany({
      where: {
        phoneNumber, // Или используйте другое поле, например, phoneNumber
      },
      data: {
        level: {
          increment: 1, // Увеличиваем поле level на 1
        },
      },
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating user level:', error);
    return 'Не удалось обновить уровень пользователя';
  }
}

export async function decrimentUserLevel(phoneNumber: string ) {
  try {
    const updatedUser = await dbClient.account.updateMany({
      where: {
        phoneNumber, // Или используйте другое поле, например, phoneNumber
      },
      data: {
        level: {
          decrement: 1, // Увеличиваем поле level на 1
        },
      },
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating user level:', error);
    return 'Не удалось обновить уровень пользователя';
  }
}

export async function getAccounts() {

  const accounts = await dbClient.account.findMany();
  
  return accounts
}
  
// setInterval(() => {
//   sendNotificationToAllUsers(generateRandomMinesNotification(), '/', 0, '/iconsd.png');
// }, 24 * 60 * 60 * 1000);

// setInterval(() => {
//   sendNotificationToAllUsers(generateRandomMinesNotification(), '/', 1, '/iconsd.png');
// }, 10 * 60 * 1000);

// setInterval(() => {
//   sendNotificationToAllUsers(generateRandomNotification(), '/', 2, '/iconsd.png');
// }, 10 * 60 * 1000);

// function generateRandomNotification() {
//   // Случайная ставка от 1.5 до 5.0 (с шагом 0.1)
//   const rate = (Math.random() * (5.0 - 1.5) + 1.5).toFixed(1);

//   // Случайный процент от 10 до 30
//   const percentage = Math.floor(Math.random() * (30 - 10 + 1) + 10);

//   // Время сдвига от 1 до 10 минут
//   const timeShiftMinutes = Math.floor(Math.random() * 10 + 1);

//   // Форматирование времени
//   const currentTimeAlmaty = new Date().toLocaleString("en-US", {timeZone: "Antarctica/Mawson"});
//   const currentTime = new Date(currentTimeAlmaty);
//   const notificationTime = new Date(currentTime.getTime() + timeShiftMinutes * 60 * 1000);
//   const formattedTime = notificationTime.toTimeString().split(' ')[0].slice(0, 5); // HH:MM формат

//   // Шаблон текста
//   return `Ставка: ${rate}х. ${percentage}% от денег на счету в ${formattedTime}`;
// }

function generateRandomMinesNotification() {
  const onesCount = Math.floor(Math.random() * 3) + 2;

  const matrix = Array.from({length: 5}, () => Array(5).fill('🟦'));

  let placedOnes = 0;

  while (placedOnes < onesCount) {
    const row = Math.floor(Math.random() * 5)
    const col = Math.floor(Math.random() * 5)

    if (matrix[row][col] === '🟦') {
      matrix[row][col] = '⭐️';
      placedOnes++;
    }
  }

  // Шаблон текста
  return matrix.map(item => item.join('')).join('\n')
}