'use server'
 
import webpush from 'web-push'
import { dbClient } from './components/db';
 
webpush.setVapidDetails(
  'mailto:dinmuhamedserik4@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)
 
let subscription: webpush.PushSubscription | null = null
 
export async function subscribeUser(sub: webpush.PushSubscription) {
    // Сохраните подписку в базе данных
    await dbClient.account.create({
      data: {
        endpoint: sub.endpoint,
        expirationTime: sub.expirationTime,
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth
      },
    });
    return { success: true };
  }
  
 
export async function unsubscribeUser() {
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}
 
export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }
 
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icon.png',
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}

// export async function sendNotificationToAllUsers(message: string) {
//     // Извлеките все подписки из базы данных
//     const subscriptions = await dbClient.account.findMany();

//     const notificationPayload = JSON.stringify({
//       title: 'Привет!',
//       body: message,
//       icon: '/icon.png', // путь к иконке
//       data: { url: '/' }, // можно указать URL для перехода
//     });
  
//     const results = [];
  
//     for (const sub of subscriptions) {
//       const pushSubscription: webpush.PushSubscription = {
//         endpoint: sub.endpoint,
//         expirationTime: sub.expirationTime,
//         keys: {
//           p256dh: sub.p256dh,
//           auth: sub.auth,
//         },
//       };
  
//       try {
//         // Отправка push-уведомления
//         await webpush.sendNotification(pushSubscription, notificationPayload);
//         results.push({ success: true });
//       } catch (error) {
//         console.error('Error sending notification:', error);
//         results.push({ success: false, error });
//       }
//     }
  
//     return results;
//   }

  export async function sendNotificationToAllUsers(message: string, url: string, imageUrl?: string) {
    // Извлеките все подписки из базы данных
    const subscriptions = await dbClient.account.findMany();
  
    const notificationPayload = JSON.stringify({
      title: 'Новое уведомление!',
      body: message,
      icon: '/icon.png', // путь к иконке
      image: imageUrl || '/default-image.png', // изображение в уведомлении
      actions: [
        { action: 'view', title: 'Открыть' },
        { action: 'dismiss', title: 'Закрыть' },
      ],
      vibrate: [200, 100, 200], // более заметная вибрация
      data: { url }, // URL для перехода
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
  